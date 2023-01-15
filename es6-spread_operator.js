// - The spread operator is a new addition to the set of operators in javascript es6. The operator takes in an
// iterable (eg. an array) and expands in into individual elememnts. The spread operator is commonly used to make deep coppies of JS objects

function addFourAges(a, b, c, d) {
    return a + b + c + d;
}

var sum1 = addFourAges(12, 18, 10, 22, 34, 50);
console.log(sum1);

//ES5
var ages = [12, 18, 10, 22, 34, 50];
var sum2 = addFourAges.apply(null, ages);
console.log(sum2);

//ES6 
const sum3 = addFourAges(...ages);
console.log(sum3);

const familyMuchire = ['Kiama', 'Jane', 'Lilian', 'Wangeci', 'Muchire', 'Gichuki'];
const familyGatere = ['margaret', 'Peter', 'Muchire', 'Karani', 'Wanjiru', 'Kirigo', 'Brian'];

const extendedfamily = [...familyGatere, ...familyMuchire];
console.log(extendedfamily);

