function saudacao() {
    console.log('Oi')
}

//setTimeout(saudacao, 2000) //ms

let contador = 0

const id = setInterval( () =>{
    contador++
    console.log('Tempo decorrido: ', contador)

    if (contador == 10) {
        clearInterval(id)
    }
}, 1000 )