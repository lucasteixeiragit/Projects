/* const pessoa = {
    nome: 'Ana',
    idade: 26,
    temCNH: true
}

pessoa.sobrenome = 'Paula'

console.log('Nome: ', pessoa.nome);
console.log('Sobrenome: ', pessoa.sobrenome); */

const livro = {
    titulo: 'O Hobbit',
    autor: 'J. R.R. Tolkien',
    paginas: 310
}

livro.publicado = true;
livro.idiomas = [
    'Ingles', 'Espanhol'
]

livro.idiomas.push('Mandarim')
livro.idiomas.push('Frances')


console.log(livro.idiomas);

delete livro.paginas;

console.log(livro);

console.log(livro['autor']);


const autor = {
    nome: 'J R R',
    nacionalidade: 'Britanico',
    idade: 98
}

console.log(autor);

livro.autor = autor;

console.log(livro);

