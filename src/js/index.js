class Game {
    constructor() {
        this.attemptsCounterElement = document.getElementById("try-counter");
        this.resultElemnet = document.getElementById("result");
        this.dividersHintsElement = document.getElementById("dividers");
        this.wrongAnswersElement = document.getElementById("wrong-answers");

        this.minInputElement = document.getElementById("min-diapazon");
        this.minInputElement.addEventListener("input", this.inputValidator);

        this.maxInputElement = document.getElementById("max-diapazon");
        this.maxInputElement.addEventListener("input", this.inputValidator);

        this.answerInput = document.getElementById("answer");
        this.answerInput.addEventListener("input", this.inputValidator);
        this.answerInput.disabled = true;

        this.startButtonElement = document.getElementById("start-button");
        this.startButtonElement.addEventListener("click", () => this.startGame());

        this.guessButtonElement = document.getElementById("guess-button");
        this.guessButtonElement.addEventListener("click", () => this.checkNumber());
        this.guessButtonElement.style.cursor = "not-allowed";
        this.guessButtonElement.style.color = "gray";

        this.dividers = [];
        this.targetNumber = undefined;
        this.attempts = 0;
        this.isGameStart = false;
    }

    inputValidator(event) {
        const value = event.target.value;
        if (value % 1 !== 0) event.target.value = Math.trunc(value);
    }

    startGame() {
        if (this.isGameStart) return;
        const max = this.maxInputElement.value;
        const min = this.minInputElement.value;
        this.targetNumber = Math.trunc(Math.random() * (max - min) + min);

        this.dividers = this.getDividers();
        this.attempts = 0;
        this.attemptsCounterElement.innerText = this.attempts;

        this.wrongAnswersElement.innerHTML = "Неверно: ";

        this.isGameStart = true;

        this.minInputElement.disabled = true;
        this.maxInputElement.disabled = true;

        this.answerInput.disabled = false;
        this.guessButtonElement.style.cursor = "pointer";
        this.guessButtonElement.style.color = "black";
        this.startButtonElement.style.cursor = "not-allowed";
        this.startButtonElement.style.color = "gray";
    }

    getDividers() {
        let result = [];
        for (let i = 2; i <= Math.trunc(this.targetNumber / 2) + 1; i++) {
            if (this.targetNumber % i === 0) result.push(i);
        }
        return result;
    }

    checkNumber() {
        if (!this.isGameStart) return;
        const answer = +this.answerInput.value;

        if (answer < +this.minInputElement.value) {
            this.resultElemnet.innerText = "Это число меньше минимального";
            return;
        }

        if (answer > +this.maxInputElement.value) {
            this.resultElemnet.innerText = "Это число больше максимального";
            return;
        }

        this.attempts++;
        this.attemptsCounterElement.innerText = this.attempts;

        if (answer === this.targetNumber) {
            this.resultElemnet.innerText = "ВЕРНО!";
            this.isGameStart = false;
            this.minInputElement.disabled = false;
            this.maxInputElement.disabled = false;
            this.answerInput.disabled = true;
            this.guessButtonElement.style.cursor = "not-allowed";
            this.guessButtonElement.style.color = "gray";
            this.startButtonElement.style.cursor = "pointer";
            this.startButtonElement.style.color = "black";
        } else {
            this.resultElemnet.innerText = answer > this.targetNumber ? "Вводи меньше" : "Вводи больше";
            if (this.attempts % 3 === 0) {
                const hint = this.dividers.slice(0, (this.attempts + 1) / 3).join(", ");
                this.dividersHintsElement.innerText = hint;
            }
            let wrongNumElement = document.createElement("span");
            wrongNumElement.innerText = this.attempts === 1 ? ` ${answer}` : `, ${answer}`;
            wrongNumElement.style.color = answer > this.targetNumber ? "red" : "violet";
            this.wrongAnswersElement.appendChild(wrongNumElement);
        }
    }
}

window.app = new Game();
