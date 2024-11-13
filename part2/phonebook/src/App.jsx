import { useState } from 'react'

const AddPersonForm = ({newName, newNumber, addPerson, handleNameChange, handleNumberChange}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        Name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        Number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  )
}

const PersonFilter = ({searchQuery, handleSearchQueryChange}) => {
  return (
    <div>
      Filter shown with <input value={searchQuery} onChange={handleSearchQueryChange} />
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchQuery, setNewSearchQuery] = useState('')

  const personsToShow = searchQuery !== '' 
    ? persons.filter((person) => person.name.toLowerCase().startsWith(searchQuery.toLowerCase())) 
    : persons

  const addPerson = (event) => {
    event.preventDefault()
    const nameAlreadyExists = persons.some((person) => person.name.toLowerCase() === newName.toLowerCase())
    if (nameAlreadyExists) {
      const errorMsg = `${newName} is already added to phonebook`
      alert(errorMsg)
    } else {
      const personObject = {name: newName, number: newNumber}
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchQueryChange = (event) => {
    setNewSearchQuery(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonFilter searchQuery={searchQuery} handleSearchQueryChange={handleSearchQueryChange} />
      <h2>Add a new</h2>
      <AddPersonForm 
        newName={newName}
        newNumber={newNumber}
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      {personsToShow.map((person) => <p key={person.name}>{person.name} {person.number}</p>)}
    </div>
  )
}

export default App