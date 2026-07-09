const frutas = ['Maça', 'Banana', 'Goiaba']

const maisFrutas = ['Uva', 'Morango', 'Kiwi']

const clone = [...frutas]

const todasFrutas = [...frutas, ...maisFrutas]

frutas.push('Pitanga')

console.log(frutas);
console.log(maisFrutas)
console.log(clone);

console.log(todasFrutas);

const [primeira, ,terceira, ...restante] = todasFrutas

console.log(primeira);
console.log(terceira);
console.log(restante);




