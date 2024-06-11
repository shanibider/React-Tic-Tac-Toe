import { useState } from 'react';

// Two way binding, for player's name; get access to values entered by an input field (onChange, and managing a state),
// and this updated value reflected back.

export default function Player({
  initialName,
  symbol,
  isActive,
  onChangeName,
}) {
  const [playerName, setPlayerName] = useState(initialName); // i want to manage the player's name
    // Adding this variable to know if the user is editing the name (boolean)
  const [isEditing, setIsEditing] = useState(false);

  function handleEditClick() {
    // "setIsEditing(true);" this is not good enough because we want to reverse the value of isEditing.
    // When updating a state based on previous state, it's better to use a function as an argument to the setter function!
    setIsEditing((editing) => !editing);

    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  }


  // recieve an elemnt 'event'
  function handleChange(event) {
    setPlayerName(event.target.value); // the value entered by the user
  }

   // By default, playerName is a span element with the player's name.
  // Because isEditing is false.
  let editablePlayerName = <span className="player-name">{playerName}</span>;
  // let btnCaption = 'Edit';

  // if isEditing is true (meaning 'Edit' button was clicked and it triggered handleEditClick),
  // playerName will be an input element.
  // value attribute used to set the value of the input element.
  // I use dynamic value, playerName.
  if (isEditing) {
    editablePlayerName = (
      // listening to event (change in input) with onChange prop.
      <input type="text" required value={playerName} onChange={handleChange} />
    );
    // btnCaption = 'Save';
  }


  return (
    <li className={isActive ? 'active' : undefined}>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
    </li>
  );
}
