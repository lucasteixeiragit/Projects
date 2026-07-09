let lucas1 = {
    nome: 'Lucas',
    idade: 23,
    profissao: 'Desenvolvedor'
}

const lucas2 = {
    ...lucas1
}

lucas2.idade = 29

console.log(lucas1);

console.log(lucas2);


lucas1 = {
    ...lucas2,
    profissao: 'Desenvolvedor Senior',
    possuiCNH: true
}

console.log(lucas1);

const { nome, ...resto} = lucas1
console.log(nome);
console.log(resto);


