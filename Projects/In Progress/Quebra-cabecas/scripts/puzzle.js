let tabuleiro = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];

const tabuleiroInicial = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];

const objetivo = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];

let numeroMovimentos = 10;
let contadorEmbaralhar = 0;

let caminhoSolucao = null; //var para guardar a solucao e imprimir na tela

let intervaloAnimacao = null;


function desenhar(){
  const grid = document.getElementById('grid');
  grid.innerHTML = '';

  for(let i = 0; i < 16; i++){
    const btn = document.createElement('button');

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

    const indice = i;
    btn.onclick = function() {
      mover(indice);
    };

    //faz aparecer o numero dentro do botao
    grid.appendChild(btn);
  }
}

//funcao para mover as pecas, recebe o indice do botao clicado, verifica se é vizinho do vazio e troca se for valido
function mover(indice) {
  const vazio = tabuleiro.indexOf(0);
  const vizinhos = [];

  if (vazio >= 4) vizinhos.push(vazio - 4);
  if (vazio < 12) vizinhos.push(vazio + 4);
  if (vazio % 4 !== 0) vizinhos.push(vazio - 1);
  if (vazio % 4 !== 3) vizinhos.push(vazio + 1);

  if (vizinhos.includes(indice)) {
    const tmp = tabuleiro[vazio];
    tabuleiro[vazio] = tabuleiro[indice];
    tabuleiro[indice] = tmp;
    desenhar();
  }
}

// funcao para embaralhar o tabuleiro, fazendo movimentos validos, garantindo que sempre tenha solucao
function embaralhar() {
  if (contadorEmbaralhar >= 3) {
    alert("Limite de embaralhamento atingido (máximo 3 vezes) para evitar problemas de memória.");
    return;
  }
  
  contadorEmbaralhar++;
  console.log("Embaralhar " + contadorEmbaralhar + "/3");

  // se houver animação em andamento, cancele
if (intervaloAnimacao) {
  clearInterval(intervaloAnimacao);
  intervaloAnimacao = null;
}

// esconder botão de animacao / limpar passos anteriores
const btnAnimar = document.getElementById('mensagem');
if (btnAnimar) btnAnimar.style.display = 'none';
const paragrafoPassos = document.getElementById('passos');
if (paragrafoPassos) paragrafoPassos.innerText = '';

// limpar solução em memória
caminhoSolucao = null;

    for (let i = 0; i < numeroMovimentos; i++) // Embaralha o tabuleiro 100 vezes, tornando possivel resolver, por serem movimentos validos
      {
        const vazio = tabuleiro.indexOf(0); //percorre array e acha o 0, 0 é o espaço vazio
        const vizinhos = []; //cria um array para armazenar os vizinhos do espaço vazio

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

        const indiceAleatorio = Math.floor(Math.random() * vizinhos.length);

        const escolha = vizinhos[indiceAleatorio];

        const tmp = tabuleiro[vazio];
        tabuleiro[vazio] = tabuleiro[escolha];
        tabuleiro[escolha] = tmp;

        console.log("Movimento aleatório " + (i + 1) + ": Peça " + tabuleiro[vazio] + " movida para o espaço vazio.");
      }
    console.log("%c Tabuleiro pronto para busca!", "color: green");
    desenhar();
}

// Função para configurar o estado específico de teste para o comparativo
function configurarEstadoTeste() {
  // se houver animação em andamento, cancele
  if (intervaloAnimacao) {
    clearInterval(intervaloAnimacao);
    intervaloAnimacao = null;
  }

  // esconder botão de animacao / limpar passos anteriores
  const btnAnimar = document.getElementById('mensagem');
  if (btnAnimar) btnAnimar.style.display = 'none';
  const paragrafoPassos = document.getElementById('passos');
  if (paragrafoPassos) paragrafoPassos.innerText = '';

  // limpar solução em memória
  caminhoSolucao = null;

  // Define o estado fornecido pelo usuário
  tabuleiro = [5, 1, 3, 4, 9, 0, 6, 8, 13, 2, 7, 12, 14, 10, 11, 15];
  
  console.log("Tabuleiro configurado para o estado de teste comparativo! ([5, 1, 3, 4, 9, 0, 6, 8, 13, 2, 7, 12, 14, 10, 11, 15])");
  desenhar();
}



/* ===== HEURISTICA BUSCA MELHOR ESCOLHA ====*/ 

 /* Avalia o quão próximo um estado está do objetivo contando peças fora do lugar. */

function heuristica(estado) {
  // var para contagem de peças que nao estao em sua posicao final, començando com 0 assunmindo que tudo pode estar certo
  let foraDoLugar = 0;
  // percorrer todas as posicoes do tabuleiro - estado.lenght traz o numero de elementos do carry (16
  for (let i = 0; i < estado.length; i++) {
    // livro sugere não contar o espaço vazio, é apenas a ausencia de uma.
    // comara se o numero que esta na posicao i é o mesmo numero que deveria estar no estado objetivo, se nao for e nao for o vazio, entao esta fora do lugar e incrementa a contagem
    //se o estado i nao for zero, AND estado i for diferente do objetivo, encrementa, ou seja, se tiver um numero diferente do que deveria estar naquela posicao, e nao for o vazio, entao esta fora do lugar
    if (estado[i] !== 0 && estado[i] !== objetivo[i]) {
      foraDoLugar++;
    }
  }
  return foraDoLugar;
}

function busca_melhor_escolha() {
  // Captura o tempo inicial para medição de performance
  const t0 = performance.now();
  // abertos := [Inicial]; % inicialização
  const nodoInicial = {
    estado: tabuleiro.slice(),
    pai: null,
    caminho: [],
    h: heuristica(tabuleiro)
  };

  let abertos = [nodoInicial];
  // fechados := [ ];
  const fechados = new Set();
  let contadorNodos = 0;

  // enquanto abertos ≠ [ ] faça
  while (abertos.length > 0) {
    // (Para Melhor Escolha: ordena abertos pela heurística)
    abertos.sort(function(a, b) {
      return a.h - b.h;
    });

    // remova o estado mais à esquerda em abertos, chame-o de X;
    const X = abertos.shift();

    // se X for um objetivo, então retorna SUCESSO % objetivo encontrado
    if (X.estado.join(',') === objetivo.join(',')) {
      // Captura o tempo final e calcula a duração da busca
      const t1 = performance.now();
      console.log(`%c Busca Melhor Escolha concluída em ${(t1 - t0).toFixed(2)} ms`, "font-weight: bold; color: blue");
      
      // Se disponível no navegador, exibe o uso de memória do Heap JS em MB
      if (window.performance && window.performance.memory) {
        console.log(`Memória usada: ${(window.performance.memory.usedJSHeapSize / (1024 * 1024)).toFixed(2)} MB`);
      }
      return X.caminho;
    }

    // senão início
    contadorNodos++;
    const labelTabela = "Tabela " + String.fromCharCode(64 + (contadorNodos % 26 || 26)) + (contadorNodos > 26 ? Math.floor((contadorNodos - 1) / 26) : "");
    console.log("%c Explorando " + labelTabela + " (Melhor Escolha):", "color: red");
    console.table([X.estado.slice(0,4), X.estado.slice(4,8), X.estado.slice(8,12), X.estado.slice(12,16)]);

    // gere filhos de X;
    const filhos = gerarFilhos(X.estado);

    // coloque X em fechados;
    fechados.add(X.estado.join(','));

    filhos.forEach(function(filho) {
      const filhoStr = filho.join(',');

      // descarte filhos de X se já estiverem em abertos ou fechados; % checagem de laços
      const estaEmFechados = fechados.has(filhoStr);
      const estaEmAbertos = abertos.some(function(n) {
        return n.estado.join(',') === filhoStr;
      });

      if (estaEmFechados || estaEmAbertos) {
        return;
      }

      // coloque os filhos que restam no final à direita de abertos % põe na fila
      const nodoFilho = {
        estado: filho,
        pai: X,
        caminho: X.caminho.concat([filho]),
        h: heuristica(filho)
      };
      
      abertos.push(nodoFilho);
    });
    // fim
  }

  // retorna FALHA % não restam estados
  const t1 = performance.now();
  console.log(`%c Busca Melhor Escolha concluída em ${(t1 - t0).toFixed(2)} ms`, "font-weight: bold; color: blue");
  
  // Exibe memória mesmo em caso de falha
  if (window.performance && window.performance.memory) {
    console.log(`Memória usada: ${(window.performance.memory.usedJSHeapSize / (1024 * 1024)).toFixed(2)} MB`);
  }
  return null;
}

/* ===== BUSCA EM AMPLITUDE ===== */

function busca_em_amplitude() {
  // Captura o tempo inicial para medição de performance
  const t0 = performance.now();
  // abertos := [Inicial]; % inicialização
  const nodoInicial = {
    estado: tabuleiro.slice(),
    pai: null,
    caminho: []
  };

  let abertos = [nodoInicial];
  // fechados := [ ];
  const fechados = new Set();
  let contadorNodos = 0;

  // enquanto abertos ≠ [ ] faça % restam estados
  while (abertos.length > 0) {
    // remova o estado mais à esquerda em abertos, chame-o de X;
    const X = abertos.shift();

    // se X for um objetivo, então retorna SUCESSO % objetivo encontrado
    if (X.estado.join(',') === objetivo.join(',')) {
      // Captura o tempo final e calcula a duração da busca
      const t1 = performance.now();
      console.log(`%c Busca em Amplitude concluída em ${(t1 - t0).toFixed(2)} ms`, "font-weight: bold; color: blue");
      
      // Se disponível no navegador, exibe o uso de memória do Heap JS em MB
      if (window.performance && window.performance.memory) {
        console.log(`Memória usada: ${(window.performance.memory.usedJSHeapSize / (1024 * 1024)).toFixed(2)} MB`);
      }
      return X.caminho;
    }

    // senão início
    contadorNodos++;
    const labelTabela = "Tabela " + String.fromCharCode(64 + (contadorNodos % 26 || 26)) + (contadorNodos > 26 ? Math.floor((contadorNodos-1)/26) : "");
    console.log("%c Explorando " + labelTabela + " (Amplitude):", "color: red");
    console.table([X.estado.slice(0,4), X.estado.slice(4,8), X.estado.slice(8,12), X.estado.slice(12,16)]);

    // gere filhos de X;
    const filhos = gerarFilhos(X.estado);

    // coloque X em fechados;
    fechados.add(X.estado.join(','));

    filhos.forEach(function(filho) {
      const filhoStr = filho.join(',');

      // descarte filhos de X se já estiverem em abertos ou fechados; % checagem de laços
      const estaEmFechados = fechados.has(filhoStr);
      const estaEmAbertos = abertos.some(function(n) {
        return n.estado.join(',') === filhoStr;
      });

      if (estaEmFechados || estaEmAbertos) {
        return;
      }

      // coloque os filhos que restam no final à direita de abertos % põe na fila
      const nodoFilho = {
        estado: filho,
        pai: X,
        caminho: X.caminho.concat([filho])
      };
      abertos.push(nodoFilho);
    });
    // fim
  }

  // retorna FALHA % não restam estados
  return null;
}

function gerarFilhos(estado){
  const filhos = [];
  const vazio = estado.indexOf(0);
  const vizinhos = [];

  if (vazio >= 4) vizinhos.push(vazio - 4);
  if (vazio < 12) vizinhos.push(vazio + 4);
  if (vazio % 4 !== 0) vizinhos.push(vazio - 1);
  if (vazio % 4 !== 3) vizinhos.push(vazio + 1);

  //para cada vizinho, criar uma copia do estado e fazer a troca
  vizinhos.forEach(function(vizinho) {
    const novoEstado = estado.slice(); // copia o estado atual
    novoEstado[vazio] = novoEstado[vizinho]; // move o vizinho para o vazio
    novoEstado[vizinho] = 0; // vazio vai para onde estava o vizinho

    filhos.push(novoEstado);

  });
return filhos;
}

function resolver_busca(tipo) {
  // desabilita o botão de busca enquanto calcula
  const btnBuscar = document.querySelector('.controls__animacao');
  if (btnBuscar) btnBuscar.disabled = true;

  // escolhe algoritmo
  if (tipo === 'melhor_escolha') {
    caminhoSolucao = busca_melhor_escolha();
  } else {
    caminhoSolucao = busca_em_amplitude();
  }

  // pega elementos da interface
  const paragrafoPassos = document.getElementById('passos');
  const btnAnimar = document.getElementById('mensagem');

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
  const btnBuscar = document.querySelector('.btn-solve');
  const btnAnimar = document.getElementById('mensagem');
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
  const tempoMs = 400;

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