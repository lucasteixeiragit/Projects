const nome = 'Lucas';

if (nome) {
    console.log('Olá,', nome);
} else {
    console.log('Ainda não sei seu nome');
}

const idade = 18;

if (idade != null && idade >= 18) {
    console.log('Maior de idade');
} else if (idade >= 0 && idade < 18) {
    console.log('Menor de idade');
}
