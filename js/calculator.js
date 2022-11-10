let firstNumber = '0';
let secondNumber = '';
let operation = '';
let equals = false;

const screen = document.querySelector('.calculator__screen');
const FLOATING_POINT = '.';
const ACTION = Object.freeze({
    plus: '+',
    minus: '-',
    multiply: 'x',
    divide: '/',
    percentage: '%',
    equal: '=',
});

function clearAll() {
    firstNumber = '0';
    secondNumber = '';
    operation = '';
    equals = false;
    screen.textContent = '0';
    screen.style.fontSize = '60px';
}

function executeAction(action) {
    if (action === ACTION.percentage) {
        if (firstNumber && !secondNumber) {
            firstNumber = calculatePercentage(firstNumber);
            screen.textContent = firstNumber;
            return;
        }

        if (firstNumber && secondNumber) {
            secondNumber = calculatePercentage(firstNumber, secondNumber)
            screen.textContent = secondNumber;
            return;
        }
    }

    operation = action;
    screen.textContent = operation;
}

function calculatePercentage(number, percent = 1) {
    return (number * percent) / 100;
}

function addFloatingPoint() {
    if (
        firstNumber
        && !secondNumber
        && !firstNumber.includes(FLOATING_POINT)
    ) {
        firstNumber += FLOATING_POINT;
        screen.innerText = firstNumber;
        return;
    }

    if (
        firstNumber
        && secondNumber
        && !secondNumber.includes(FLOATING_POINT)
    ) {
        secondNumber += FLOATING_POINT;
        screen.innerText = secondNumber;
    }
}

function calculateResult() {
    firstNumber = +firstNumber;
    secondNumber = +secondNumber;

    switch (operation) {
        case ACTION.plus:
            firstNumber += secondNumber;
            break;
        case ACTION.minus:
            firstNumber -= secondNumber;
            break;
        case ACTION.multiply:
            firstNumber *= secondNumber;
            break;
        case ACTION.divide: {
            if (secondNumber === 0) {
                alert('durak?');
                break;
            }
            firstNumber /= secondNumber;
            break;
        }
    }

    equals = true;
    screen.innerText = parseFloat(firstNumber.toFixed(5));
}

function addNumber(number) {
    changeScreenFont();

    switch (true) {
        case (!secondNumber && !operation): {
            if (firstNumber === '0' && number.includes('0')) {
                break;
            }

            if (firstNumber === '0' && !number.includes('0')) {
                firstNumber = number;
                screen.innerText = firstNumber;
                break;
            }

            firstNumber += number;
            screen.innerText = firstNumber;
            break;
        }
        case (firstNumber && operation && equals): {
            equals = false;
            secondNumber = number;
            screen.innerText = secondNumber;
            break;
        }
        default: {
            const hasZero = number.includes('0');
            console.log(secondNumber, secondNumber === '', hasZero);

            if (secondNumber === '' && hasZero) {
                secondNumber = '0';
                screen.innerText = secondNumber;
                break;
            }

            if (secondNumber === '0' && hasZero) {
                break;
            }

            if (secondNumber === '0' && !hasZero) {
                secondNumber = number;
                screen.innerText = secondNumber;
                break;
            }

            secondNumber += number;
            screen.innerText = secondNumber;
        }
    }

    function changeScreenFont() {
        if (screen.innerText.length > 15) {
            screen.style.fontSize = '30px';
            return;
        }

        if (screen.innerText.length > 9) {
            screen.style.fontSize = '40px';
        }
    }
}
