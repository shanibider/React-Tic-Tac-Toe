# React Tic-Tac-Toe Web App 🎮

Welcome to the React Tic-Tac-Toe web application!
This project is built using **`React and Vite`**, focusing on key **React concepts and architecture.**


## Demo 🌐
Check out the live demo:

https://github.com/shanibider/React-Tic-Tac-Toe/assets/72359805/18101d74-f340-47b4-abd3-584f666f5ab1

## Features ✨
- [x] Interactive Tic-Tac-Toe game
- [x] Highlighting the winning combination
- [x] Player turn indication
- [x] Reset game functionality
- [x] Responsive design

## Technologies Used 🛠️

- [x] **React** - A JavaScript library for building user interfaces
- [x] **Vite** - A fast build tool and development server
- [x] **CSS Modules** - For modular and reusable styles


## Key React Concepts 📚
- [x] **Components:** The app is composed of functional components like `Board` and `Square`.
- [x] **State Management:** The game state is managed using the `useState` hook.
- [x] **Props:** Data is passed between components using props to maintain a unidirectional data flow.
- [x] **Hooks:** Utilizing React hooks for state and effect management.
- [x] **Conditional Rendering:** Conditionally rendering elements based on the game state.

---

## Concepts Examples 📚
### Updating State Working with Old State

When updating state that depends on the previous state, it’s important to use a functional update to ensure you're working with the latest state:

```jsx
setGameState(prevState => {
    // logic to create new state based on prevState
});
```

### Two-Way Binding

In this project, two-way binding is not explicitly used as it's more common in form handling. However, React handles one-way data flow efficiently, where state is passed down and events bubble up.

### Multi-Dimensional List

The Tic-Tac-Toe board is represented as a 2D array (multi-dimensional list):

```jsx
const board = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];
```

### Updating State Immutably

State updates are done immutably to ensure predictable state management and rendering:

```jsx
const newBoard = [...board];
newBoard[row][col] = player;
setBoard(newBoard);
```

### Lifting State Up

State is lifted up to the `Board` component to manage the overall game state and logic, allowing child components to remain stateless and receive data via props.

```jsx
function Board() {
    const [board, setBoard] = useState(initialBoardState);
    // pass down state and handlers to Square components
}
```

### Avoid Intersecting State

Avoiding intersecting state ensures that each piece of state is managed independently, reducing complexity and potential bugs. In this app, the board state and player state are managed separately.

```jsx
const [board, setBoard] = useState(initialBoardState);
const [currentPlayer, setCurrentPlayer] = useState('X');
```

### Prefer Computed Values

Derived state or computed values are used to calculate the game's winner, reducing unnecessary state:

```jsx
const winner = calculateWinner(board);
```

### Disabling Buttons

Buttons (squares) are disabled once they are clicked or if the game has a winner:

```jsx
<button disabled={board[row][col] || winner} onClick={() => handleClick(row, col)}>
    {board[row][col]}
</button>
```



---


## Architecture 🏗️
The architecture follows a component-based structure. Each part of the application is divided into reusable components:

- **Board Component:** Manages the state of the game and renders `Square` components.
- **Square Component:** Represents each square in the Tic-Tac-Toe grid.

The state management and interaction logic are encapsulated within these components, ensuring a clear separation of concerns.

---
## Project Structure 🗂️

```
react-tic-tac-toe/
├── public/
│   ├── index.html
├── src/
│   ├── components/
│   │   ├── GameBoard.jsx
│   │   ├── GameOver.jsx
│   │   ├── Log.jsx
│   │   ├── Player.jsx
│   ├── App.jsx
│   ├── winning-combination.jsx
│   ├── index.jsx
│   ├── index.css
├── package.json
├── vite.config.js
```
---

## Getting Started 🚀
To get a local copy up and running, follow these steps:

1. **Clone the repository:**
    ```sh
    git clone https://github.com/yourusername/react-tic-tac-toe.git
    ```

2. **Navigate to the project directory:**
    ```sh
    cd react-tic-tac-toe
    ```

3. **Install dependencies:**
    ```sh
    npm install
    ```

4. **Start the development server:**
    ```sh
    npm run dev
    ```

5. **Open your browser and visit:** [http://localhost:5173](http://localhost:5173)


---

## Screenshots 🖼️
![tictactoe](https://github.com/shanibider/React-Tic-Tac-Toe/assets/72359805/8c07fe2f-37b2-4822-87e2-33cf3ea9234c)


---

> [!TIP]
> Feel free to dive into the code to understand the implementation details. Enjoy playing Tic-Tac-Toe! 🎉😊👩‍💻

## 📫 Connect with me 😊
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/shani-bider/)
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://shanibider.onrender.com/)
[![gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:shanibider@gmail.com)

<footer>
<p style="float:left; width: 20%;">
Copyright © Shani Bider, 2024
</p>
</footer>
