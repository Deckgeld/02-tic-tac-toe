// Square es un componente para renderizar el contenido de cada celda
// children es el contenido que se va a renderizar
// updateBoard es una funcion que se va a ejecutar al hacer click en la celda
// index es la posicion de la celda en el tablero
export const Square = ({ children, isSelected, updateBoard, index }) => {
    const className = `square ${isSelected ? "is-selected" : ""}`;
  
    const handleClick = () => {
      updateBoard(index);
    };
  
    return (
      <div className={className} onClick={handleClick}>
        {children}
      </div>
    );
  };