function generateAmountNumber() {
    const minNumber = document.querySelector('.min').value;
    const maxNumber = document.querySelector('.max').value;
    const amountNumber = document.querySelector('.amount').value;
    const inputUnique = document.querySelector('#input-unique');
    const randomResult = document.querySelector('.result');
    const newElem = document.createElement('br');
    const result = [];

    let random;

    while (result.length !== Math.trunc(amountNumber)) {
        if (inputUnique.checked) {
            random = generateInteger(minNumber, maxNumber);
            if (!result.includes(random)) {
                result.push(random);
            }
        } else {
            result.push(generateInteger(minNumber, maxNumber));
        }
    }

    if (randomResult.innerHTML.length > 100) {
        newElem.innerHTML
    }

    randomResult.innerHTML = result.join(', ');
    return result;
}

function generateInteger(min, max) {
    const minNumber = Math.ceil(min);
    const maxNumber = Math.floor(max);

    return Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
}
