const resultEl = document.getElementById('result');
const lowercaseEl = document.getElementById('lowercase');
const uppercaseEl = document.getElementById('uppercase');
const lengthEl = document.getElementById('length');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generatorEl = document.getElementById('generator');
const clipboardEl = document.getElementById('clipboard');



const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbols
};

// Adding an event listener

generatorEl.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});


// copying the generated password onto the keyboard using an event listener

clipboardEl.addEventListener('click', () => {
 const textarea = document.createElement('textarea');
 const password = resultEl.innerText;

 if (!password) {
    return;
 }

 textarea.value = password;
 document.body.appendChild(textarea);
 textarea.select();
 document.execCommand('copy');
 textarea.remove();
 alert('Password copied to the clipboard');
});


function generatePassword(lower, upper, number, symbol, length) {
    // 1. Initiante the password var
    // 2. Filter out the unchecked types
    // 3. Loop over length call generator function for each type
    // 4. Add final pw to te var and return


    let generatedPassword = '';
    
    const typesCount = lower + upper + number + symbol;

    // console.log(typesCount); 

    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(
        item => Object.values(item)[0]
    );

    // console.log(typesArr);

    if (typesCount === 0) {
        return '';
    }

    for (let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];

            // console.log(funcName);

            generatedPassword += randomFunc[funcName]();
        });
    }

    const finalPassword = generatedPassword.slice(0, length);

    return finalPassword;
}


function getRandomLower () {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}


function getRandomUpper () {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber () {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbols () {
    const symbols = '!@#$%^&*(){}=<>/,.'
    return symbols[Math.floor(Math.random () * symbols.length)];
}
