const cells = document.querySelectorAll('[data-cell]');
const statusText = document.getElementById('status');
const resultDisplay = document.getElementById('resultDisplay');
const resetButton = document.getElementById('resetButton');
let isXTurn = true;
let board = Array(9).fill(null);

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const checkWinner = () => {
    for (const [a, b, c] of winningCombinations) {
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return board.includes(null) ? null : 'draw';
};

const handleClick = (event) => {
    const cell = event.target;
    const index = [...cells].indexOf(cell);

    if (board[index] !== null || resultDisplay.value) return;

    board[index] = isXTurn ? 'X' : 'O';
    cell.textContent = isXTurn ? 'X' : 'O';
    const winner = checkWinner();

    if (winner) {
        const message = winner === 'draw' ? "It's a draw!" : `${winner} wins!`;
        statusText.textContent = message;
        resultDisplay.value = message;
        cells.forEach(cell => cell.removeEventListener('click', handleClick));
    } else {
        isXTurn = !isXTurn;
        statusText.textContent = `Turn: ${isXTurn ? 'X' : 'O'}`;
    }
};

const resetGame = () => {
    board = Array(9).fill(null);
    cells.forEach(cell => {
        cell.textContent = '';
        cell.addEventListener('click', handleClick);
    });
    isXTurn = true;
    statusText.textContent = 'Turn: X';
    resultDisplay.value = '';
};

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
