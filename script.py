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
      cellsArray[index].classList.add('mine');
    }
  }
}

function countAdjacentMines(cellsArray, row, col) {
  let count = 0;
  for (let i = row - 1; i <= row + 1; i++) {
    for (let j = col - 1; j <= col + 1; j++) {
      if (i >= 0 && i < 10 && j >= 0 && j < 10 && !(i === row && j === col)) {
        const index = i * 10 + j;
        if (cellsArray[index].classList.contains('mine')) {
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
    if (count > 0) {
      cell.textContent = count;
    } else {
      for (let i = row - 1; i <= row + 1; i++) {
        for (let j = col - 1; j <= col + 1; j++) {
          if (i >= 0 && i < 10 && j >= 0 && j < 10 && !(i === row && j === col)) {
            revealCell(cellsArray, i, j);
          }
        }
      }
    }
  }
}

function handleClick(event) {
  const row = parseInt(event.target.dataset.row);
  const col = parseInt(event.target.dataset.col);
  revealCell(cells, row, col);
}

cells = createBoard(10, 10);
placeMines(cells, 15);