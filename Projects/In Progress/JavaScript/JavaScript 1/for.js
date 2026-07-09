for (let i = 1; i <=10; i++){
    console.log('Numero atual: ', i);
}

for (let x = 0; x <=15; x++){
    if (x % 2 == 0){
        console.log('Par:', x);
    }
}

for (let x = 0; x <=15; x++){
    if (x % 2 > 0){
        console.log('Impar:', x);
    }
}

const palavra = 'calopsita'

/* for(let contador = 0; contador < palavra.length; contador++){
    console.log(contador, palavra[contador]);

}
    */
let contador = 0;

/*
while(contador < palavra.length){
    console.log(contador, palavra[contador]);
    contador++;
} */

do{
    console.log(contador, palavra[contador])
    contador++
} while(contador < palavra.length)