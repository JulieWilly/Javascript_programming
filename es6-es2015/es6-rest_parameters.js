
// -- REST OPERATOR --
// 1 - The rest operator is used to put the rest of some specific user-supplied values into a JavaScript array. The three dots ( ... ) in the snippet above symbolize the rest operator. The text after the rest operator references the values you wish to encase inside an array.
// ES5
function isFullAge(years) {
     var argsArr = Array.prototype.slice.call(arguments);
     argsArr.forEach(function(cur) {
        console.log((2016 - cur) >= 18);
     });
}

//isFullAge(1990, 1986, 2001, 2010,2000, 1998, 1999);
//isFullAge(2001, 1964, 1970, 1994, 2003, 2005);

// ES6

function isFullAge(...years) {
    years.forEach(cur => console.log(2016 - cur) >= 18);
}

isFullAge(1990, 1986, 2001, 2010,2000, 1998, 1999)

/**
 *  1. the difference between the spread and the rest operator is
 *  The spread operator is applied in the function call. 
 * Rest operator is used in the function definition.
 */ 
