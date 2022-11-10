const QUESTIONS = [
    {
        question: 'Хто був першим президентом України?  @Кравчук',
        answers: ['Кучма', 'Ющенко', 'Кравчук', 'Янукович'],
        correctAnswer: 'Кравчук',
    },
    {
        question: 'Яке колесо не крутиться в автомобілі, коли він їде?  @запаска',
        answers: ['Переднє', 'Заднє', 'Всі крутятся', 'Запасне'],
        correctAnswer: 'Запасне',
    },
    {
        question: 'Прототип якого із сучасних комп’ютерів був спаяний у гаражі?  @Apple.',
        answers: ['ASUS', 'Lenovo', 'Apple', 'MSI'],
        correctAnswer: 'Apple',
    },
    {
        question: 'Що можна вважати одним з найбільш забруднених місць в офісі, будинку, де є комп\'ютер?  @Клавіатуру.',
        answers: ['Стіл', 'Мишку', 'Клавіатуру', 'Монітор'],
        correctAnswer: 'Клавіатуру',
    },
    {
        question: 'З якого матеріалу була створена перша «мишка»?  @дерево',
        answers: ['Залізо', 'Дерево', 'Пластик', 'Скло'],
        correctAnswer: 'Дерево',
    },
    {
        question: 'Яку ємність мав перший жорсткий диск?   @ 4-5mb',
        answers: ['4-5mb', '10-12mb', '2-3mb', '6-8mb'],
        correctAnswer: '4-5mb',
    },
    {
        question: 'Який вигляд мала клавіатура першого комп\'ютера?  @Він не мав клавіатури.',
        answers: ['Не мав клавіатури', 'Дерев\'яна', 'Із скла', 'Із заліза'],
        correctAnswer: 'Не мав клавіатури',
    },
    {
        question: 'Яка з планет є найближчою до Землі?  @Венера',
        answers: ['Марс', 'Венера', 'Меркурій', 'Юпітер'],
        correctAnswer: 'Венера',
    },
    {
        question: 'Коли розпочалась друга світова війна?  @1939',
        answers: ['Что?', '1941р', '1939р', 'Рассказать про "Волынскую резню"'],
        correctAnswer: '1939р',
    },
    {
        question: 'Головний «натурник» Айвазовського?  @море',
        answers: ['Дівчина', 'Юнак', 'Ліс', 'Море',],
        correctAnswer: 'Море',
    },
    {
        question: 'У якому морі ловлять рибу жителі трьох частин світу?  @середземному',
        answers: ['Чорному', 'Середземному', 'Балтійському морі', 'Адріатичному морі',],
        correctAnswer: 'Середземному',
    },
    {
        question: 'Самий твердий мінерал?  @ алмаз',
        answers: ['Залізо', 'Алмаз', 'Золото', 'Мідь'],
        correctAnswer: 'Алмаз',
    },
    {
        question: 'Проміжок часу, що дорівнює періоду обертання Землі навколо Сонця?  @рік',
        answers: ['Місяць', 'День', 'Рік', '10 Років'],
        correctAnswer: 'Рік',
    },
    {
        question: 'Найменший океан?  @Північний Льодовитий',
        answers: ['Атлантичний океан', 'Індійський океан', 'Північний Льодовитий', 'Тихий океан'],
        correctAnswer: 'Північний Льодовитий',
    },
    {
        question: 'Яка річка двічі перетинає екватор?  @конго',
        answers: ['Амазонка', 'Ніл', 'Міссісіпі', 'Конго'],
        correctAnswer: 'Конго',
    },
];

const CORRECT_ANSWER_CLASS = 'millionaire__correct-answer';
const INCORRECT_ANSWER_CLASS = 'millionaire__incorrect-answer';
const SELECTED_REWARD_CLASS = 'selected-reward';
const BLOCK_ANSWER_CLASS = 'block-answer';
const CALL_ANSWER_MODAL_DELAY = 3_500;
const ANSWER_DELAY = 2_000;

const radioInputs = document.querySelectorAll('.millionaire__answer-radio');
const callAnswerModal = document.querySelector('.call-answer-modal');
const rewardModal = document.querySelector('.reward-modal');
const fixedRewards = [0, 5000, 10000];

let currentReward;
let currentQuestion;
let areLabelsBlocked;

newGame();

function renderLabels(answers) {
    const answerLabels = getLabels();

    answers.forEach((answer, index) => {
        answerLabels[index].children[0].innerText = answer;
        answerLabels[index].children[1].setAttribute('value', answer);
    });

    answerLabels.forEach((answer) => answer.classList.remove(BLOCK_ANSWER_CLASS));
}

function renderQuestion(question) {
    const questionLabel = getQuestion();

    questionLabel.innerText = question;
}

function renderRewards() {
    const rewards = getRewards();

    [...rewards].reverse().forEach((reward, index, total) => {
        if (index === currentQuestion) {
            reward.classList.add(SELECTED_REWARD_CLASS);
            currentReward = (index - 1) >= 0
                ? +total[index - 1].children[0].innerText.split(' ').join('').slice(1)
                : 0;
        } else {
            reward.classList.remove(SELECTED_REWARD_CLASS);
        }
    });
}

function renderAll(item) {
    renderRewards();
    renderQuestion(item.question);
    renderLabels(item.answers);
}

radioInputs.forEach((input) => {
    input.addEventListener('click', (event) => {
        const labelClasses = event.target.parentElement.classList;
        const isLabelBlocked = labelClasses.contains(BLOCK_ANSWER_CLASS);

        if (areLabelsBlocked || isLabelBlocked) { return; }

        areLabelsBlocked = true;

        const isCorrectAnswer = event.target.value === QUESTIONS[currentQuestion].correctAnswer;

        if (isCorrectAnswer) {
            labelClasses.add(CORRECT_ANSWER_CLASS);

            setTimeout(() => {
                labelClasses.remove(CORRECT_ANSWER_CLASS);
                areLabelsBlocked = false;

                if (currentQuestion < (QUESTIONS.length - 1)) {
                    currentQuestion++;
                    renderAll(QUESTIONS[currentQuestion]);
                } else {
                    showRewardModal(`$ 1 000 000`, true);
                }
            }, ANSWER_DELAY);
        } else {
            labelClasses.add(INCORRECT_ANSWER_CLASS);
            showRewardModal(`Ваша гарантована сума: ${ getGameReward() }`);
        }
    })
});

function showRewardModal(reward, isVictory = false) {
    if (isVictory) {
        const span = document.createElement('span');
        span.classList.add('winner');
        span.innerText = 'Вітаю вас ви стали мільйонером!!!';
        rewardModal.insertBefore(span, null);
    }

    document.querySelector('.game-reward').innerText = reward;
    rewardModal.style.display = 'block';
    areLabelsBlocked = true;
}

function getRewards() {
    return document.querySelectorAll('.win');
}

function getLabels() {
    return document.querySelectorAll('.millionaire__answer-label');
}

function getQuestion() {
    return document.querySelector('.millionaire__question');
}

function getGameReward() {
    return [...fixedRewards].reverse().find((reword) => reword <= currentReward);
}

function newGame() {
    const answerLabels = getLabels();

    answerLabels.forEach((label) => {
        label.classList.remove('millionaire__incorrect-answer');
        label.classList.remove('millionaire__correct-answer');
    });

    rewardModal.style.display = 'none';
    callAnswerModal.style.display = 'none';
    currentQuestion = 0;
    currentReward = 0;
    areLabelsBlocked = false;
    renderAll(QUESTIONS[currentQuestion]);
}

function helpFifty() {
    const answerLabels = getLabels();
    const correctAnswer = QUESTIONS[currentQuestion].correctAnswer;
    const correctAnswerIndex = QUESTIONS[currentQuestion].answers.findIndex((answer) => answer === correctAnswer);
    const randomIndex = random(0, 3, correctAnswerIndex);

    answerLabels.forEach((answer, index) => {
        if (index !== randomIndex && index !== correctAnswerIndex) {
            answer.classList.add(BLOCK_ANSWER_CLASS);
        }
    });
}

function helpCall() {
    const randomIndex = random(0, 3);
    const randomAnswer = QUESTIONS[currentQuestion].answers[randomIndex];

    callAnswerModal.style.display = 'block';
    callAnswerModal.innerText = `Я думаю, що правильна відповідь ... ${ randomAnswer }`;

    setTimeout(() => {
        callAnswerModal.style.display = 'none';
    }, CALL_ANSWER_MODAL_DELAY);
}

function random(minValue, maxValue, except) {
    const getRandom = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    if (!except) {
        return getRandom(minValue, maxValue);
    }

    let result;

    while (!result) {
        const num = getRandom(minValue, maxValue);

        if (num !== except) {
            result = num;
        }
    }

    return result;
}
