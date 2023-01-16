//////////// ---- CLASSES ------- ///////////////

// ES5
var Person5 = function(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}

Person5.prototype.calculateAge = function() {
    var age = new Date.getFullYear() - this.yearOfBirth;
    console.log(age);
}

var john = new Person5('Wilfred', 1990, 'Teacher');

// ES6
class Person6 {
    constructor(name, yearOfBirth, job) {
        this.name = name;
        this.yearOfBirth = yearOfBirth;
        this.job = job;
    }

    calculateAge() {
        let age = new Date.getFullYear() - this.yearOfBirth;
        console.log(age);
    }
/// static methods are not inhrited in the instances of the class. they are nly used within the class

    static greetings() {
        console.log('Hello there theordon');
    }
}

const Wilfred = new Person6('Wilfred', 2001, 'Software Engineer');

Person6.greetings();

// class definitions are not hoisted like cosnstructors
// you can add methods to classes but not properties.


// Inheritance in javascript

// ES5
var Person5 = function(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}

Person5.prototype.calculateAge = function() {
    var age = new Date.getFullYear() - this.yearOfBirth;
    console.log(age);
}
var Athelete5 = function(name, yearOfBirth, job, olympicGames, medals) {
    Person5.call(this, name, yearOfBirth, job);
        this.olympicGames = olympicGames;
        this.medals = medals;
    }

Athelete5.prototype = Object.create(Person5.prototype);

Athelete5.prototype.wonMedals = function(){
    this.medals = medals;
    console.log(this.modals);
}

var jonAthelete5 = new Athelete5('Wilfred', 1990, 'Software Engineer', 3, 10);




// ES6 - demostration of inheritance using classes
class Person6 {
    constructor(name, yearOfBirth, job) {
        this.name = name;
        this.yearOfBirth = yearOfBirth;
        this.job = job;
    }

    calculateAge() {
        var age = new Date.getFullYear() - this.yearOfBirth;
        console.log(age);
    }
}

class Athelete6 extends Person6 {
    constructor(name, yearOfBirth, job, olympicGames, medals) {
        super(name, yearOfBirth, job);
        this.olympicGames = olympicGames;
        this.medals = medals;
    }

    wonMedals() {
        this.medals++;
        console.log(this.models);
    }
}

const wilfredAthelete = new Athelete6('Wilfred', 2000, 'swimmer', 3, 10);

wilfredAthelete.wonMedals();
wilfredAthelete.calculateAge();