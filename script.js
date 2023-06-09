const validSquares = document.querySelectorAll('.brown');

let currPlayer = 'black';

validSquares.forEach(square => {
    square.addEventListener('click', function () {
        let blackPiece = square.querySelector('.black-piece');
        let whitePiece = square.querySelector('.white-piece');
        let row = parseInt(square.id.charAt(3));
        let col = parseInt(square.id.charAt(1));
        if (blackPiece && playerPiece(blackPiece)) {
            removeHighlight();
            square.classList.add('selected');

            const allowedMoves = findValidMoves(col, row);

            allowedMoves.forEach(move => {
                let validSquare = document.getElementById('c' + move.col + 'r' + move.row);

                validSquare.classList.add('allowed-move');
            })
        }
        else if (whitePiece && playerPiece(whitePiece)) {
            removeHighlight();
            square.classList.add('selected');

            const allowedMoves = findValidMoves(col, row);

            allowedMoves.forEach(move => {
                let validSquare = document.getElementById('c' + move.col + 'r' + move.row);

                validSquare.classList.add('allowed-move');
            })
        }
        else if (square.classList.contains('allowed-move')) {

            movePiece(square, blackPiece, whitePiece);
            removeHighlight();
            square.classList.remove('selected');

            if (currPlayer === 'black') {
                currPlayer = 'white';
            } else {
                currPlayer = 'black';
            }

            let turn = document.querySelector('h1');
            turn.textContent = (currPlayer === 'black') ? "Black's Turn" : "White's Turn";
        }
    });
});

function movePiece(square, blackPiece, whitePiece) {
    const targetRow = parseInt(square.id.charAt(3));

    if (blackPiece) {
        blackPiece.parentNode.removeChild(blackPiece);
    } else if (whitePiece) {
        whitePiece.parentNode.removeChild(whitePiece);
    }


    const newPiece = document.createElement('div');
    newPiece.classList.add(currPlayer === 'black' ? 'black-piece' : 'white-piece');
    square.appendChild(newPiece);


    const isBlackKing = currPlayer === 'black' && targetRow === 7;
    const isWhiteKing = currPlayer === 'white' && targetRow === 0;
    if (isBlackKing || isWhiteKing) {
        newPiece.classList.add('king');
    }
}


function playerPiece(piece) {
    if ((currPlayer === 'black' && piece.classList.contains('black-piece')) || (currPlayer === 'white' && piece.classList.contains('white-piece'))) {
        return true;
    }
    return false;
}

function removeHighlight() {
    validSquares.forEach(function (square) {
        square.classList.remove('selected');
        square.classList.remove('allowed-move');
    });
}

function findValidMoves(col, row) {
    let validMoves = [];
    let piece = document.querySelector('#c' + col + 'r' + row + ' .black-piece, #c' + col + 'r' + row + ' .white-piece');

    let black = piece.classList.contains('black-piece');
    let white = piece.classList.contains('white-piece');

    let leftCol = col - 1;
    let rightCol = col + 1;
    let newRowB = row + 1;
    let newRowW = row - 1;

    if (black) {
        if (isValidMove(leftCol, newRowB,)) {
            validMoves.push({ col: leftCol, row: newRowB });
        }
        if (isValidMove(rightCol, newRowB)) {
            validMoves.push({ col: rightCol, row: newRowB, });
        }
    }
    else if (white) {
        if (isValidMove(leftCol, newRowW,)) {
            validMoves.push({ col: leftCol, row: newRowW });
        }
        if (isValidMove(rightCol, newRowW)) {
            validMoves.push({ col: rightCol, row: newRowW, });
        }
    }

    return validMoves;
}


function isValidMove(col, row) {
    if (row >= 0 && row < 8 && col >= 0 && col < 8) {
        let square = document.getElementById('c' + col + 'r' + row);
        let piece = square.querySelector('.black-piece, .white-piece');
        if (!piece) {
            return true;
        }
    }
    return false;
}