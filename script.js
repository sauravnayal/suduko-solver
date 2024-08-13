function getInputValues() {
    let grid = [];
    for (let i = 0; i < 9; i++) {
        let row = [];
        for (let j = 0; j < 9; j++) {
            let cell = document.getElementById(`cell-${i}-${j}`);
            let cellValue = cell.value;
            //error statement call
            row.push(cellValue ? parseInt(cellValue) : 0);
            
        }
        grid.push(row);
    }
    return grid;
}

function solve(grid) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (grid[i][j] == 0) {
                for (let c = 1; c <= 9; c++) {
                    if (isValid(grid, i, j, c)) {
                        grid[i][j] = c;
                        if (solve(grid)) {
                            return true;
                        } else {
                            grid[i][j] = 0;
                        }
                    }
                }
                return false;  // backtrack
            }
        }
    }
    return true;
}
function isValid(grid, row, col, c) {
    for (let i = 0; i < 9; i++) {
        if (grid[row][i] == c || grid[i][col] == c) {
            return false;
        }
        // Calculate the starting row and column of the 3x3 sub-grid
        let subGridRow = 3 * Math.floor(row / 3) + Math.floor(i / 3);
        let subGridCol = 3 * Math.floor(col / 3) + (i % 3);
        if (grid[subGridRow][subGridCol] == c) {
            return false;
        }
    }
    return true;
}


const grid = getInputValues();

const solve_btn = document.getElementById("solve");
solve_btn.addEventListener("click", function () {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            let cellValue = document.getElementById(`cell-${i}-${j}`);
            if(cellValue.value==0)
            cellValue.style.backgroundColor = "#493787";
        }
    }
    const sol = solve(grid);
    console.log(grid);
    if (sol == true) {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                let cellValue = document.getElementById(`cell-${i}-${j}`);
                //error statement call
                cellValue.value = grid[i][j];
            }
        }
    }
});

const clear_btn = document.getElementById("clear");
clear_btn.addEventListener("click",function(){
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            let cellValue = document.getElementById(`cell-${i}-${j}`);
            cellValue.value = '';
            cellValue.style.backgroundColor="#121212"
        }
    }
})