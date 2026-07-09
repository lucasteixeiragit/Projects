// const readline = require('readline')
import {createInterface} from 'readline'
import {divisao, soma, subtracao} from './operacoesMatematicas.js'

const leitor = createInterface({
    input: process.stdin,
    output: process.stdout

})

leitor.question('Digite o primeiro número:\n> ', (numero1) => {
    leitor.question('Digite a operacao:\n+:soma\n-: subtracao\n/:divisao\n> ', (operacao) =>{
        leitor.question('Digite o segundo número:\n>', (numero2) => {
            const num1 = Number(numero1)
            const num2 = Number(numero2)

            let resultado = null

            if(operacao == '+'){
                resultado = soma(num1, num2)
            } else if (operacao == '-') {
                resultado = subtracao(num1, num2)
            } else if(operacao == '/') {
                resultado = divisao(num1, num2)
            } else {
                console.log('operacao invalida!');
            }

            if (resultado != null){
                console.log('Resultado da operacao: ', resultado);
                
            }

            leitor.close()

        })
    })
})