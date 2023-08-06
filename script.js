const scores = { user: 0, computer: 0 };

const player = (name, scores) => {
    const increaseScore = () => {
        scores[name]++;
    }
    return { name, increaseScore };
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
    const userScore = document.querySelector('#user');
    const computerScore = document.querySelector('#computer');
    const winnerDisplay = document.querySelector('.winner-display');
    const darkOverlay = document.querySelector('.dark-overlay');

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

    const updateScore = (player) => {
        if (player.name === 'user') {
            userScore.textContent = `User: ${scores.user}`;
        } else {
            computerScore.textContent = `Computer: ${scores.computer}`;
        }
    }

    const resetBoardUI = () => {
        boardSquares.forEach(function (square) {
            square.textContent = '';
        })

        if (winnerDisplay.style.display === 'flex') {
            darkOverlay.style.display = 'none';
            winnerDisplay.style.display = 'none';
            winnerDisplay.textContent = ``;
            userScore.textContent = 'User: 0';
            computerScore.textContent = 'Computer: 0';
        }
    }

    const displayWinner = (winner) => {
        darkOverlay.style.display = 'block';
        winnerDisplay.style.display = 'flex';
        winnerDisplay.textContent = `${winner.name[0].toUpperCase()}${winner.name.slice(1)} wins!`;
    }

    return { boardSquares, updateScore, resetBoardUI, displayWinner };
})();


const gameController = (() => {
    const user = player('user', scores);
    const computer = player('computer', scores);

    let currentTurn = user;

    const checkGameWinner = () => {
        if (scores[currentTurn.name] === 3) {
            displayController.displayWinner(currentTurn);
            setTimeout(() => { 
                displayController.resetBoardUI();
                scores['user'] = 0;
                scores['computer'] = 0;
            }, 3000);
            return;
        }
    }

    const checkRoundWinner = () => {
        let marker = null;
        if (currentTurn === user) {
            marker = 'X';
        } else {
            marker = 'O';
        }

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

    const handleSquareClick = (index) => {
        if (gameBoard.checkPosition(index)) {
            if (currentTurn.name === 'user') {
                gameBoard.board[index] = 'X';
                if (checkRoundWinner()) {
                    currentTurn.increaseScore();
                    displayController.updateScore(currentTurn);
                    resetBoard();
                    checkGameWinner();
                    return;
                }
                currentTurn = computer;
                return 'user';
            } else {
                gameBoard.board[index] = 'O';
                if (checkRoundWinner()) {
                    currentTurn.increaseScore();
                    displayController.updateScore(currentTurn);
                    resetBoard();
                    checkGameWinner();
                    return;
                }
                currentTurn = user;
                return 'computer';
            }
        }
    }

    const resetBoard = () => {
        displayController.resetBoardUI();
        gameBoard.board.forEach(function (value, i) {
            gameBoard.board[i] = null;
        })
    }

    return {handleSquareClick, user}
})();
