const Person = ({person, deletePerson}) => {
  return (
    <div>
      {person.name} {person.number}
      <button onClick={() => deletePerson(person.id)}>delete</button>
    </div>
  )
}

const PersonList = ({persons, deletePerson}) => persons.map((person) => <Person key={person.id} person={person} deletePerson={deletePerson} />)

export default PersonList

