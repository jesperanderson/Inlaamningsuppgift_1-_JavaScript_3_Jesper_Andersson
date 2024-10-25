import React from 'react';

const GameCells = ({ cell, onClick }) => {
  // Hanterar klickhändelsen på cellen och skickar cellens index tillbaka till föräldrakomponenten
 

  // Dynamisk klass för cellen: Lägg till 'mine' om cellen är synlig och innehåller en mina
  const cellClass = `cell ${cell.visible ? (cell.hasMine ? 'mine' : '') : ''}`;

  return (
    <div className={cellClass} onClick={onClick}>
      {}
      {cell.visible && (cell.hasMine ? "mine": cell.numberOfNeighbouringMines || '')}
    </div>
  );
};

export default GameCells;
