
// difference in use of strings btn escmascript version 5 and 6

let firstName = 'Wilfred';
let lastName = "Muchire";
const yearOfBirth = 2001;

function calcAge(year) {
    return 2022 - year;
}

// ESC5 
console.log('This is ' + firstName + ' ' + lastName + '. He was born in ' + yearOfBirth + '. Today he is ' + calcAge(yearOfBirth) + ' years old.');

// ESC6
console.log(`This is ${firstName} ${lastName}. He was born in ${yearOfBirth}. Today he is ${calcAge(yearOfBirth)} years old.`)

// strings manipulations
const n = `${firstName} ${lastName}`;
console.log(n.startsWith('W'));
console.log(n.endsWith('e'));
console.log(n.includes(' '));
console.log(`${firstName}`.repeat(10));