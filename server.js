/**
 * SETUP THE WEB APPLICATION OBJECT TO LISTEN ON A PORT
 * - Import express
 * - Create an express object instance
 * - Get the port or use a default value
 * - Have the app on that port
 * - Serve static files to clients
 */
const express = require("express");
const { json } = require("express/lib/response");
const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
app.use(express.static("./public/"));


/**
 * DEFINE GET REQUESTS FOR THE GAME
 * - A default main menu
 * - A random cpu move
 */
app.get("/api", (request, response) => {
    const baseUrl = `${request.protocol}://${request.get("host")}/api`;
    const data = {
        message: "Welcome to my Rock Paper Scissors game!",
        links: {
            play: `${baseUrl}/play`,
            get_random_move: `${baseUrl}/getRandomMove`
        }
    };
    response.json(data);
});

app.get("/api/getRandomMove", (request, response) => {
    const baseUrl = `${request.protocol}://${request.get("host")}/api`;
    const move = getMove();
    const data = {
        message: `The computer chooses ${move}`,
        choice: move,
        links: {
            menu: baseUrl,
            play: `${baseUrl}/play`
        }
    };
    response.json(data);
});

app.get("/api/play*", (request, response) => {
    const baseUrl = `${request.protocol}://${request.get("host")}/api`;
    const playerChoice = request.originalUrl.substring(10);
    let output, choices;
    if (playerChoice.length < 4) {
        output = `To play, add your choice after ${baseUrl}/play/`;
    } else {
        let playerCode = getCode(playerChoice);
        let cpuChoice = getMove();
        choices = [playerChoice.toLowerCase(), cpuChoice.toLowerCase()];
        let cpuCode = getCode(cpuChoice);
        let outcome = getWinner(playerCode, cpuCode);
        output = `YOU ${outcome}!`;
    }
    const data = {
        message: output,
        choices,
        links: {
            menu: baseUrl,
            get_random_move: `${baseUrl}/getRandomMove`
        }
    };
    response.json(data);
});

app.get("*", (request, response) => {
    const baseUrl = `${request.protocol}://${request.get("host")}/api`;
    data = {
        message: "Please enter a valid url",
        links: {
            menu: baseUrl,
            get_random_move: `${baseUrl}/getRandomMove`,
            play: `${baseUrl}/play`
        }
    };
    response.json(data);
});



/**
 * DEFINE USEFUL FUNCTIONS FOR THE SERVER TO USE
 * - Turn a string move into a number
 * - Get the winner given 2 numbers
 * - Get a random move
 */

// Get a number for a move
function getCode(move) {
    switch(move.toLowerCase()) {
        case "rock":
            return 1;
        case "paper":
            return 2;
        case "scissors":
            return 3;
        default:
            return -1;
    }
}

// Get the winner
function getWinner(p, c) {
    let n = p - c;
    let mod = ((n % 3) + 3) % 3;
    switch(mod) {
        case 1:
            return "WIN";
        case 2:
            return "LOSE";
        default:
            return "DRAW";
    }
}

function getMove() {
    return ["Rock", "Paper", "Scissors"][Math.floor(Math.random()*3)];
}