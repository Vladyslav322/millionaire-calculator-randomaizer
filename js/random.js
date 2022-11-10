function generateAmountNumber() {
    const minNumber = document.querySelector('.min').value;
    const maxNumber = document.querySelector('.max').value;
    const amountNumber = document.querySelector('.amount').value;
    const uniqueCheckNumber = document.querySelector('.unique-numbers');
    const randomResult = document.querySelector('.result');
    const result = [];

    let random;

    if (
        (amountNumber > (maxNumber + minNumber))
        && (amountNumber > 100)
    ) {
        return;
    }

    while (result.length < Math.trunc(amountNumber)) {
        if (uniqueCheckNumber.checked) {
            random = generateInteger(minNumber, maxNumber);
            if (!result.includes(random)) {
                result.push(random);
            }
        } else {
            result.push(generateInteger(minNumber, maxNumber));
        }
    }

    randomResult.innerHTML = result.join(', ');
    return result;
}

function generateInteger(min, max) {
    const minNumber = Math.ceil(min);
    const maxNumber = Math.floor(max);

    return Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
}
