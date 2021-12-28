import { getData } from './data.module.js'

let levelWords = getData(0)
let wordsArr = []
let outputArr = document.querySelector('.output')
let btnStart = document.querySelector('.start')
let focusText = null;
let numberLetter = 0;
let count = 0;
let level = 0;
let toLose
let addWord
let startLevel

function game() {

    startLevel = () => {
        addWord = setInterval(() => {
            if (levelWords.length <= 0) {
                clearInterval(addWord)
            } else {
                const num = random(levelWords.length - 1);
                let newItem = levelWords[num]
                newItem.timer = 10
                wordsArr.push(newItem)
                levelWords = levelWords.filter((elem, i) => i !== num)
                addWords(wordsArr.reverse()[0].word)
            }

        }, 2100);

        toLose = setInterval(() => {

            wordsArr.forEach(elem => {
                let newItem = elem
                if (newItem.timer <= 0) {
                    gameOver();
                    clearInterval(toLose)
                } else newItem.timer -= 0.5;

                return newItem
            })

        }, 500);

        return { addWord, toLose }
    }



    function onInput(letter) {
        if (focusText === null) {
            const newFocus = wordsArr.filter(event => event.word[0] === letter);
            focusText = newFocus[0].word;
            onTarget(focusText)
            numberLetter += 1;
            return
        }

        if (letter === focusText[numberLetter] && numberLetter === focusText.length - 1) {
            deleteWords(focusText)
            focusText = null;
            numberLetter = 0;
            count = count + 1
            if (count === 2) {
                nextLevel()
            }
            return
        }
        if (letter === focusText[numberLetter]) {
            numberLetter = numberLetter + 1;
            let targets = [...document.querySelectorAll('.target> span')]
            targets.map((elem, i) => {
                if (i <= (numberLetter - 1)) {
                    elem.style.color = 'transparent'
                }
            })
            return
        }

    };

    function addWords(text) {
        const span = document.createElement('span')
        text.split('').forEach(elem => {
            const spanW = document.createElement('span')
            spanW.innerHTML = elem

            span.appendChild(spanW)

        })
        span.classList.add('word')
        span.style.left = `${random(800)}px`
        outputArr.appendChild(span)
    };

    function deleteWords(target) {

        const wordsO = document.querySelectorAll('.word')
        const word = [...wordsO].filter(element => element.outerText === target)
        word[0].remove()
        return wordsArr = wordsArr.filter(elem => elem.word !== target)
    }



    function onTarget(target) {
        const wordsO = document.querySelectorAll('.word')
        const words = [...wordsO]
        words.forEach(element => {
            if (element.outerText === target) {
                return element.classList.add('target')
            } else return element
        });
    }

    function random(max) {
        const min = 0
        let rand = min - 0.5 + Math.random() * (max - min + 1);
        return Math.round(rand);
    }

    document.addEventListener('keydown', (e) => onInput(e.key));
}

function nextLevel() {
    level += 1
    clearInterval(toLose)
    clearInterval(startLevel)
    levelWords = []
    wordsArr = []
    const next = document.createElement('h3')
    next.innerHTML = 'Поздравляю, вы перешли на следующий уровень!'
    next.classList.add('next-level')
    outputArr.innerHTML = null
    outputArr.appendChild(next)
    const nextLvl = setTimeout(() => {
        next.remove()
        clearTimeout(nextLvl)
        levelWords = getData(level)
        startLevel()
    }, 2000)
}

function gameOver() {
    clearInterval(toLose)
    clearInterval(startLevel)
    levelWords = []
    wordsArr = []
    const gameOver = document.createElement('h2')
    gameOver.innerHTML = 'Game Over'
    gameOver.classList.add('game-over')
    const result = document.createElement('span')
    result.classList.add('result')
    result.innerHTML = `Ваш результат: ${count} слов!`
    outputArr.innerHTML = null
    outputArr.appendChild(gameOver)
    outputArr.appendChild(result)
}

btnStart.addEventListener('click', () => {
    btnStart.remove()
    game()
    startLevel()

})