const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const numerosPares = numeros.filter((numero) => {


    return numero % 2 === 0

})

const numerosImpares = numeros.filter((numero) => {


    return numero % 2 != 0

})

console.log('Todos: ', numeros);
console.log('Pares: ', numerosPares);
console.log('Impares:', numerosImpares);

const numerosDobrados = numeros.map((numero) => {

    return numero * 2 

})

console.log('Lista Dobrada:', numerosDobrados);



