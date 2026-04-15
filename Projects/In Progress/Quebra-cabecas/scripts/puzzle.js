var tabuleiro = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];

var objetivo = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];

var caminhoSolucao = null; //var para guardar a solucao e imprimir na tela

var intervaloAnimacao = null;


function desenhar(){
  var grid = document.getElementById('grid');
  grid.innerHTML = '';

  for(var i = 0; i < 16; i++){
    var btn = document.createElement('button');

    // definir se botao esta vazio
    if (tabuleiro[i] === 0){
      btn.className = 'peca__vazia';
    } else{
      btn.className = 'peca'
    }

    //definir o conteudo do botao (numero)
    if (tabuleiro[i] === 0){
      btn.innerText = '';
    } else{
      btn.innerText = tabuleiro[i];
    }

    var indice = i;
    btn.onclick = function() {
      mover(indice);
    };

    //faz aparecer o numero dentro do botao
    grid.appendChild(btn);
  }
}

function mover(indice) {
  var vazio = tabuleiro.indexOf(0);
  var vizinhos = [];

  if (vazio >= 4) vizinhos.push(vazio - 4);
  if (vazio < 12) vizinhos.push(vazio + 4);
  if (vazio % 4 !== 0) vizinhos.push(vazio - 1);
  if (vazio % 4 !== 3) vizinhos.push(vazio + 1);

  if (vizinhos.includes(indice)) {
    var tmp = tabuleiro[vazio];
    tabuleiro[vazio] = tabuleiro[indice];
    tabuleiro[indice] = tmp;
    desenhar();
  }
}


function embaralhar() {

  // se houver animação em andamento, cancele
if (intervaloAnimacao) {
  clearInterval(intervaloAnimacao);
  intervaloAnimacao = null;
}

// esconder botão de animacao / limpar passos anteriores
var btnAnimar = document.getElementById('mensagem');
if (btnAnimar) btnAnimar.style.display = 'none';
var paragrafoPassos = document.getElementById('passos');
if (paragrafoPassos) paragrafoPassos.innerText = '';

// limpar solução em memória
caminhoSolucao = null;

    for (var i = 0; i < 10; i++) // Embaralha o tabuleiro 100 vezes, tornando possivel resolver, por serem movimentos validos
      {
        var vazio = tabuleiro.indexOf(0); //percorre array e acha o 0, 0 é o espaço vazio
        var vizinhos = []; //cria um array para armazenar os vizinhos do espaço vazio

        if (vazio >= 4){ //tem vizinho em cima
          vizinhos.push(vazio - 4);
        }

        if (vazio < 12){ //tem vizinho em baixo
          vizinhos.push(vazio + 4);
        }

        if (vazio % 4 !== 0 ){ //tem vizinho a esquerda
          vizinhos.push(vazio - 1);
        }

        if (vazio % 4 !==3){ //tem vizinho a direita
          vizinhos.push(vazio + 1); 
        }

        var indiceAleatorio = Math.floor(Math.random() * vizinhos.length);

        var escolha = vizinhos[indiceAleatorio];

        var tmp = tabuleiro[vazio];
        tabuleiro[vazio] = tabuleiro[escolha];
        tabuleiro[escolha] = tmp;
      }
    desenhar();
}


/* ===== HEURISTICA BUSCA MELHOR ESCOLHA ====*/ 
/**
 * Função Heurística: Baseada no Capítulo 4 de George Luger.
 * Avalia o quão próximo um estado está do objetivo contando peças fora do lugar.
 */
function heuristica(estado) {
  var foraDoLugar = 0;
  for (var i = 0; i < estado.length; i++) {
    // Luger sugere não contar o espaço vazio (0) na estimativa de distância
    if (estado[i] !== 0 && estado[i] !== objetivo[i]) {
      foraDoLugar++;
    }
  }
  return foraDoLugar;
}

/**
 * Algoritmo Busca de Melhor Escolha (Best-First Search) - George Luger.
 * Utiliza conhecimento específico do problema para guiar a busca (heurística).
 */
function busca_melhor_escolha() {
  // Define o nodo inicial com o estado atual, sem pai, sem caminho prévio e com valor h(n)
  var nodoInicial = {
    estado: tabuleiro.slice(),
    pai: null,
    caminho: [],
    h: heuristica(tabuleiro) // Valor heurístico inicial (estimativa até o objetivo)
  };

  // Lista 'abertos': nodos encontrados mas ainda não expandidos (fronteira)
  var abertos = [nodoInicial];
  // Lista 'fechados': estados já visitados para evitar loops infinitos
  var fechados = new Set();

  while (abertos.length > 0) {
    // Luger: Ordenar 'abertos' com base no valor da heurística h
    // Isso garante que sempre removeremos o nodo que parece estar mais perto do alvo
    abertos.sort(function(a, b) {
      return a.h - b.h;
    });

    // Remove X (o melhor nodo atual) da lista de abertos
    var X = abertos.shift();

    // Teste de Objetivo: Verifica se o estado atual é a solução
    if (X.estado.join(',') === objetivo.join(',')) {
      return X.caminho; // Sucesso: retorna a sequência de movimentos
    }

    // Adiciona o estado de X em 'fechados' para marcar como visitado
    fechados.add(X.estado.join(','));

    // Gera todos os possíveis estados sucessores de X
    var filhos = gerarFilhos(X.estado);

    filhos.forEach(function(filho) {
      var filhoStr = filho.join(',');

      // Regra de Luger: Se o filho já foi visitado, descarta para evitar ciclos
      if (fechados.has(filhoStr)) {
        return;
      }

      // Verifica se o mesmo estado já está na fila de espera para ser avaliado
      var estaEmAbertos = abertos.some(function(n) {
        return n.estado.join(',') === filhoStr;
      });

      if (estaEmAbertos) {
        return;
      }

      // Cria um novo nodo para o filho, calculando sua própria heurística h(filho)
      var nodoFilho = {
        estado: filho,
        pai: X,
        caminho: X.caminho.concat([filho]),
        h: heuristica(filho) // Calcula o custo estimado para este novo estado
      };
      
      // Adiciona o novo nodo em 'abertos' para avaliação futura
      abertos.push(nodoFilho);
    });
  }

  // Falha: Se 'abertos' esvaziar e o objetivo não foi alcançado
  return null;
}

/* ===== BUSCA EM AMPLITUDE ===== */

function busca_em_amplitude() {
  var nodoInicial = {
    estado: tabuleiro.slice(),
    pai: null,
    caminho: []
  };

  var abertos = [nodoInicial];
  var fechados = new Set(); // uso de Set torna a checagem mais rápida

  while (abertos.length > 0) {
    var X = abertos.shift(); // remove da esquerda (FIFO)

    // verifica se X é objetivo (comparando string dos arrays)
    if (X.estado.join(',') === objetivo.join(',')) {
      return X.caminho; // retorna o caminho (array de estados) até aqui
    }

    // marca X como visitado (adiciona string do estado em fechados)
    fechados.add(X.estado.join(','));

    // gera os estados filhos de X (cada filho é um array de 16 números)
    var filhos = gerarFilhos(X.estado);

    filhos.forEach(function(filho) {
      var filhoStr = filho.join(',');

      // verificar se filho já está em fechados
      if (fechados.has(filhoStr)) {
        return; // descarta este filho
      }

      // verificar se filho já está em abertos (abertos guarda objetos)
      var estaEmAbertos = abertos.some(function(n) {
        return n.estado.join(',') === filhoStr;
      });

      if (estaEmAbertos) {
        return; // descarta
      }

      // se não visitado, cria nodoFilho e coloca no final (direita) da fila abertos
      var nodoFilho = {
        estado: filho,
        pai: X,
        caminho: X.caminho.concat([filho]) // copia do caminho + novo estado
      };
      abertos.push(nodoFilho);
    });
  }

  // se esgotou a fila sem achar objetivo
  return null;
}

function gerarFilhos(estado){
  var filhos = [];
  var vazio = estado.indexOf(0);
  var vizinhos = [];

  if (vazio >= 4) vizinhos.push(vazio - 4);
  if (vazio < 12) vizinhos.push(vazio + 4);
  if (vazio % 4 !== 0) vizinhos.push(vazio - 1);
  if (vazio % 4 !== 3) vizinhos.push(vazio + 1);

  //para cada vizinho, criar uma copia do estado e fazer a troca
  vizinhos.forEach(function(vizinho) {
    var novoEstado = estado.slice(); // copia o estado atual
    novoEstado[vazio] = novoEstado[vizinho]; // move o vizinho para o vazio
    novoEstado[vizinho] = 0; // vazio vai para onde estava o vizinho

    filhos.push(novoEstado);

  });
return filhos;
}

function resolver_busca(tipo) {
  // desabilita o botão de busca enquanto calcula
  var btnBuscar = document.querySelector('.controls__animacao');
  if (btnBuscar) btnBuscar.disabled = true;

  // escolhe algoritmo
  if (tipo === 'melhor_escolha') {
    caminhoSolucao = busca_melhor_escolha();
  } else {
    caminhoSolucao = busca_em_amplitude();
  }

  // pega elementos da interface
  var paragrafoPassos = document.getElementById('passos');
  var btnAnimar = document.getElementById('mensagem');

  if (!caminhoSolucao) {
    // falha
    if (paragrafoPassos) paragrafoPassos.innerText = 'Nenhuma solução encontrada.';
    if (btnAnimar) btnAnimar.style.display = 'none';
  } else {
    // mostra número de passos e habilita o botão de animar
    if (paragrafoPassos) paragrafoPassos.innerText = 'Solução encontrada em ' + caminhoSolucao.length + ' passos.';
    if (btnAnimar) {
      btnAnimar.style.display = 'inline-block';
      btnAnimar.disabled = false;
    }
  }

  // reabilita o botão de busca
  if (btnBuscar) btnBuscar.disabled = false;
}

function animarSolucao() {
  if (!caminhoSolucao || caminhoSolucao.length === 0) return;

  // desabilitar botões enquanto anima
  var btnBuscar = document.querySelector('.btn-solve');
  var btnAnimar = document.getElementById('mensagem');
  if (btnBuscar) btnBuscar.disabled = true;
  if (btnAnimar) btnAnimar.disabled = true;

  // índice do passo atual
  let i = 0;

  // limpa qualquer animação anterior se existir
  if (intervaloAnimacao) {
    clearInterval(intervaloAnimacao);
    intervaloAnimacao = null;
  }

  // tempo entre passos (ms) - ajuste se quiser mais rápido/lento
  var tempoMs = 400;

  intervaloAnimacao = setInterval(function() {
    // copia o estado do caminho para evitar aliasing
    tabuleiro = caminhoSolucao[i].slice();
    desenhar();

    i++;
    if (i >= caminhoSolucao.length) {
      // fim da animação
      clearInterval(intervaloAnimacao);
      intervaloAnimacao = null;

      // reabilita botões
      if (btnBuscar) btnBuscar.disabled = false;
      if (btnAnimar) btnAnimar.disabled = false;
    }
  }, tempoMs);
}





// Inicializar o tabuleiro
desenhar();
