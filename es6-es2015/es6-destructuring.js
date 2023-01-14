///////////////////--------DESTRUCTURING IN ECMACSript 6 -------//////////

// destructuring an array
// ES 5
var john = ['John', 20];
//var name = john[0];
//var age = john[1];

// ES6
const [name, age] = ['John', 20];
console.log(name);
console.log(age);

// destructuring an object
const obj = {
    firstName: 'Wilfred',
    lastName: 'Kiama'
};

const {firstName,lastName} = obj;
console.log(firstName);
console.log(lastName);

const {firstName: a, lastName: b} = obj;
console.log(a);
console.log(b);

// destructuring elements from a function

function calcAgeRetirement(year) {
    const age = new Date().getFullYear() - year;
    return [age, 65 - age];
}

const [age2, retirement] = calcAgeRetirement(2020);
console.log(age2);
console.log(retirement);
