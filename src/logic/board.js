import { WINNER_COMBOS } from "../constants.js";

export const checkWinner = (boardToCheck) => {
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
};

export const checkEndGame = (newBoard) => {
  //Si todas las celdas estan llenas, se acaba el juego y es un empate
  //every es un metodo que recorre un arreglo y retorna un booleano
  return newBoard.every((square) => square !== null)

}
