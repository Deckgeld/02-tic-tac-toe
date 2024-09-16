// import { useState } from 'react'
import { useState } from "react";
import "./App.css";

const TURNS = {
  X: "x",
  O: "o",
};

// Sqere es un componente para renderizar el contenido de cada celda
// children es el contenido que se va a renderizar
// updateBoard es una funcion que se va a ejecutar al hacer click en la celda
// index es la posicion de la celda en el tablero
const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? "is-selected" : ""}`;

  const handleClick = () => {
    updateBoard(index);
  }

  return (
    <div className={className} onClick={handleClick}>
      {children}
    </div>
  );
};

const WINNER_COMBOS = [
  //Horizontal
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  //Vertical
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  //Diagonal
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  //Arreglo de 9 elementos con valores nulos
  //fill es un metodo que llena un arreglo con un valor
  const [board, setBoard] = useState(Array(9).fill(null));

  //Estado para saber de quien es el turno, por defecto es x
  const [turn, setTurn] = useState(TURNS.X);

  //null es que no hay ganador, true es que hay un ganador, false es que es un empate
  const [winner, setWinner] = useState(null);

  const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo;
      //Si las 3 celdas son iguales y no son nulas
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a];
      }
    }
    return null;
  }

  const updateBoard = (index) => {
    //Evitar que se pueda cambiar el valor de una celda
    if ( board[index] || winner ) return

    //actualiazar tablero

    //Los estados son inmutables, por lo que no se puede modificar directamente
    //spread y rest operator, en este caso se usa el spread operator para clonar el arreglo
    const newBoard =[...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    //Cambiar de turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    //Revisar si hay un ganador
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      //En react, la renderizacion es asincrona, asi que saldra una alerta antes de que se actualice el estado
      setWinner(newWinner); 

    } //TODO: check if game is over
  }

  return (
    <main className="board">
      <h1>Tic tac toe</h1>
      <section className="game">
        {
          // map recorre el arreglo y retorna un nuevo arreglo
          // _ es el valor de cada elemento del arreglo  y index es la posicion del elemento
          // _ es un valor que no se va a utilizar

          board.map((_, index) => (
            <Square 
              key={index} 
              index={index}
              updateBoard={updateBoard}
            >
              {board[index]}
            </Square>
          ))
        }
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}> 
          {TURNS.X} 
        </Square>
        <Square isSelected={turn === TURNS.O} > 
          {TURNS.O} 
        </Square>
      </section>
    </main>
  );
}

export default App;
