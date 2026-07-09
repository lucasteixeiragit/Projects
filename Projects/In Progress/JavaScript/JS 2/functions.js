// function calculaPotencia(base, expoente){
//     let resultado = 1;

//     for (let i = 0; i < expoente; i++){
//         resultado = resultado * base;
//     }
//     return resultado;
// };

// console.log(calculaPotencia(4, 3));
// console.log(calculaPotencia(5, 5));

// /* ================================================================= */

// const imprimeOlaMundo = function(){
//     console.log("Olá Mundo!");
// };

// imprimeOlaMundo();

// /* ================================================================= */

// const boasVindas = function(nome) { return `Òlá, ${nome}`};

// console.log(boasVindas("Lucas"));

// /* ================================================================= */

// const fatorial = function f (num){
//     if (num === 0 || num === 1){
//         return 1;
//     } else {
//         return num * f(num - 1);
//     }
// }

// console.log(fatorial(5));

// /* ================================================================= */

/* const fatorial = function f(num){
    if(num === 0 || num === 1) return 1;
    return num * f(num - 1);
}



console.log(fatorial(5)); */

// /* ================================================================= */

/* const soma = (num1, num2) => {
    return num1 + num2;
};

console.log(soma(5, 5)); */


/* const jurosComposto = (valor, juros, tempo) => {
    let taxaJuros = (juros/100) + 1;
    return valor * Math.pow(taxaJuros, tempo);
}

console.log(jurosComposto(1000, 5, 2));

setTimeout(olaMundo, 2000);

function olaMundo(){
    console.log('Olá Mundo!');
} */

/* function soma(a, b){ return a + b};

function multiplica(a, b){ return a * b};

function calcula(fnOperacao, valorA, valorB){
    return fnOperacao(valorA, valorB);
}
console.log(calcula(soma, 5, 5));
console.log(calcula(multiplica, 5, 5));

// /* ================================================================= */

/* const userId = '4545656';

// const avisaUsuario = (userId) => console.log(`sessão de ${userId} está inativa a 2 segundos`);

// setTimeout(avisaUsuario, 2000, userId);
setTimeout((userId) => console.log(`sessão de ${userId} está inativa a 4 segundos`), 4000, userId); */ 

/* ================================================================= */

function saudacao(nome){
    if (nome){
        console.log(`Olá, ${nome}! Boas vindas!`);
    } else {
        console.log("Olá! Boas vindas!");
    }
}

saudacao("Lucas");
saudacao();

 




