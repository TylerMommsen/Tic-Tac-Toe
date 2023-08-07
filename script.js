const player = (name, scores) => {
    return { name };
}


const gameBoard = (() => {
    let board =
        [null, null, null,
        null, null, null,
        null, null, null];
    
    const checkPosition = (index) => {
        if (board[index] === null) return true;
    }
    
    return { board, checkPosition };
})();


const displayController = (() => {
    const boardSquares = document.querySelectorAll('.square');
    const winnerDisplay = document.querySelector('.winner-display');
    const darkOverlay = document.querySelector('.dark-overlay');
    const restartBtn = document.querySelector('#restart');

    boardSquares.forEach(function (square, index) {
        square.addEventListener('click', () => {
            let current = gameController.handleSquareClick(index);
            if (current === 'user') {
                square.textContent = 'X';
            } else if (current === 'computer') {
                square.textContent = 'O';
            }
        })
    })

    const resetBoardUI = () => {
        boardSquares.forEach(function (square) {
            square.textContent = '';
        })

        if (winnerDisplay.style.display === 'flex') {
            darkOverlay.style.display = 'none';
            winnerDisplay.style.display = 'none';
            winnerDisplay.firstChild.textContent = ``;
        }
    }

    const displayWinner = (winner) => {
        darkOverlay.style.display = 'block';
        winnerDisplay.style.display = 'flex';
        if (winner === 'draw') {
            winnerDisplay.firstChild.textContent = "It's a draw!";
        } else {
            winnerDisplay.firstChild.textContent = `${winner.name[0].toUpperCase()}${winner.name.slice(1)} wins!`;
        }
    }

    restartBtn.addEventListener('click', () => {
        gameController.resetBoard();
    })

    return { boardSquares, resetBoardUI, displayWinner };
})();


const gameController = (() => {
    const user = player('user');
    const computer = player('computer');

    let currentTurn = user;

    const checkRoundWinner = (marker) => {
        let board = gameBoard.board;
        if (
            (board[0] === marker && board[1] === marker && board[2] === marker) || //top-across
            (board[0] === marker && board[3] === marker && board[6] === marker) || //left-down
            (board[1] === marker && board[4] === marker && board[7] === marker) || //middle-down
            (board[2] === marker && board[5] === marker && board[8] === marker) || //right-down
            (board[3] === marker && board[4] === marker && board[5] === marker) || //middle-across
            (board[6] === marker && board[7] === marker && board[8] === marker) || //bottom-across
            (board[0] === marker && board[4] === marker && board[8] === marker) || //left-diagonal
            (board[2] === marker && board[4] === marker && board[6] === marker)) { //right-diagonal
            return true;
        } 
    }

    const checkDraw = () => {
        let board = gameBoard.board;
        let hasSpaces = false;
        board.forEach(function (square, i) {
            if (square === null) {
                hasSpaces = true;
            } 
        })

        if (hasSpaces) {
            return true;
        } else {
            return false;
        }
    }

    const handleSquareClick = (index) => {
        if (gameBoard.checkPosition(index)) {
            if (currentTurn.name === 'user') {
                gameBoard.board[index] = 'X';
                if (checkRoundWinner('X')) {
                    displayController.displayWinner(currentTurn);
                } else if (!checkDraw()) {
                    displayController.displayWinner('draw');
                } else {
                    currentTurn = computer;
                }
                return 'user';
            } else {
                gameBoard.board[index] = 'O';
                if (checkRoundWinner('O')) {
                    displayController.displayWinner(currentTurn);
                } else if (!checkDraw()) {
                    displayController.displayWinner('draw');
                } else {
                    currentTurn = user;
                }
                return 'computer';
            }
        }
    }

    const resetBoard = () => {
        displayController.resetBoardUI();
        currentTurn = user;
        gameBoard.board.forEach(function (value, i) {
            gameBoard.board[i] = null;
        })
    }

    return {handleSquareClick, resetBoard}
})();