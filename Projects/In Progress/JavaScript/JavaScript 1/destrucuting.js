const pessoa = {
    nome: 'Lucas',
    idade: 23,
    profissao: 'Estudante'
}



/* console.log(pessoa.nome);
console.log(pessoa.idade);  */

const {nome, idade} = pessoa

console.log(pessoa.nome);
console.log(pessoa.idade); 

function saudacao({nome}) {
    console.log('Olá, ', nome);
}

saudacao(pessoa)