class Game {
    constructor() {
        this.attemptsCounterElement = document.getElementById('try-counter')
        this.resultElemnet = document.getElementById('result')
        this.dividersHintsElement = document.getElementById('dividers')
        this.wrongAnswersElement = document.getElementById('wrong-answers')

        this.minInputElement = document.getElementById('min-diapazon')
        this.minInputElement.addEventListener('input', this.inputValidator)

        this.maxInputElement = document.getElementById('max-diapazon')
        this.maxInputElement.addEventListener('input', this.inputValidator)

        this.answerInput = document.getElementById('answer')
        this.answerInput.addEventListener('input', this.inputValidator)

        this.startButtonElement = document.getElementById('start-button')
        this.startButtonElement.addEventListener('click', () => this.startGame())

        this.guessButtonElement = document.getElementById('guess-button')
        this.guessButtonElement.addEventListener('click', () => this.checkNumber())

        this.dividers = []
        this.targetNumber = undefined
        this.attempts = 0
        this.isGameStart = false
    }

    inputValidator(event) {
        const value = event.target.value
        if (value % 1 !== 0) event.target.value = Math.trunc(value)
    }

    startGame() {
        if (this.isGameStart) return
        const max = this.maxInputElement.value
        const min = this.minInputElement.value
        this.targetNumber = Math.trunc(Math.random() * (max - min) + min)


        this.dividers = this.getDividers()
        this.attempts = 0

        this.wrongAnswersElement.innerHTML = ''

        this.isGameStart = true
    }

    getDividers() {
        let result = []
        for (let i = 2; i <= Math.trunc(this.targetNumber / 2) + 1; i++) {
            if (this.targetNumber % i === 0) result.push(i)
        }
        return result
    }

    checkNumber() {
        if (!this.isGameStart) return
        const answer = +this.answerInput.value

        this.attempts++
        this.attemptsCounterElement.innerText = this.attempts

        if (answer === this.targetNumber) {
            this.resultElemnet.innerText = 'ВЕРНО!'
            this.isGameStart = false

        } else {
            this.resultElemnet.innerText = answer > this.targetNumber ? "Вводи меньше" : "Вводи больше"
            if ((this.attempts + 1) % 3 === 0) {
                console.log('draw hint')
                const hint = this.dividers.slice(0,(this.attempts + 1) / 3).join(", ")
                this.dividersHintsElement.innerText = hint
            }
            let wrongNumElement = document.createElement('span')
            wrongNumElement.innerText = `${answer}, `
            wrongNumElement.style.color = answer > this.targetNumber ? "red" : 'violet'
            this.wrongAnswersElement.appendChild(wrongNumElement)
        }
    }
}

window.app = new Game()