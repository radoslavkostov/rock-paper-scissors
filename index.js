//move constants
const ROCK = "rock";
const PAPER = "paper";
const SCISSORS = "scissors";

//outcome constants
const WIN = "win";
const LOSS = "loss";
const DRAW = "draw";

//prompt message constants
const PROMPT_MESSAGE_INSTRUCTION = "Type out your next move (rock, paper or scissors):";

//console message constants
const CONSOLE_MESSAGE_LAST_COMPUTER_MOVE = "Last computer move: ";
const CONSOLE_MESSAGE_LAST_PLAYER_MOVE = "Last player move: ";
const CONSOLE_MESSAGE_COMPUTER_WINS = "Computer wins: ";
const CONSOLE_MESSAGE_PLAYER_WINS = "Player wins: ";
const CONSOLE_MESSAGE_DRAWS = "Draws: ";
const CONSOLE_MESSAGE_LOSS = "You lost.";
const CONSOLE_MESSAGE_WIN = "You won!";
const CONSOLE_MESSAGE_DRAW = "You tied.";
const CONSOLE_MESSAGE_INVALID_INPUT = "Invalid input! Valid input values are rock, paper and scissors."

//game-related constants
const TURNS_COUNT = 5;


let turnsLeft = TURNS_COUNT, computerWins = 0, playerWins = 0, draws = 0;
let outcome = "";

let moveIconsContainer = document.querySelector(".moveIconsContainer");
moveIconsContainer.addEventListener("click", (e) => {
    if(!turnsLeft) {
        return;
    }
    switch(e.target.className) {
        case ROCK : playRound(ROCK, generateComputerMove());
        break;
        case PAPER : playRound(PAPER, generateComputerMove());
        break;
        case SCISSORS : playRound(SCISSORS, generateComputerMove());
        break;
    }
});

function playRound(playerMove, computerMove) {
    outcome = determineOutcome(computerMove, playerMove);
    updateScore(outcome);
    addCurrentGameInformation(playerMove, computerMove);
    --turnsLeft;
    if(!turnsLeft) {
        addFinalGameInformation();
    }
}

function generateComputerMove() {
    let computerMoveRndNum = Math.random();
    if (computerMoveRndNum < 1/3) {
        return ROCK;
    }
    else if (computerMoveRndNum < 2/3) {
        return PAPER;
    }
    return SCISSORS;
}

function generatePlayerMove() {
    playerMove = prompt(PROMPT_MESSAGE_INSTRUCTION);
    playerMove = playerMove.toLowerCase();
    return playerMove;
}

function determineOutcome(computerMove, playerMove) {
    const moves = computerMove + playerMove;
    switch (moves) {
        case ROCK + ROCK: {
            return DRAW;
        }
        case ROCK + PAPER: {
            return WIN;
        }
        case ROCK + SCISSORS: {
            return LOSS;
        }
        case PAPER + ROCK: {
            return LOSS;
        }
        case PAPER + PAPER: {
            return DRAW;
        }
        case PAPER + SCISSORS: {
            return WIN;
        }
        case SCISSORS + ROCK: {
            return WIN;
        }
        case SCISSORS + PAPER: {
            return LOSS;
        }
        case SCISSORS + SCISSORS: {
            return DRAW;
        }
    }
}

function updateScore(outcome) {
    if (outcome === WIN) {
        ++playerWins;
        ++document.querySelector(".playerScore").textContent;
    }
    else if(outcome === LOSS) {
        ++computerWins;
        ++document.querySelector(".computerScore").textContent;
    }
    else {
        ++draws;
    }
}

function addFinalGameInformation() {
    let finalResultsContainer = document.createElement("div");
        finalResultsContainer.classList.add("finalResultsContainer");
    if (computerWins > playerWins) {
        finalResultsContainer.textContent = CONSOLE_MESSAGE_LOSS;
    }
    else if (computerWins < playerWins) {
        finalResultsContainer.textContent = CONSOLE_MESSAGE_WIN;
    }
    else {
        finalResultsContainer.textContent = CONSOLE_MESSAGE_DRAW;
    }
    let scoreContainer = document.querySelector(".scoreContainer");
    scoreContainer.appendChild(finalResultsContainer);
}

function addCurrentGameInformation(playerMove, computerMove) {
    let results = document.querySelector(".results");
    let currResult = document.createElement("li");
    currResult.textContent = CONSOLE_MESSAGE_LAST_COMPUTER_MOVE + computerMove + "\n" + CONSOLE_MESSAGE_LAST_PLAYER_MOVE + playerMove + "\n" +
            CONSOLE_MESSAGE_COMPUTER_WINS + computerWins + "\n" + CONSOLE_MESSAGE_PLAYER_WINS + playerWins + "\n" + CONSOLE_MESSAGE_DRAWS + draws;
    results.appendChild(currResult);

}