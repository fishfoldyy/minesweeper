const board = document.getElementById('board');
let cells = [];

function createBoard(rows, cols) {
  const cellsArray = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.row = i;
      cell.dataset.col = j;
      cell.addEventListener('click', handleClick);
      board.appendChild(cell);
      cellsArray.push(cell);
    }
  }
  return cellsArray;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function placeMines(cellsArray, numMines) {
  const mines = [];
  while (mines.length < numMines) {
    const index = getRandomInt(cellsArray.length);
    if (!mines.includes(index)) {
      mines.push(index);
      cellsArray[index].classList.add('mine'); // Mark the cell as a mine
    }
  }
}
function countAdjacentMines(cellsArray, row, col) {
  let count = 0;
  for (let i = row - 1; i <= row + 1; i++) {
    for (let j = col - 1; j <= col + 1; j++) {
      if (i >= 0 && i < 10 && j >= 0 && j < 10 && !(i === row && j === col)) {
        const index = i * 10 + j;
        if (cellsArray[index].querySelector('i')) {
          count++;
        }
      }
    }
  }
  return count;
}

function revealCell(cellsArray, row, col) {
  const index = row * 10 + col;
  const cell = cellsArray[index];

  if (!cell.classList.contains('clicked')) {
    cell.classList.add('clicked');
    const count = countAdjacentMines(cellsArray, row, col);
    if (!cell.classList.contains('mine')) {
      if (count > 0) {
        cell.textContent = count;
      } else {
        // Loop through adjacent cells and reveal each if not already clicked and not a mine
        for (let i = row - 1; i <= row + 1; i++) {
          for (let j = col - 1; j <= col + 1; j++) {
            if (i >= 0 && i < 10 && j >= 0 && j < 10 && !(i === row && j === col)) {
              const adjacentIndex = i * 10 + j;
              const adjacentCell = cellsArray[adjacentIndex];
              if (!adjacentCell.classList.contains('clicked')) {
                revealCell(cellsArray, i, j); // Recursively reveal adjacent cell
              }
            }
          }
        }
      }
    }
  }
}

function handleClick(event) {
  const row = parseInt(event.target.dataset.row);
  const col = parseInt(event.target.dataset.col);
  const index = row * 10 + col;
  const cell = cells[index];

  if (!cell.classList.contains('clicked')) {
    revealCell(cells, row, col);
    cell.classList.add('clicked');
  }
}

cells = createBoard(10, 10);
placeMines(cells, 15);
