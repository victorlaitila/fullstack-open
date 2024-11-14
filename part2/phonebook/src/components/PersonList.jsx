const Person = ({person}) => <p>{person.name} {person.number}</p>

const PersonList = ({persons}) => persons.map((person) => <Person key={person.name} person={person} />)

export default PersonList

