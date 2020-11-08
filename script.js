class Player {
    name;
    cardColor;
    score;
    constructor(name, cardColor, score) {
        this.name = name;
        this.cardColor = cardColor;
        this.score = score;
    }
}

let players = [];
let winScore = 100;
let list = document.querySelector(".players");
let input = document.querySelector(".player-name-input");
let colorRadioButtons = document.querySelectorAll("input[name='card-picker']");
let winPointsInput = document.querySelector("#win-points-input");
let startBtn = document.querySelector(".start-game-btn");
let startPage = document.querySelector(".start-page");
let boardPage = document.querySelector(".board-page");
let board = document.querySelector(".board");
let scoreHeader = document.querySelector("h2");

input.addEventListener('keypress', (e) => {
    if (e.keyCode == 13) {
        let saved = false;
        for (var el of colorRadioButtons) {
            if (el.checked) {
                savePlayer(e.target.value, el.value);
                saved = true;
                break;
            }
        }
        if (!saved) {
            alert("You have to pick a color!")
        } else {
            e.target.value = "";
        }
    }
});

startBtn.addEventListener('click', (e) => {
    startPage.classList.add("hidden");
    boardPage.classList.remove("hidden");
    if (+winPointsInput.value != 0) {
        winScore = +winPointsInput.value;
    }
    scoreHeader.textContent += ` (Points to win: ${winScore})`
    displayBoard();
});

function savePlayer(name, color) {
    players.push(new Player(name, color, 0));
    let player = document.createElement("li");
    let playerName = document.createElement("span");
    playerName.classList.add("player-title");
    playerName.textContent = name;
    let playerColor = document.createElement("span");
    playerColor.textContent = color;
    player.appendChild(playerName);
    player.appendChild(playerColor);
    list.appendChild(player);
}

function displayBoard() {
    let playerBoard;
    let playerTitle;
    let name;
    let card;
    let scoreInput;
    players.forEach((player) => {
        // create a board for player
        playerBoard = document.createElement("div");
        playerBoard.classList.add("player-board");
        // create a title
        playerTitle = document.createElement("div");
        name = document.createElement("span");
        name.textContent = player.name;
        name.classList.add("player-title");
        card = document.createElement("span");
        card.textContent = player.cardColor;
        playerTitle.appendChild(name);
        playerTitle.appendChild(card);
        playerBoard.appendChild(playerTitle);

        playerBoard.appendChild(document.createElement('hr'));

        let div = document.createElement("div");
        div.style = "display: flex; flex-direction: column;"

        let score = document.createElement("span");
        score.textContent = player.score;
        score.style = "font-size: 80px; text-align: center;";
        playerBoard.appendChild(score);
        scoreInput = document.createElement('input');
        scoreInput.addEventListener('keypress', (e) => {
            if (e.keyCode == 13) {
                player.score += +e.target.value;
                e.target.value = "";
                score.textContent = player.score;
                if (player.score >= winScore) {
                    alert(`The winner is ${player.name} with score of ${player.score}`)
                }
            }
        });
        div.appendChild(score);
        div.appendChild(scoreInput);
        playerBoard.appendChild(div);
        board.appendChild(playerBoard)
    });
}