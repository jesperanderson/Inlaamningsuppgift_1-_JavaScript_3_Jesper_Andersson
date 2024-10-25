export function createBoard(size, numberOfMines) {
    let board = [];
    
    // Skapar ett tomt spelbräde med celler
    for (let i = 0; i < size * size; i++) {
      board.push({
        index: i,
        hasMine: false,
        numberOfNeighbouringMines: 0,
        visible: false,
      });
    }
  
    // Placerar minor random
    let minesPlaced = 0;
    while (minesPlaced < numberOfMines) {
      const randomIndex = Math.floor(Math.random() * size * size);
      if (!board[randomIndex].hasMine) {
        board[randomIndex].hasMine = true;
        minesPlaced++;
      }
    }
  
    // Kalkulerar minor som närliggande
    const directions = [-1, 1, -size, size, -size-1, -size+1, size-1, size+1];
    board.forEach((cell, index) => {
      if (!cell.hasMine) {
        let numberOfMines = 0;
        directions.forEach(dir => {
          const neighborIndex = index + dir;
          if (neighborIndex >= 0 && neighborIndex < size * size && board[neighborIndex]?.hasMine) {
            numberOfMines++;
          }
        });
        cell.numberOfNeighbouringMines = numberOfMines;
      }
    });
  
    return board;
  }
  