/*----- constants -----*/
const players = {
    '1': 'white',
    '-1': 'black'
}

/*----- state variables -----*/
let board, turn, winner;

/*----- cached elements  -----*/
const msg = document.querySelector('h1');

/*----- event listeners -----*/


/*----- functions -----*/
init()

function init() {

    board = [
        [0, 1, 0, 2, 0, 3, 0, 4],
        [5, 0, 6, 0, 7, 0, 8, 0],
        [0, 9, 0, 10, 0, 11, 0, 12],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [13, 0, 14, 0, 15, 0, 16, 0],
        [0, 17, 0, 18, 0, 19, 0, 20],
        [21, 0, 22, 0, 23, 0, 24, 0]
    ];
    turn = 1;
    winner = null;
    render();
}

function renderMessage() {
    if (winner === 'T') {
        msg.innerText = "It's a Tie!!!";
    } else if (winner) {
        msg.innerHTML = `<span style= "color: ${players[winner]}">${players[winner].toUpperCase()}</span> Wins!`;
    } else {
        //game is in play
        msg.innerHTML = `<span style= "color: ${players[turn]}">${players[turn].toUpperCase()}</span>'s Turn`;
    }
};