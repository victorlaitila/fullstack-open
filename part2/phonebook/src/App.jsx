import { useState, useEffect } from 'react'
import axios from 'axios'
import PersonList from './components/PersonList'
import PersonFilter from './components/PersonFilter'
import AddPersonForm from './components/AddPersonForm'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchQuery, setNewSearchQuery] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then((response) => {
        console.log(response.data)
      })
  }, [])

  const personsToShow = searchQuery !== '' 
    ? persons.filter((person) => person.name.toLowerCase().startsWith(searchQuery.toLowerCase())) 
    : persons

  const validatePerson = () => {
    const emptyNameOrNumber = newName === '' || newNumber === ''
    if (emptyNameOrNumber) {
      const errorMsg = 'Name and number must be filled out'
      alert(errorMsg)
      return false
    }
    const nameAlreadyExists = persons.some((person) => person.name.toLowerCase() === newName.toLowerCase())
    if (nameAlreadyExists) {
      const errorMsg = `${newName} is already added to phonebook`
      alert(errorMsg)
      return false
    }
    return true
  }

  const addPerson = (event) => {
    event.preventDefault()
    const validPerson = validatePerson()
    if (validPerson) {
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
      <PersonList persons={personsToShow} />
    </div>
  )
}

export default App