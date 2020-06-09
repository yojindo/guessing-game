let message = document.getElementById('result-message')

function generateWinningNumber() {

    return Math.ceil(Math.random() * 100)

}

function shuffle(array) {

    let totalArrayIndex = array.length, remainingElm, currentElm

    while(totalArrayIndex) {
        currentElm = Math.floor(Math.random() * totalArrayIndex--)
        remainingElm = array[totalArrayIndex]
        array[totalArrayIndex] = array[currentElm]
        array[currentElm] = remainingElm
    }

    return array

}

class Game {

    constructor() {
      this.playersGuess = null
      this.pastGuesses = []
      this.winningNumber = generateWinningNumber()
    }

    difference() {
        return Math.abs(this.playersGuess - this.winningNumber)
    }
    isLower() {
        return this.playersGuess < this.winningNumber ? true : false
    }
    playersGuessSubmission (num) {
        if(num <=0) {
            message.textContent = 'That is an invalid guess. Choose a number between 1 - 100.'
            textInput.value = null
        } else if(num > 100) {
            message.textContent = 'That is an invalid guess. Choose a number between 1 - 100.'
            textInput.value = null
        } else if(typeof num !== 'number' || Number.isNaN(num)) {
            message.textContent = 'That is an invalid guess. Choose a number between 1 - 100.'
            textInput.value = null 
        } else {
            this.playersGuess = num
            return this.checkGuess(num)
        }
    //    return this.checkGuess(num)
    }
    checkGuess(num) {
          if(num === this.winningNumber) {
              message.textContent = `You Win. Press 'Restart' to play again`
              submitBtn.disabled = true;
          }else if (this.pastGuesses.length === 4 && this.pastGuesses[4] !== this.winningNumber) {
              message.textContent = `You Lose. The winning number was ${this.winningNumber}! Press 'Restart' to play again`
              submitBtn.disabled = true;
          } else if(this.difference() < 10 && this.pastGuesses.length < 4) {
              message.textContent = `You're burning up!`
              textInput.value = null
          } else if (this.difference() < 25 && this.pastGuesses.length < 4) {
              message.textContent = `You're lukewarm.`
              textInput.value = null
          } else if (this.difference() < 50 && this.pastGuesses.length < 4) {
              message.textContent = `You're a bit chilly.`
              textInput.value = null
          } else if (this.difference() < 100 && this.pastGuesses.length < 4) {
              message.textContent = `You're ice cold!`
              textInput.value = null
          } else if (this.pastGuesses.includes(num)) {
              message.textContent = 'You have already guessed that number.'
              textInput.value = null
        }
        this.pastGuesses.push(num)
    }
    provideHint() {
        let array = [this.winningNumber,generateWinningNumber(),generateWinningNumber()]

       shuffle(array)

        return `Imagine asking for hints on a guessing game LOL. It's either ${array[0]}, ${array[1]}, or ${array[2]}`
    }
}

function newGame() {
    return new Game()
}

// DOM elements

const guess1 = document.getElementById('guess1')
const guess2 = document.getElementById('guess2')
const guess3 = document.getElementById('guess3')
const guess4 = document.getElementById('guess4')

const textInput = document.getElementById('text-input')
const submitBtn = document.getElementById('submit')
const restartBtn = document.getElementById('restart')
const hintBtn = document.getElementById('hint')
const hintBox = document.getElementById('hint-text')


const game = new Game(textInput.value,[],generateWinningNumber())

submitBtn.addEventListener('click', () => {
    let value = parseInt(textInput.value)
    game.playersGuess = value
    game.playersGuessSubmission(value)
    guess1.textContent = game.pastGuesses[0]
    guess2.textContent = game.pastGuesses[1]
    guess3.textContent = game.pastGuesses[2]
    guess4.textContent = game.pastGuesses[3]
})

restartBtn.addEventListener('click',() => {
    location.reload()
})

hintBtn.addEventListener('click',() => {
    counter = 0
    hintBox.textContent = game.provideHint()
    hintBtn.disabled = true;
})
