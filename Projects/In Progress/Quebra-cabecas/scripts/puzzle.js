var tabuleiro = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];

var objetivo = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];


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
    for (var i = 0; i < 100; i++) // Embaralha o tabuleiro 100 vezes, tornando possivel resolver, por serem movimentos validos
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

// Inicializar o tabuleiro
desenhar();
