///////// ------- MAPS ------- /////////
const question = new Map();
question.set('Question', 'What is the capital city of Uganda?');
question.set(1, 'Antananarivore');
question.set(2, 'Mogadishu');
question.set(3, 'Nairobi');
question.set(4, 'Johanesburg');
question.set('correct', 3);
question.set(true, 'Correct answer : D');

question.set(false, 'Wrong answer, please try again!!');

//console.log(question.get('question'));
//console.log(question.size);

//question.delete(4);

// traversing lements of a map

//question.forEach((value, key) => console.log((`This is ${key}, and it's set to ${value}`)));
console.log('---------------------------------------------------');
// alternatively
for (let [key, value] of question.entries()) {
    if (typeof(key) === 'number'){
        console.log((`Answer ${key} : ${value}`));
    }
}

const ans = parseInt(prompt('Write the correct answer!'));
console.log(question.get(ans === question.get('correct')));