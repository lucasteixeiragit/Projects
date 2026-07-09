const readline = require('readline')

const leitor = readline.createInterface({
    input: process.stdin,
    output: process.stdout

})

leitor.question('Qual o seu nome? ', (nome) => {
    console.log('Olá,', nome)
    console.log('Boas vindas')

    leitor.question('Qual sua idade? ', (idade) =>{
        if (idade >= 18){
            console.log('Pode tirar CNH')
        } else {
            console.log('Ainda nao pode tirar CNH')
        }

    leitor.close()
    })


})