/* const salario = 11000;

if (salario <= 3999) {
    console.log('Bonus de 9%');
    console.log('Salario atualizado: ', salario * 1.09 );
} else if (salario >= 4000 && salario <= 6999){
    console.log('Bonus de 7%');
    console.log('Salario atualizado: ', salario * 1.07 );
} else if (salario >= 7000 && salario <= 10999){
    console.log('Bonus de 5%');
    console.log('Salario atualizado: ', salario * 1.05 );
} else if (salario >= 11000){
    console.log('Bonus de 3%');
    console.log('Salario atualizado: ', salario * 1.03 );
} */

    /* ================================================================ */
    
/* const ano = 2001;

if (ano % 4 === 0 && ano % 100 !== 0 || ano % 100 === 0 && ano % 400 === 0){
    console.log(ano, 'é bissexto!');
} else {
    console.log(ano, ' não é bissexto');
    
} */

/* ====================================================================== */

/* const nome = 'Lucas';
const nota = 8;
const faltas = 2;

const recebeBonus = (nota >= 8) && (faltas <= 2) ? `${nome} recebe bonus!` : `${nome} não recebe bonus!`

console.log(recebeBonus); */

/* ============================================================================ */

/* const user = 'super premium'

switch(user) {
    case 'free':
        console.log('acesso limitado');
        break;
    case 'premium':
        console.log('acesso a todas as funcoes');
        break;
    case 'super premium':
        console.log('Acesso total e bonus');
        break; 
    default:
        console.log('desconhecido');
        break;
        
} */

        /* =================================================================== */



/* for (let i = 1; i <= 30; i++){
    const numero = Math.floor(Math.random() * (50 - 1 + 1) +1);
    console.log(numero);
    
    if (numero === 15){      
        console.log(`${numero} em ${i} tentativas`);
        break;
    }
} */

/* =================================================================== */

/* 
let contador = 0;

for (let i = 1; i <= 30; i++){
    const numero = Math.floor(Math.random() * (50 - 1 + 1) +1);
    console.log(numero);

    if(numero % 5 === 0 ){
        continue;
    }
    contador++;
}
*/

/* const numeroSecreto = 8;
let numeroAleatorio = 0;
let tentativas = 0;

while (numeroSecreto !== numeroAleatorio){
    numeroAleatorio = Math.floor(Math.random() * (50 - 1 + 1) +1);
    tentativas++;
}

console.log(`Adivinhou em ${tentativas} tentativas`); */


/* let numRandom = 0;
let tentativas2 = 0;


do {
    numRandom = Math.floor(Math.random() * (50 - 1 + 1) +1);
    tentativas2++;
    console.log(numRandom)
} while (numRandom % 2 !== 0);
console.log(`Adivinhou em ${tentativas2} tentativas`); */

const texto = 'luz azul';

const textoLimpo = texto
  .toLowerCase()
  .replace(/[\s\W]/g, '');

let textoInvertido = '';

for (let i = textoLimpo.length - 1; i >= 0; i--){
   textoInvertido += textoLimpo[i];

}

const result = textoLimpo === textoInvertido 
? `${texto} é palindromo` 
: `${texto} não é palindromo`;

console.log(result);