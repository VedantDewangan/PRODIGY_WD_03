import React, { useState } from 'react';
import './App.css';

const Square = ({ value, onClick }) => (
  <button className="square" onClick={onClick}>
    {value}
  </button>
);

const Board = ({ squares, onClick }) => {
  const renderSquare = (i) => (
    <Square key={i} value={squares[i]} onClick={() => onClick(i)} />
  );

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

const Game = () => {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);
  const isDraw = !winner && current.squares.every(square => square !== null);

  const handleClick = (i) => {
    const historyUpToCurrent = history.slice(0, stepNumber + 1);
    const current = historyUpToCurrent[historyUpToCurrent.length - 1];
    const squares = current.squares.slice();

    if (winner || squares[i]) {
      return;
    }

    squares[i] = xIsNext ? 'X' : 'O';
    setHistory(historyUpToCurrent.concat([{ squares }]));
    setStepNumber(historyUpToCurrent.length);
    setXIsNext(!xIsNext);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isDraw) {
    status = 'Draw';
  } else {
    status = `${xIsNext ? 'X' : 'O'}'s Turn`;
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={handleClick} />
      </div>
      <div className="game-info">
        <div className="status">{status}</div>
        <button onClick={() => jumpTo(0)}>Restart Game</button>
      </div>
    </div>
  );
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export default Game;
