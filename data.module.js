const levelOne = [
    {
        word: 'монобанк',
        letter: 0,
        // timer: 10
    },
    {
        word: 'рассрочка',
        letter: 0,
        // timer: 10
    },
    {
        word: 'выписка',
        letter: 0,
        // timer: 10
    },
    {
        word: 'покупка частями',
        letter: 0,
        // timer: 10
    }, {
        word: 'коммуналка',
        letter: 0,
        // timer: 10
    }, {
        word: 'мы всегда рядом',
        letter: 0,
        // timer: 10
    }, {
        word: 'реквизиты',
        letter: 0,
        // timer: 10
    }, {
        word: 'минимальный платёж',
        letter: 0,
        // timer: 10
    },
]

const levelTwo = [
    {
        word: 'минимальный платёж',
        letter: 0,
        // timer: 10
    }, {
        word: 'кредитный лимит',
        letter: 0,
        // timer: 10
    }, {
        word: 'ваша карта заблокирована',
        letter: 0,
        // timer: 10
    }, {
        word: 'отсутствует возможность',
        letter: 0,
        // timer: 10
    }, {
        word: 'детализированная выписка',
        letter: 0,
        // timer: 10
    }, {
        word: 'оплатить счёт',
        letter: 0,
        // timer: 10
    }, {
        word: 'просроченный платёж',
        letter: 0,
        // timer: 10
    },
]

const levels = [
    levelOne, levelTwo
]




export const getData = (level) => {
    return levels[level]
}