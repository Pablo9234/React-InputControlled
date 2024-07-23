import { useEffect, useState } from "react";
import axios from "axios";

export function PhoneBook() {
  const [notesState, setNotesState] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);

  //Usar useEffect para hacer fetchs
  useEffect(() => {
    axios.get("http://localhost:3001/notes").then((response) => {
    setNotesState(response.data)
    });
  }, []);

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
    setNewNote(event.target.value);
  };

  const notesToShow = showAll
    ? notesState
    : notesState.filter((note) => note.important === true);

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
      <h3>{showAll ? "All" : "Important"} Notes</h3>
      <ul>
        {notesToShow.map((note) => (
          <li key={note.id}>{note.content}</li>
        ))}
      </ul>

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          Show {showAll ? "important" : "all"}
        </button>
      </div>
    </>
  );
}
