const player = (name) => {
    let score = 0;
    const increaseScore = () => score++;
    return { name, score, increaseScore };
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

    boardSquares.forEach(function (square, index) {
        square.addEventListener('click', () => {
            let current = gameController.handleSquareClick(index);
            if (current === 'User') {
                square.textContent = 'X';
            } else if (current === 'Computer') {
                square.textContent = 'O';
            }
        })
    })

    return { boardSquares };
})();

const gameController = (() => {
    const user = player('User');
    const computer = player('Computer');

    let currentTurn = user;

    const checkWinner = () => {
        if (currentTurn.score === 3) {
            currentTurn.increaseScore();
            return currentTurn;
        }
    }

    const handleSquareClick = (index) => {
        if (gameBoard.checkPosition(index)) {
            if (currentTurn.name === 'User') {
                gameBoard.board[index] = 'X';
                currentTurn = computer;
                return 'User';
            } else {
                gameBoard.board[index] = 'O';
                currentTurn = user;
                return 'Computer';
            }
        }
    }

    return {handleSquareClick}
})();
