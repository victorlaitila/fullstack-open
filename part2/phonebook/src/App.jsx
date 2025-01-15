import { useState, useEffect } from 'react'
import PersonList from './components/PersonList'
import PersonFilter from './components/PersonFilter'
import AddPersonForm from './components/AddPersonForm'
import Notification from './components/Notification'
import phoneNumberService from './services/phoneNumbers'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchQuery, setNewSearchQuery] = useState('')
  const [notificationData, setNotificationData] = useState(null)

  useEffect(() => {
    initializeNumbers()
  }, [])

  const initializeNumbers = async () => {
    const initialNumbers = await phoneNumberService.getAll()
    setPersons(initialNumbers)
  }

  const personsToShow = searchQuery !== '' 
    ? persons.filter((person) => person.name.toLowerCase().startsWith(searchQuery.toLowerCase())) 
    : persons

  const showNotification = (message, type) => {
    setNotificationData({message, type});
    setTimeout(() => {
      setNotificationData(null)
    }, 5000);
  }

  const validatePerson = async () => {
    const emptyNameOrNumber = newName === '' || newNumber === ''
    if (emptyNameOrNumber) {
      const errorMsg = 'Name and number must be filled out'
      alert(errorMsg)
      return false
    }
    const nameAlreadyExists = persons.some((person) => person.name.toLowerCase() === newName.toLowerCase())
    if (nameAlreadyExists) {
      const confirmUpdateMsg = `${newName} is already added to phonebook, replace the old number with a new one?`
      if (window.confirm(confirmUpdateMsg)) {
        const personToUpdate = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
        const newPersonObject = {...personToUpdate, number: newNumber}
        const updatedPerson = await phoneNumberService.updateById(personToUpdate.id, newPersonObject)
        setPersons(persons.map(person => person.id === updatedPerson.id ? updatedPerson : person))
        showNotification(`Number successfully updated for ${updatedPerson.name}!`, 'success')
      }
      return false
    }
    return true
  }

  const addPerson = async (event) => {
    event.preventDefault()
    const validPerson = await validatePerson()
    if (validPerson) {
      const newId = (persons.length + 1).toString()
      const personObject = {name: newName, number: newNumber, id: newId}
      const newPerson = await phoneNumberService.create(personObject)
      setPersons(persons.concat(newPerson))
      showNotification(`${newName} was succesfully added to phonebook!`, 'success')
      setNewName('')
      setNewNumber('')
    }
  }

  const deletePerson = async (id) => {
    const personToDelete = persons.find(p => p.id === id)
    const confirmationMsg = `Delete ${personToDelete?.name} ?`
    if (window.confirm(confirmationMsg)) {
      try {
        const deletedNumber = await phoneNumberService.deleteById(id)
        const updatedList = persons.filter(p => p.id !== deletedNumber.id)
        setPersons(updatedList)
        showNotification(`${personToDelete.name} was succesfully deleted from phonebook!`, 'success')
      } catch(error) {
        showNotification(`Information of ${personToDelete.name} has already been removed from the server!`, 'failure')
        // Rerendering numbers
        initializeNumbers()
      }
      
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
      <Notification notificationData={notificationData} />
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