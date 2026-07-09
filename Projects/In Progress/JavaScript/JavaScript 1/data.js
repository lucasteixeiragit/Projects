const agora = new Date()

console.log(agora);

console.log('Ano', agora.getFullYear());
console.log('Mes 0-11', agora.getMonth());
console.log('Dia do mes', agora.getDate());
console.log('Horas', agora.getHours());
console.log('Minutos', agora.getMinutes());

const nascimento = new Date('2002-11-18T02:11:00.000Z')

console.log(nascimento);

console.log('Data formatada: ', nascimento.toLocaleDateString('pt-BR'));

