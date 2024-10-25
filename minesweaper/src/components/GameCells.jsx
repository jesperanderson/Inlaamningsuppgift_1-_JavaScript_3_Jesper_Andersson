// src/components/GameCells.js

import React from 'react';

const GameCells = ({ cell, onClick }) => {
  const handleClick = () => {
    onClick(cell.index);
  };

  // Kontrollera om cellen ska ha klassen 'mine' om den innehåller en mina och är avslöjad
  const cellClass = `cell ${cell.visible ? (cell.hasMine && cell.revealed ? 'mine' : '') : ''}`;

  return (
    <div className={cellClass} onClick={handleClick}>
      {cell.visible && !cell.hasMine && cell.numberOfNeighbouringMines > 0 ? cell.numberOfNeighbouringMines : ''}
    </div>
  );
};

export default GameCells;
