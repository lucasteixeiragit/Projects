const pessoa = {
    nome: 'Lucas',
    idade: 23,
    pets: ['Brisa', 'Luna', 'Hollie'],
    nacionalidade: 'Brasileiro'
}

for(const chave in pessoa){
    console.log('Cahve: ', chave);
    console.log('Valor: ', pessoa[chave]);
}

const chaves = Object.keys(pessoa)
const valores = Object.values(pessoa)
const entradas = Object.entries(pessoa)

console.log('Chaves: ', chaves);
console.log('Valores: ', valores);
console.log('Entradas: ', entradas);
