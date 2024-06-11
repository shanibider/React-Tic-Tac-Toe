// receives the board state and the onSelectSquare function as props.
export default function GameBoard({ onSelectSquare, board }) {
  
  
  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}> {/* Each row as a key prop of 'rowIndex'*/}
          <ol>

            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}> {/*'colIndex' is key prop for each cell in the row.*/}
              {/* we add here anonymous function, so we get full control on how onSlectSqure will be executed,
              so how handleSelectSquare will be handeled, and we can pass (rowIndex, colIndex) arguments to this function,
              and therfore in the end to 'handleSelectSquare' function, since its the value for 'onSelectSquare' prop.
              and with that we making sure that the data arrives and store. */}
                {/* adding onClick */}
                {/* prevent button to be clicked more than once.
                disabled prop is a react button element. If it's X/O make it disabled. */}
                <button
                  onClick={() => onSelectSquare(rowIndex, colIndex)}
                  disabled={playerSymbol !== null}
                >
                  {playerSymbol}
                </button>
              </li>
            ))} {/* End of callback function of row.map() */}

          </ol>
        </li>
      ))} {/* End of callback function of initialGameBoard.map() */}

    </ol>
  );
}






// The outer list represents rows, and each inner list represents columns within a row (an array).
// Each cell is rendered as a button, initially showing null values.
/*
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
*/
// top element is an ordered list (<ol>) with an id of game-board.
// 1. Mapping Rows: The array is being mapped to generate its rows.
// Each row is mapped to a list item (<li>), and the rowIndex is used as the key prop to uniquely identify each row.
// 2. Mapping Columns: Each row is itself an array, and its elements (playerSymbol) are mapped to individual list items (<li>).
// Inside each list item, there's a button displaying the playerSymbol. Initially, all buttons display null.
