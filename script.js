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
            if (gameBoard.checkPosition(index)) {
                if (gameController.currentTurn.name === 'User') {
                    square.textContent = 'X';
                    gameBoard.board[index] = 'X';
                    gameController.currentTurn = gameController.computer;
                } else {
                    square.textContent = 'O';
                    gameBoard.board[index] = 'O';
                    gameController.currentTurn = gameController.user;
                }
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

    return {currentTurn, user, computer, checkWinner}
})();
