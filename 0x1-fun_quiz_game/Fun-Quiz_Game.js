/**
 * //////////////////  FUN QUIZ GAME ////////////
 * 1. Build a function constructor called  Question to describe a question. A question should include:
 * - a question itself
 * - the answer from which the player can choose the correct one ( choose an adequate datastructure e.g. array or objects)
 * - correct answer - you can use numbers for the choices of the correct answers
 * 2. Create a couple of questions using the constructor
 * 3. Store them all inside an array
 * 4. Select one random question and log it on the console with the possible answers ( each question should have a number ) (Hint : you can write a method for the question object for this task).
 * 5. Use the 'Prompt' function to ask the user for the correct answer. Teh user should input the number of the correct answer such as you displayed it on Task 4.
 * 6. Check if the answer is corerct and print to the console whether the answer is correct or not. ( Hint: write another method to check this.)
 * 7. Suppose tis code would be a plugin for other progemmers to use in their code. So make sure that all your code is private and doest'nt interfere with the other programmers code.
 * 8. After you display the result, display the next random question so that the game never ends (Hint: write a function for this and call it right after displaying).
 * 9. Be careful: After task 8, the game literally never ends. so include the option to quit the game if the user writes 'exit' instead of the answer. In this case , DON'T call the function. 8
 * 10. Track the user's score to make the game more fun. So each time an answer is correct, add 1 point to the score (Hint: I'm going to use the power of closure forthis, but you don't have to, just do this write the tool you feel more comfortable at this point)
 * Display the score in the console. Use yet another method for this.
 */

/***************** SOLUTION *******************************************/

//1. create a function constructor to hold the questions
(function () {
    // use an immediately invoked function expression to make code private and new interfaced.
    function _questions(question, answer, correct) {
        this.question = question;
        this.answer = answer;
        this.correct = correct;
    }
    // diplay teh question on the console.
    // use the prototype chain to avoid attaching the method to each question.

    _questions.prototype.displayQuestion =
        function () {

            // displaying the question 
            console.log(this.question);

            //display the answers using a loop.
            for (var i = 0; i < this.answer.length; i++) {
                console.log(i + ': ' + this.answer[i]);
            }
        }
    // check the answer
    _questions.prototype.checkAnswer =
        function (ans, callback) {

            var sc;
            // compare the answers
            if (ans === this.correct) {
                console.log('Correct answer!!');
                sc = callback(true);
            } else {
                console.log('Wrong answer. Try again');
                sc = callback(false);
            }

            this.displayScore(sc);
        } 

    _questions.prototype.displayScore = 
    function (score) {
        console.log('Your current score is: ' + score);
        console.log('---------------------------------------------------------');
    }
    //create the question now
    var qst1 = new _questions('Is Javascript the coolest programming language in the world!',
        ['Yes', 'No'],
        0);

    var qst2 = new _questions('Is Javascript an Object Oriented Programming language?',
        ['Yes', 'No'],
        0);

    var qst3 = new _questions('Is Javascript the same as Java Programming language?',
        ['Yes', 'No'],
        0);

    var qst4 = new _questions("What is the name of the richest person in the world?",
        ['Bill gates', 'Elon Musk', 'Wilfred Muchire', 'Kiama Muchire', 'Wangati Muchire'],
        2);

    var qst5 = new _questions('What best Describes coding?',
        ['Hard', 'fun', 'tedious', 'boring'],
        1);

    // Now store the questions in an array

    var questions = [qst1, qst2, qst3, qst4, qst5];
    

    // Using closures to keep track of the scores of the game
    function score() {

        var sc = 0;

        return function(correct) {
            if (correct) {
                sc++;
            }
            return sc;
        }
    }

    var countScore = score();
       
    // function for the next question call
    function nextQuestion() {
        //generate a random number to for displaying the question randomly
        var radNo = Math.floor(Math.random() * questions.length);

        questions[radNo].displayQuestion();

        // asking the user for the correct answer
        var answer = prompt("Enter the correct answer.");

        // to exit the quiz here 
        if ( answer !== 'exit') {

            questions[radNo].checkAnswer(parseInt(answer), countScore);

            nextQuestion();
        }
    }

    nextQuestion();

})();
