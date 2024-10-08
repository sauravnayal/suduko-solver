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
    if(!isValidSudoku(board)){
        alert("Your Sudoku does not satisfy the conditions.");
        return;
    }
    else{
        if (solveSudoku(board)) {
            writeBoard(board);
        } else {
            alert('No solution exists!');
        }
    }
    
});

// Clear button event listener
document.getElementById('clear').addEventListener('click', clearBoard);


//validation

function isValidSudoku(board) {
    // Check rows
    for (let i = 0; i < 9; i++) {
        let rowSet = new Set();
        for (let j = 0; j < 9; j++) {
            if (board[i][j] !== 0) {
                if (rowSet.has(board[i][j])) {
                    return false;
                }
                rowSet.add(board[i][j]);
            }
        }
    }

    // Check columns
    for (let j = 0; j < 9; j++) {
        let colSet = new Set();
        for (let i = 0; i < 9; i++) {
            if (board[i][j] !== 0) {
                if (colSet.has(board[i][j])) {
                    return false;
                }
                colSet.add(board[i][j]);
            }
        }
    }

    // Check 3x3 subgrids
    for (let i = 0; i < 9; i += 3) {
        for (let j = 0; j < 9; j += 3) {
            let gridSet = new Set();
            for (let k = 0; k < 3; k++) {
                for (let l = 0; l < 3; l++) {
                    let value = board[i + k][j + l];
                    if (value !== 0) {
                        if (gridSet.has(value)) {
                            return false;
                        }
                        gridSet.add(value);
                    }
                }
            }
        }
    }

    return true;
}
