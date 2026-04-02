// Estado inicial e objetivo (0 é o espaço vazio)
var tabuleiro = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];
var objetivo = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];

// Função para desenhar o tabuleiro no HTML
function desenhar() {
  var grid = document.getElementById('grid');
  grid.innerHTML = '';
  for (var i = 0; i < 16; i++) {
    var btn = document.createElement('button');
    btn.className = 'tile' + (tabuleiro[i] === 0 ? ' vazio' : '');
    btn.innerText = tabuleiro[i] === 0 ? '' : tabuleiro[i];
    // Uso de closure para capturar o índice correto no clique
    btn.onclick = (function(idx) {
      return function() { mover(idx); };
    })(i);
    grid.appendChild(btn);
  }
}

// Move a peça se estiver ao lado do vazio
function mover(idx) {
  var vazio = tabuleiro.indexOf(0);
  var r1 = Math.floor(idx / 4), c1 = idx % 4;
  var r2 = Math.floor(vazio / 4), c2 = vazio % 4;
  
  // Verifica se a distância é de apenas 1 casa (adjacente)
  if (Math.abs(r1 - r2) + Math.abs(c1 - c2) === 1) {
    var tmp = tabuleiro[vazio];
    tabuleiro[vazio] = tabuleiro[idx];
    tabuleiro[idx] = tmp;
    desenhar();
  }
}

// Embaralha fazendo 200 movimentos válidos (garante que tenha solução)
function embaralhar() {
  for (var i = 0; i < 200; i++) {
    var vazio = tabuleiro.indexOf(0);
    var vizinhos = [];
    if (vazio >= 4) vizinhos.push(vazio - 4); // Cima
    if (vazio < 12) vizinhos.push(vazio + 4); // Baixo
    if (vazio % 4 !== 0) vizinhos.push(vazio - 1); // Esquerda
    if (vazio % 4 !== 3) vizinhos.push(vazio + 1); // Direita
    
    var escolha = vizinhos[Math.floor(Math.random() * vizinhos.length)];
    var tmp = tabuleiro[vazio];
    tabuleiro[vazio] = tabuleiro[escolha];
    tabuleiro[escolha] = tmp;
  }
  document.getElementById('info').innerText = 'Tabuleiro embaralhado!';
  desenhar();
}

// Heurística: Distância de Manhattan (Cap. 4 Luger)
function calcularManhattan(board) {
  var dist = 0;
  for (var i = 0; i < 16; i++) {
    if (board[i] === 0) continue;
    var valor = board[i] - 1;
    var r_atual = Math.floor(i / 4), c_atual = i % 4;
    var r_alvo = Math.floor(valor / 4), c_alvo = valor % 4;
    dist += Math.abs(r_atual - r_alvo) + Math.abs(c_atual - c_alvo);
  }
  return dist;
}

// Algoritmo A* (Busca Heurística)
function resolver() {
  var tempoInicio = Date.now();
  // Lista de nós abertos (fronteira)
  var abertos = [{ 
    board: tabuleiro.slice(), 
    g: 0, 
    h: calcularManhattan(tabuleiro), 
    pai: null 
  }];
  var fechados = new Set();
  var expandidos = 0;

  while (abertos.length > 0) {
    // Ordena por f(n) = g(n) + h(n)
    abertos.sort(function(a, b) { return (a.g + a.h) - (b.g + b.h); });
    var atual = abertos.shift();
    expandidos++;

    // Teste de objetivo
    if (atual.board.join() === objetivo.join()) {
      var caminho = [];
      var no = atual;
      while (no) { caminho.push(no.board); no = no.pai; }
      caminho.reverse();
      animarSolucao(caminho);
      
      document.getElementById('info').innerText = 
        'Sucesso! Movimentos: ' + (caminho.length - 1) + 
        ' | Nós expandidos: ' + expandidos + 
        ' | Tempo: ' + (Date.now() - tempoInicio) + 'ms';
      return;
    }

    fechados.add(atual.board.join());

    // Limite para evitar travamento do navegador
    if (expandidos > 10000) {
      document.getElementById('info').innerText = 'Busca muito longa. Tente embaralhar novamente.';
      return;
    }

    // Gerar sucessores (movimentos possíveis)
    var vazio = atual.board.indexOf(0);
    var movimentos = [-4, 4, -1, 1];
    for (var m = 0; m < movimentos.length; m++) {
      var prox = vazio + movimentos[m];
      if (prox < 0 || prox >= 16) continue;
      if (movimentos[m] === -1 && vazio % 4 === 0) continue;
      if (movimentos[m] === 1 && vazio % 4 === 3) continue;

      var novoBoard = atual.board.slice();
      novoBoard[vazio] = novoBoard[prox];
      novoBoard[prox] = 0;

      if (fechados.has(novoBoard.join())) continue;

      abertos.push({
        board: novoBoard,
        g: atual.g + 1,
        h: calcularManhattan(novoBoard),
        pai: atual
      });
    }
  }
}

// Animação das jogadas encontradas pela IA
function animarSolucao(caminho) {
  var i = 0;
  var intervalo = setInterval(function() {
    if (i >= caminho.length) {
      clearInterval(intervalo);
      return;
    }
    tabuleiro = caminho[i];
    desenhar();
    i++;
  }, 300);
}

// Inicializa o jogo ao carregar a página
desenhar();



/* ============================================================== */ 


var tabuleiro = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];
var objetivo = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];

// Função para desenhar o tabuleiro
function desenhar() {
  var grid = document.getElementById('grid');
  grid.innerHTML = '';
  for (var i = 0; i < 16; i++) {
    var btn = document.createElement('button');
    btn.className = 'tile' + (tabuleiro[i] === 0 ? ' vazio' : '');
    btn.innerText = tabuleiro[i] === 0 ? '' : tabuleiro[i];
    btn.onclick = (function(idx) {
      return function() { mover(idx); };
    })(i);
    grid.appendChild(btn);
  }
}

// Função para mover peças
function mover(idx) {
  var vazio = tabuleiro.indexOf(0);
  var r1 = Math.floor(idx / 4), c1 = idx % 4;
  var r2 = Math.floor(vazio / 4), c2 = vazio % 4;
  
  if (Math.abs(r1 - r2) + Math.abs(c1 - c2) === 1) {
    var tmp = tabuleiro[vazio];
    tabuleiro[vazio] = tabuleiro[idx];
    tabuleiro[idx] = tmp;
    desenhar();
  }
}

// Função para embaralhar o tabuleiro
function embaralhar() {
  for (var i = 0; i < 200; i++) {
    var vazio = tabuleiro.indexOf(0);
    var vizinhos = [];
    
    if (vazio >= 4) vizinhos.push(vazio - 4); // Cima
    if (vazio < 12) vizinhos.push(vazio + 4); // Baixo
    if (vazio % 4 !== 0) vizinhos.push(vazio - 1); // Esquerda
    if (vazio % 4 !== 3) vizinhos.push(vazio + 1); // Direita
    
    var escolha = vizinhos[Math.floor(Math.random() * vizinhos.length)];
    var tmp = tabuleiro[vazio];
    tabuleiro[vazio] = tabuleiro[escolha];
    tabuleiro[escolha] = tmp;
  }
  document.getElementById('info').innerText = 'Tabuleiro embaralhado!';
  desenhar();
}

// Algoritmo BFS (Busca em Amplitude)
function buscaEmAmplitude() {
  var tempoInicio = Date.now();
  
  var abertos = [{
    board: tabuleiro.slice(),
    pai: null
  }];
  
  var fechados = new Set();
  fechados.add(tabuleiro.join());
  var expandidos = 0;

  while (abertos.length > 0) {
    var atual = abertos.shift();
    expandidos++;

    if (atual.board.join() === objetivo.join()) {
      var caminho = [];
      var no = atual;
      while (no) { 
        caminho.push(no.board); 
        no = no.pai; 
      }
      caminho.reverse();
      animarSolucao(caminho);
      
      document.getElementById('info').innerText = 
        'BFS Sucesso! Movimentos: ' + (caminho.length - 1) + 
        ' | Nós expandidos: ' + expandidos + 
        ' | Tempo: ' + (Date.now() - tempoInicio) + 'ms';
      return;
    }

    if (expandidos > 50000) {
      document.getElementById('info').innerText = 'Busca muito longa. Tente embaralhar novamente.';
      return;
    }

    var vazio = atual.board.indexOf(0);
    var movimentos = [-4, 4, -1, 1];
    
    for (var m = 0; m < movimentos.length; m++) {
      var prox = vazio + movimentos[m];
      
      if (prox < 0 || prox >= 16) continue;
      if (movimentos[m] === -1 && vazio % 4 === 0) continue;
      if (movimentos[m] === 1 && vazio % 4 === 3) continue;

      var novoBoard = atual.board.slice();
      novoBoard[vazio] = novoBoard[prox];
      novoBoard[prox] = 0;

      var boardStr = novoBoard.join();
      
      if (fechados.has(boardStr)) continue;

      fechados.add(boardStr);
      
      abertos.push({
        board: novoBoard,
        pai: atual
      });
    }
  }
  
  document.getElementById('info').innerText = 'BFS: Nenhuma solução encontrada!';
}

// Animação da solução
function animarSolucao(caminho) {
  var i = 0;
  var intervalo = setInterval(function() {
    if (i >= caminho.length) {
      clearInterval(intervalo);
      return;
    }
    tabuleiro = caminho[i];
    desenhar();
    i++;
  }, 300);
}

// Inicializa o jogo
desenhar();