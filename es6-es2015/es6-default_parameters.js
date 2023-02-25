/**
 * In JavaScript, a parameter has a default value of undefined. It means 
 * that if you don't pass the arguments into the function, 
 * its parameters will have the default values of undefined.
 */
/*
function SmithPerson(firstName, yearOfBirth, lastName, nationality) {
 
 lastName === undefined ? lastName = 'Kiama' : lastName = lastName;
 nationality === undefined ? nationality = 'Kenyan' : nationality = nationality;
 this.firstName = firstName;
 this.yearOfBirth = yearOfBirth;
 this.lastName = lastName;
 this.nationality = nationality;
}

// Instantiate

var wilfred = new SmithPerson('Wilfred', 2001);
var jane = new SmithPerson(2001, 'Jane');
*/

// ES6
function SmithPerson(firstName, yearOfBirth, lastName = 'Wilfred', nationality = 'Kenyan') {
    this.firstName = firstName;
    this.yearOfBirth = yearOfBirth;
    this.lastName = lastName;
    this.nationality = nationality;
}
var wilfred = new SmithPerson('Wilfred', 2001);
