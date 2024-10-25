import React, { Component } from 'react';
import GameCells from './GameCells';
import createBoard from '../Utils';

class GameBoard extends Component {
  constructor(props) {
    super(props);
    const boardArr = createBoard(25, 7); // Skapar ett 5x5 bräde med 7 minor
    console.log("CONSTRUCTOR2", boardArr.map((cell) => { return {...cell}}));
    this.state = {
      board: boardArr, // Sätter startbrädet i state
      gameOver: false, // Indikerar om spelet är förlorat
      gameWon: false, // Indikerar om spelet är vunnet
    };
    console.log("STATE", this.state);
  }

  handleClick = (index) => {
    const { board, gameOver } = this.state;
    if (gameOver || board[index].visible) return; // Avbryter om spelet är över eller cellen redan är klickad

    if (board[index].hasMine) {
      board[index].visible = true; // Markera cellen som synlig om den är en mina
      this.setState({ board, gameOver: true }); // Sätt spelet som över
    } else {
      board[index].visible = true; // Markera cellen som synlig om den inte är en mina
      this.checkWin(); // Kontrollera om spelaren har vunnit
    }

    this.setState({ board });
  };

  checkWin = () => {
    const { board } = this.state;
    const allCellsRevealed = board.every(cell => cell.visible || cell.hasMine);
    if (allCellsRevealed) {
      this.setState({ gameWon: true }); // Sätt spelet som vunnet om alla icke-min-celler är avslöjade
    }
  };

  resetGame = () => {
    this.setState({
      board: createBoard(25, 7), // Återställ spelet
      gameOver: false,
      gameWon: false,
    });
  };

  render() {
    const { board, gameOver, gameWon } = this.state;

    return (
      <div className="game-board">
        {gameOver && <div className="game-status">Game Over, You hit a mine!</div>}
        {gameWon && <div className="game-status">Congratulations, You won!</div>}

        <div className="grid">
          {board.map((cell, index) => (
            <GameCells key={index} cell={cell} onClick={(evt) => this.handleClick(index)} />
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
