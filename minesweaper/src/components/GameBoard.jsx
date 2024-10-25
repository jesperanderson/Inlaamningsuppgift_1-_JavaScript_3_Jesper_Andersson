import React, { Component } from 'react';
import GameCells from './GameCells';
import { createBoard } from '../Utils';

class GameBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: createBoard(5, 7),  // Tar emot argument från Utils.js - 5x5 grid med 7 minor
      gameOver: false, // En boolean som indikerar om spelet är förlorat (om spelaren klickat på en mina).
      gameWon: false, // En boolean som indikerar om spelet är vunnet (alla icke-min-celler är avslöjade).
    };
  }

  handleClick = (index) => {
    const { board, gameOver } = this.state;
    if (gameOver || board[index].visible) return;
  
    if (board[index].hasMine) {
      board[index].visible = true;       // Markera cellen som synlig
      board[index].revealed = true;      // Markera cellen som avslöjad
      this.setState({ board, gameOver: true });  // Sätt gameOver till true om det är en mina
    } else {
      board[index].visible = true;
      this.checkWin();
    }
  
    this.setState({ board });
  };
  
  

    // Här kontrolleras det om alla celler som inte innehåller minor har blivit synliga. 
    // Om så är fallet, sätts 'gameWon' till true.
  checkWin = () => {
    const { board } = this.state;
    const allCellsRevealed = board.every(cell => cell.visible || cell.hasMine);
    if (allCellsRevealed) {
      this.setState({ gameWon: true });
    }
  };

  // Reset och genererar en ny spelplan 
  resetGame = () => {
    this.setState({
      board: createBoard(5, 7), 
      gameOver: false,
      gameWon: false,
    });
  };

  render() {
    const { board, gameOver, gameWon } = this.state;

    // Genererar text samt knapp för att indikera att spelet är slut
    // key är en prop som hjälper till att hålla reda på varje enskild cell och renderingen.

    return (
      <div className="game-board">
        {gameOver && <div className="game-status">Game Over, You hit a mine!</div>}
        {gameWon && <div className="game-status">Congratulations, You won!</div>}

        <div className="grid">
          {board.map(cell => (
            <GameCells key={cell.index} cell={cell} onClick={this.handleClick} />
          ))}
        </div>

        {(gameOver || gameWon) && (
          <button className="play-again-btn" onClick={this.resetGame}>
            Play Again
          </button>
        )}
      </div>
    );
  }
}

export default GameBoard;
