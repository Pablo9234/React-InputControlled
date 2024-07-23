import { useState, useEffect } from "react";
import axios from "axios";
export function Contacts() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('');
  const [search,setSearch] = useState('')

  useEffect(()=>{
    axios.get('http://localhost:3001/people')
    .then(response => {
      const contacts = response.data
      setPersons(contacts)
    })
  },[])

  const handleName = (event) => {
    setNewName(event.target.value);
    //Entradas controladas del nombre
  };

  const handleNumber = (event) => {
    setNewNumber(event.target.value);
   //Entrada controlada del number
  };

  const addPerson = (event) => {
    event.preventDefault();
    if(persons.find(person => person.name === newName)){
        alert(`${newName} is already in the contact list` )
        return;
    }
    //Creo objeto de la persona para poder añadirlo al array de objetos
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    setPersons(persons.concat(newPerson));
    setNewName("");
    setNewNumber("");
  };

  const personsToShow = search
  ? persons.filter(person =>
        person.name.toLowerCase().includes(search.toLocaleLowerCase())
    )
  : persons;

  const handleSearch = (event) =>{
    setSearch(event.target.value)
  };

  return (
    <>
      <h1>Contacts</h1>
      <div>
        <form onSubmit={addPerson}>
          Name: <input onChange={handleName} value={newName} />
          Number : <input onChange={handleNumber} value={newNumber} />
          <button type="submit">Save Contact</button>
        </form>
      </div>
      <div>
      <ul>
          {personsToShow.map((person)=>(
           <li key={person.id}>{person.name} {person.number}</li> 
          ))}
        </ul>
      </div>

    <div>      
        <h2>Find Person</h2>
        <input onChange={handleSearch} value={search} placeholder="Search a contact"/>
    </div>
    </>
  );
}
