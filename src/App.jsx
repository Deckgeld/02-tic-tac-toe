// import { useState } from 'react'
import { useState } from "react";
import "./App.css";
import confetti from "canvas-confetti";

import { Square } from './components/Square'
import { TURNS } from './constants'
import { checkWinner, checkEndGame } from './logic/board'
import { WinnerModal } from './components/WinnerModal'

function App() {
  //Arreglo de 9 elementos con valores nulos
  //fill es un metodo que llena un arreglo con un valor
  const [board, setBoard] = useState(Array(9).fill(null));

  //Estado para saber de quien es el turno, por defecto es x
  const [turn, setTurn] = useState(TURNS.X);

  //null es que no hay ganador, true es que hay un ganador, false es que es un empate
  const [winner, setWinner] = useState(null);

  

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
  }

  const updateBoard = (index) => {
    //Evitar que se pueda cambiar el valor de una celda
    if (board[index] || winner) return;

    //actualiazar tablero

    //Los estados son inmutables, por lo que no se puede modificar directamente
    //spread y rest operator, en este caso se usa el spread operator para clonar el arreglo
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    //Cambiar de turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    //Revisar si hay un ganador
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      confetti();
      //En react, la renderizacion es asincrona, asi que saldra una alerta antes de que se actualice el estado
      setWinner(newWinner);
    } 
    else if (checkEndGame(newBoard)){
      setWinner(false);
    }
  };

  return (
    <main className="board">
      <h1>Tic tac toe</h1>

      <button onClick={resetGame}>Reset del juego</button>

      <section className="game">
        {
          // map recorre el arreglo y retorna un nuevo arreglo
          // _ es el valor de cada elemento del arreglo  y index es la posicion del elemento
          // _ es un valor que no se va a utilizar

          board.map((square, index) => (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {square}
            </Square>
          ))
        }
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  );
}

export default App;
