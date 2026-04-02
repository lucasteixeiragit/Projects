var tabuleiro = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];

var objetivo = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];

function desenhar(){
  var grid = document.getElementById('grid');
  grid.innerHTML='';

  for(var i = 0; i<16; i++){ //tamanho do tabuleiro
    var bnt = document.createElement('button');

    if(tabuleiro[i] === 0){
      bnt.className = 'peca vazia';
    }else{
      bnt.className = 'peca';
    }
    
  }

}





function busca_em_amplitude(){
  var abertos = []

}

function busca_melhor_escolha(){

}