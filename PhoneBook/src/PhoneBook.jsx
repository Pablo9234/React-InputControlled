import { useState } from "react";

export function PhoneBook({ notes }) {
  const [notesState, setNotesState] = useState(notes);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: notesState.length + 1,
    };
    setNotesState(notesState.concat(noteObject));
    setNewNote("");
  };

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };

  const notesToShow = showAll
    ? notesState
    : notesState.filter(note => note.important === true);

  return (
    <>
      <h1>Notes</h1>
      <div>
        <form onSubmit={addNote}>
          <input value={newNote} onChange={handleNoteChange} />
          <div>
            <button type="submit">Send</button>
          </div>
        </form>
      </div>
      <h3>{showAll ? 'All' : 'Important'} Notes</h3>
      <ul>
        {notesToShow.map((note) => (
          <li key={note.id}>{note.content}</li>
        ))}
      </ul>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          Show {showAll ? 'important' : 'all'}
        </button>
      </div>
    </>
  );
}
