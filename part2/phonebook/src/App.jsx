import { useState, useEffect } from 'react'
import PersonList from './components/PersonList'
import PersonFilter from './components/PersonFilter'
import AddPersonForm from './components/AddPersonForm'
import phoneNumberService from './services/phoneNumbers'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchQuery, setNewSearchQuery] = useState('')

  useEffect(() => {
    phoneNumberService.getAll()
      .then(initialNumbers => {
        setPersons(initialNumbers)
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
      const newId = (persons.length + 1).toString()
      const personObject = {name: newName, number: newNumber, id: newId}
      phoneNumberService.create(personObject)
        .then(response => {
          setPersons(persons.concat(response))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const deletePerson = (id) => {
    const personToDelete = persons.find(p => p.id === id)
    const confirmationMsg = `Delete ${personToDelete?.name} ?`
    if (window.confirm(confirmationMsg)) {
      phoneNumberService.deleteById(id)
        .then(response => {
          const updatedList = persons.filter(p => p.id !== response.id)
          setPersons(updatedList)
        })
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
      <PersonList persons={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App