const Person = ({person, deletePerson}) => {
  return (
    <div>
      {person.name} {person.number}
      <button onClick={deletePerson}>delete</button>
    </div>
  )
}

const PersonList = ({persons, deletePerson}) => persons.map((person) => <Person key={person.id} person={person} deletePerson={() => deletePerson(person.id)} />)

export default PersonList

