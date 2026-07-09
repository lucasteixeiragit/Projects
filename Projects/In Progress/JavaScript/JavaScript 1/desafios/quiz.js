const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('Bem vindo!');

let acertos = 0;

rl.question('1) Qual palavra usamos para criar uma funcao?\n(a) define\n(b) function\n(c) create\n>', (resposta1) =>{
    if (resposta1 == 'b'){
        acertos++;
    }

    rl.question('2) Qual dessas é uma estrutura de repetição?\n(a) loopar\n(b) repeat\n(c) for\n>', (resposta2) => {
        if (resposta2 == 'c'){
            acertos++;
        }

        rl.question('3) Qual valor é considerado falsy em JavaScript?\n(a) 1\n(b) 0\n(c) "texto"\n> ', (resposta3) => {
            if (resposta3 == 'b'){
                acertos++;
            }

            switch(acertos){
                case 3:
                    console.log('Acertou todas as questoes! Parabens!');
                    break;
                case 2:
                    console.log('Acertou somente 2, muito bom!');
                    break;
                case 1: 
                    console.log('Acertou somente 1, muito bom!');
                    break;
                case 0:
                    console.log('Nao acertou nenhuma!')
                    break;
            }

            rl.close();

        });
    });
});