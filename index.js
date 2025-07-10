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
let computerMove = "", playerMove = "";
let outcome = "";
let promptMessage = "";
while (turnsLeft) {

    computerMove = generateComputerMove();
    playerMove = generatePlayerMove();
    if (playerMove !== ROCK && playerMove !== PAPER && playerMove !== SCISSORS) {
        console.log(CONSOLE_MESSAGE_INVALID_INPUT);
        continue;
    }

    outcome = determineOutcome(computerMove, playerMove);
    updateScore(outcome);
    printCurrentGameInformation();

    --turnsLeft;
}
printFinalGameInformation();

function generateComputerMove() {
    let computerMoveRndNum = Math.random();
    if (computerMoveRndNum < 1/3) {
        return ROCK;
    }
    else if (computerMove < 2/3) {
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
    }
    else if(outcome === LOSS) {
        ++computerWins;
    }
    else {
        ++draws;
    }
}

function printFinalGameInformation() {
    printCurrentGameInformation();
    if (computerWins > playerWins) {
        console.log(CONSOLE_MESSAGE_LOSS);
    }
    else if (computerWins < playerWins) {
        console.log(CONSOLE_MESSAGE_WIN);
    }
    else {
        console.log(CONSOLE_MESSAGE_DRAW);
    }
}

function printCurrentGameInformation() {
    console.log(CONSOLE_MESSAGE_LAST_COMPUTER_MOVE + computerMove + "\n" + CONSOLE_MESSAGE_LAST_PLAYER_MOVE + playerMove + "\n" +
            CONSOLE_MESSAGE_COMPUTER_WINS + computerWins + "\n" + CONSOLE_MESSAGE_PLAYER_WINS + playerWins + "\n" + CONSOLE_MESSAGE_DRAWS + draws); 
}