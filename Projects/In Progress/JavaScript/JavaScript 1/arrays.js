const frutas = ['Uva', 'Banana', 'Kiwi', 'Maça', 'Morango']

/* console.log(frutas[0]);

console.log(frutas[4]);

console.log(frutas.length);

frutas.push('Melancia');

console.log(frutas.length);

console.log(frutas[frutas.length - 1]); */



for (let i = 0; i < frutas.length; i++) {
    console.log('indice: ', i);
    
    console.log(frutas[i]);
}

frutas.forEach((valor, indice) => {


    console.log('Indice: ', indice, valor)
})

for (const fruta of frutas) {
    console.log('fruta da vez: ', fruta);
    

}



