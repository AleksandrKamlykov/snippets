import { getData } from './data.module.js';

let levelWords = getData(0);
let wordsArr = [];
let outputArr = document.querySelector('.output');
let btnStart = document.querySelector('.start');
let focusText = null;
let numberLetter = 0;
let count = 0;
let level = 0;
let toLose;
let addWord;
let startLevel;
let itsFirstGame = true;

function game() {

    startLevel = () => {
        addWord = setInterval(() => {
            if (levelWords.length <= 0) {
                clearInterval(addWord);
            } else {
                const num = random(levelWords.length - 1);
                let newItem = levelWords[num];
                newItem.timer = 10;
                wordsArr.push(newItem);
                levelWords = levelWords.filter((elem, i) => i !== num);
                addWords(wordsArr.reverse()[0].word);
            }

        }, 2100);

        toLose = setInterval(() => {

            wordsArr.forEach(elem => {
                let newItem = elem;
                if (newItem.timer <= 0) {
                    gameOver();
                    clearInterval(toLose);
                } else newItem.timer -= 0.5;

                return newItem;
            });

        }, 500);

        return { addWord, toLose };
    };



    function onInput(letter) {
        if (focusText === null) {
            const newFocus = wordsArr.reverse().find(event => {
                return event.word[0] === letter;
            });
            focusText = newFocus.word;
            onTarget(focusText);
            numberLetter += 1;
            return;
        }

        if (letter === focusText[numberLetter] && numberLetter === focusText.length - 1) {
            deleteWords(focusText);
            focusText = null;
            numberLetter = 0;
            count = count + 1;
            if (count === 5) {
                nextLevel();
            }
            return;
        }
        if (letter === focusText[numberLetter]) {
            numberLetter = numberLetter + 1;
            let targets = [...document.querySelectorAll('.target> span')];
            targets.map((elem, i) => {
                if (i <= (numberLetter - 1)) {
                    elem.style.color = 'transparent';
                }
            });
            return;
        }

    };

    function addWords(text) {
        const span = document.createElement('span');
        text.split('').forEach(elem => {
            const spanW = document.createElement('span');
            spanW.innerHTML = elem;

            span.appendChild(spanW);

        });
        span.classList.add('word');
        span.style.left = `${random(800)}px`;
        outputArr.appendChild(span);
    };

    function deleteWords(target) {

        const wordsO = document.querySelectorAll('.word');
        const word = [...wordsO].filter(element => element.outerText === target);
        word[0].remove();
        return wordsArr = wordsArr.filter(elem => elem.word !== target);
    }



    function onTarget(target) {
        const wordsO = document.querySelectorAll('.word');
        const words = [...wordsO];
        words.forEach(element => {
            if (element.outerText === target) {
                return element.classList.add('target');
            } else return element;
        });
    }

    function random(max) {
        const min = 0;
        let rand = min - 0.5 + Math.random() * (max - min + 1);
        return Math.round(rand);
    }

    document.addEventListener('keydown', (e) => onInput(e.key));
}

function nextLevel() {
    level += 1;
    clearInterval(toLose);
    clearInterval(startLevel);
    levelWords = [];
    wordsArr = [];
    const next = document.createElement('h3');
    next.innerHTML = 'Поздравляю, вы перешли на следующий уровень!';
    next.classList.add('next-level');
    outputArr.innerHTML = null;
    outputArr.appendChild(next);
    const nextLvl = setTimeout(() => {
        next.remove();
        clearTimeout(nextLvl);
        levelWords = getData(level);
        startLevel();
    }, 2000);
}

async function gameOver() {
    clearInterval(toLose);
    clearInterval(startLevel);
    levelWords = [];
    wordsArr = [];
    const gameOver = document.createElement('h2');
    gameOver.textContent = 'Game Over';
    gameOver.classList.add('game-over');
    const result = document.createElement('span');
    result.classList.add('result');
    result.textContent = `Ваш результат: ${count} слов!`;
    const restartBtn = document.createElement('button');
    restartBtn.textContent = 'Ещё раз';
    restartBtn.classList.add('restart-btn');
    itsFirstGame = false;
    outputArr.innerHTML = null;
    outputArr.appendChild(gameOver);
    outputArr.appendChild(result);
    outputArr.appendChild(restartBtn);

    await fetch('https://cc-type-default-rtdb.europe-west1.firebasedatabase.app/results.json', {
        method: 'POST', body: JSON.stringify({
            score: count,
            level: level,
            name: localStorage.getItem('userId')
        })
    });

}

btnStart.addEventListener('click', () => {
    btnStart.remove();
    game();
    startLevel();

});


window.addEventListener('keypress', (event) => {
    console.log(event);
    if (event.key === 'Enter') {
        btnStart.remove();
        game();
        startLevel();
    }
});

window.addEventListener('DOMContentLoaded', async () => {

    const user = localStorage.getItem('userId');

    if (!user) {
        createUserLocal();
    }

    const response = await fetch('https://cc-type-default-rtdb.europe-west1.firebasedatabase.app/results.json');
    const res = await response.json();
    let recordAmount = 0;
    let recordLevel = 1;
    let yourRecordAmount = 0;
    let yourRecordLevel = 1;

    Object.values(res).forEach((score) => {
        if (score.score > recordAmount) {
            recordAmount = score.score;
            recordLevel = score.level;
        }
        if (user === score.name && score.score > yourRecordAmount) {
            yourRecordAmount = score.score;
            yourRecordLevel = yourRecordLevel;
        }
    });

    document.querySelector('.record').textContent = `${recordAmount} / level: ${recordLevel}`;
    document.querySelector('.your-record').textContent = `${yourRecordAmount} / level: ${yourRecordLevel}`;

});


function createUserLocal() {
    const userId = uuidv4();
    localStorage.setItem('userId', userId);
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}