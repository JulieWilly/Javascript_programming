
/////////////////////// --- ECMAsRIPT 6 --- //////////////////////////

// 1. VARIABLE DECLARATIONS

// both let and var declare variables similarly, however, let is block scpoed unlike var.
var names = 'james';

let names = 'jane';

// const is used to declare variables that do not change in the eecution processs. Thus, once declared, the variable cannot be changed.
const names = 'janes'

names = 'john';

console.log(names);

// difference btn var and let

function driverLicense(passed) {
    if (passed) {
        var name = 'Wilfred';
        var yearOfBirth = 1990;

        console.log(name + ' who was born in the year ' + yearOfBirth + 'Has full qualifications to drive');
    }
}

driverLicense(true);

// using let 
function driverLicense6(passed) {
    if(passed) {
        let name = 'Mr. Kim';
        const yearOfBirth = 2001;

        console.log(name + ' who was born in the year ' + yearOfBirth + 'Has full qualifications to drive');
    }

    /// to note - ket is only restricted inside the block (within the curl braces and it throughs an error when used from outside. Howevr, this can be solved by making prior declareatons at the beggining)
    //  wrong - console.log(name + ' who was born in the year ' + yearOfBirth + 'Has full qualifications to drive');

}