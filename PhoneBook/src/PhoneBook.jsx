import { useEffect, useState } from "react";
import axios from "axios";

export function PhoneBook() {
  const [notesState, setNotesState] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);

  //Usar useEffect para hacer fetchs
  useEffect(() => {
    axios.get("http://localhost:3001/notes").then((response) => {
      setNotesState(response.data);
    });
  }, []);

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    };
    axios
      .post("http://localhost:3001/notes", noteObject) //Metodo Post
      .then((response) => {
        setNotesState(notesState.concat(response.data));
        setNewNote("");
      });
  };

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  const notesToShow = showAll
    ? notesState
    : notesState.filter((note) => note.important === true);

  
    const handleImportant = (id) => {
      const url = `http://localhost:3001/notes/${id}`; //Ruta de la nota que quiero cambiar
      const note = notesState.find((n) => n.id === id); 
      const changeId = {...note, important: !note.important};

      axios.put(url, changeId).then((response) => {
        setNotesState(
          notesState.map((note) => (note.id !== id ? note : response.data))
        );
      });
    }

    const deletePost = (id) => {
      axios.delete(`http://localhost:3001/notes/${id}`).then((response) => {
        setNotesState(notesState.filter((note) => note.id !== id))
        console.log(notesState)
      })
    }

  return (
    <>
      <h1>{notesState.length > 0 ? "My notes" : "Create Note"}
        </h1>
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
          <li key={note.id}>
            {note.content}{" "}
            <button onClick={()=>handleImportant(note.id)}>
              {note.important ? "Make not important" : "Make important"}
            </button>
            <button onClick={()=>deletePost(note.id)}>Delete</button>
          </li>
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
