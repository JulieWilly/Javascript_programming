// --ARRAYS---///

// chancging the color of boxe
const boxes = document.querySelectorAll('.box');

// ES5
var boxesArr5 = Array.prototype.slice.call(boxes);
boxesArr5.forEach(function(cur) {
    cur.style.backgroundColor = 'dodgerblue';
});

// ES6 
const boxesArr6 = Array.from(boxes);
Array.from(boxes).forEach(cur => cur.style.backgroundColor = 'dodgerblue');

// changing text from the boxes
// ES5
for (var i = 0; i < boxesArr5.length; i++) {
    if (boxesArr5[i] === 'boxblue') {
        continue;// the continue method skips an iteration
    }

    boxesArr5[i].textContent = 'I changed to blue';
}

// ES6

for (const cur of boxesArr6) {
    if (cur.className.includes('blue')) {
        continue;
    }
    cur.textContent = 'I changed to blue';
}


//////////////////////////////
// -- Finding the an adult age from a set of ages in an array
var ages = [11, 17, 15, 9, 10, 21, 19];

//ES5
var full = ages.map(function(cur) {
    return cur >= 18;
});

console.log(full);

console.log(full.indexOf(true));
console.log(ages[full.indexOf(true)]);

// ES6
console.log(ages.findIndex(cur => cur >= 18));
console.log(ages.find(cur => cur >= 18));
