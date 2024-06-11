import { useState } from 'react';

import Player from './components/Player.jsx';
import GameBoard from './components/GameBoard.jsx';
import Log from './components/Log.jsx';
import GameOver from './components/GameOver.jsx';
import { WINNING_COMBINATIONS } from './winning-combinations.js';

// object to store player names associated with their symbols
const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
};

// array full of arrays (refrences values)
const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]; // Initial empty game board setup


// Function to derive the active player based on the game turns
function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X'; // Default starting player is 'X'.
  // If there are turns and the first turn's player is 'X', the current player should be 'O'.

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
}


// Derive the game board state based on the game turns, with a brand new array (thanks to deep copy)
function deriveGameBoard(gameTurns) {
  // Create a deep copy of the initial game board to avoid mutation.
  // (not using the inital game board, but make a copy of it)
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];

    // Populate the game board based on the game turns
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player; // Set the player symbol in the respective square
    // when im setting the player symbol im doing it on the original array, so after resetting the game,
    // the inital game board will be still this edited old array.
    // The solution is to make a deep copy of the initial game board, and then edit it. (let gameBoard = [...INITIAL_GAME_BOARD], and [...array])
  }
  return gameBoard;
}




function deriveWinner(gameBoard, players) {
  let winner; // Variable to store the winner if there is one.

  // Check for a winner by comparing squares against the winning combinations.
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    // If all three squares in a combination are the same and not null, we have a winner.
    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol]; // Set the winner to the symbol ('X' or 'O').
    }
  }
  return winner; 
}



function App() {
  // adding new state to store player names.
  // 'players' will store player name associated with his symbol, 
  // and 'setPlayers' should be called whenever we click 'save' button in Player component.
  const [players, setPlayers] = useState(PLAYERS);
  /* same as writing:
  const [players, setPlayers] = useState({
    X: 'Player 1',
    O: 'Player 2'
  });
  */
  // State (array) that keeps track of the turns taken in the game.
  // Each turn is represented as an object with details about the player and the square selected.
  const [gameTurns, setGameTurns] = useState([]); // whenever a square is clicked, we will add a new turn to this array


  const activePlayer = deriveActivePlayer(gameTurns); // Derive the active player based on the game turns
  const gameBoard = deriveGameBoard(gameTurns); // Derive the game board state based on the game turns
  const winner = deriveWinner(gameBoard, players); // Determine the winner based on the game board state
  const hasDraw = gameTurns.length === 9 && !winner; // Check if the game is a draw (all squares filled and no winner).  Draw is when all 9 fileds are full, means game turns is 9. (can be seen in the log on the screen)



  // called when a square is selected, and toggles the activePlayer state between 'X' and 'O'.
  function handleSelectSquare(rowIndex, colIndex) {
    // update the game board based on the selected square clicked.
    // we want to keep previous state, so we use it as an argument in the callback function
    setGameTurns((prevTurns) => { // recieve an array of previous turns
      // we create currentPlayer to not use activePlayer directly
      // create a copy of the previous game board using spread syntax
      const currentPlayer = deriveActivePlayer(prevTurns); // Determine the current player


      // insert the new turn at the beginning of the array, and then spread the previous turns.
      // ensuring the most recent turn is always at the start of the array. Example below.
      // 1. creation of a new array  
      // 2. This part of the array is an object representing the new turn, and has two properties:
      // square: object with two properties, row and col, representing the position of the square on the game board that was selected.
      // The values for row and col are provided by the rowIndex and colIndex parameters of 'handleSelectSquare'.
      // player: This indicates which player made the move. The value is provided by the currentPlayer variable, which is determined based on the previous turns.
      // 3.  ...  is used to take all the elements of the prevTurns array (array holding all previous turns) and insert them into the new updatedTurns array.
      // By placing the spread operator after the new turn object, you ensure that the new turn is added at the beginning of the updatedTurns array, followed by all the previous turns.
     // in player we dont want to store 'activePlayer', so we create 'currentPlayer' instead.
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }


  // handle restarting the game
  // I want this function to triggered from the button in GameOver, so i accept there 'onRestart' prop,
  // and here i'll declare 'onRestart' prop with this function as a value.
  function handleRestart() {
    setGameTurns([]); // Reset the game turns state
  }



  // Update player data - function to handle changing a player's name (setPlayers)
  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      // return a new object which is a new player state where i'll spread my 
      // old player into. And then I'll override one of the 2 properties of the player
      return {
        ...prevPlayers,
        [symbol]: newName
      };
    });
  }


  return (
    <main>
      <div id="game-container">
      {/* an ordered list contains two "Player" components, each with different props.
      The "isActive" prop is set based on whether "activePlayer" state variable matches the symbol prop ('X' or 'O').
      This allows the CSS class "highlight-player" to highlight the active player.*/}    
        <ol id="players" className="highlight-player">  {/* adding css style to highlight the current player */}
        {/* While the 2 players shared the same component (Player), they worked isolated from each other.
         Each one use their own Component instance! */}
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === 'X'}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === 'O'}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {/* adding 'onRestart' prop, with function to handle restart of the game */}
        {/* Render GameOver component if there's a winner or a draw and pass the handleRestart function */}
        {/* Will use 'GameOver' component if we have a winner, or draw, and will pass the sympbol throught 'winner' prop. */}
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        {/* Render GameBoard component and pass down the handleSelectSquare function and the game board state */}
        {/* passing 2 props - gameTurns array as 'turns', and handleSelectSquare as'onSelectSquare' */}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
       {/* Render Log component and pass down the game turns */}
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;



{/*
This code replace this HTML code:
<ol id="players">
  <li>
    <span className="player">
      <span className="player-name">Player 1</span>
      <span className="player-symbol">X</span>
    </span>
    <button>Edit</button>
  </li>
  <li>
    <span className="player">
      <span className="player-name">Player 2</span>
      <span className="player-symbol">O</span>
    </span>
    <button>Edit</button>
  </li>
*/}


/*
### Example
Let's assume the `prevTurns` array has the following structure before the new move is made:
const prevTurns = [
  { square: { row: 0, col: 0 }, player: 'X' },
  { square: { row: 1, col: 1 }, player: 'O' },
];

When `handleSelectSquare(2, 2)` is called and `currentPlayer` is determined to be 'X':
const updatedTurns = [
  { square: { row: 2, col: 2 }, player: 'X' },
  { square: { row: 0, col: 0 }, player: 'X' },
  { square: { row: 1, col: 1 }, player: 'O' },
];

The result is a new array with the new turn prepended, which is then used to update the state, 
maintaining the sequence of game turns with the latest move at the front.
*/
