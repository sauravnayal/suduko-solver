// Function to check if placing a number is valid
function isValid(board, row, col, num) {
    for (let i = 0; i < 9; i++) {
        if (board[row][i] == num || board[i][col] == num || 
            board[3 * Math.floor(row / 3) + Math.floor(i / 3)][3 * Math.floor(col / 3) + i % 3] == num) {
            return false;
        }
    }
    return true;
}

// Backtracking algorithm to solve the Sudoku
function solveSudoku(board) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] == '.') {
                for (let num = 1; num <= 9; num++) {
                    if (isValid(board, i, j, num)) {
                        board[i][j] = num;
                        if (solveSudoku(board)) {
                            return true;
                        } else {
                            board[i][j] = '.';
                        }
                    }
                }
                return false;
            }
        }
    }
    return true;
}

// Function to read the board from the input fields
function readBoard() {
    let board = [];
    for (let i = 0; i < 9; i++) {
        let row = [];
        for (let j = 0; j < 9; j++) {
            let cell = document.getElementById(`cell-${i}-${j}`);
            let cellValue = cell.value;
            row.push(cellValue === '' ? '.' : cellValue);
            if(cellValue==='') cell.style.backgroundColor="#493787"
        }
        board.push(row);
    }
    return board;
}

// Function to write the solved board back to the input fields
function writeBoard(board) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            document.getElementById(`cell-${i}-${j}`).value = board[i][j] !== '.' ? board[i][j] : '';
        }
    }
}

// Function to clear the board
function clearBoard() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            document.getElementById(`cell-${i}-${j}`).value = '';
            document.getElementById(`cell-${i}-${j}`).style.backgroundColor = "#121212";
        }
    }
}

// Solve button event listener
document.getElementById('solve').addEventListener('click', function() {
    let board = readBoard();
    if (solveSudoku(board)) {
        writeBoard(board);
    } else {
        alert('No solution exists!');
    }
});

// Clear button event listener
document.getElementById('clear').addEventListener('click', clearBoard);
