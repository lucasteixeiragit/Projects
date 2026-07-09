// HOF = Higher Order Function == Funcao que recebe outra funcao como parametro

function calcular(n1, n2, operacao) {

    return operacao(n1, n2)

}

function soma(num3, num4) {

    return num3 + num4

}

function divisao(num5, num6) {

    return num5 / num6

}

const resultadoSoma = calcular(32, 8, divisao)
console.log('Resultado: ', resultadoSoma)