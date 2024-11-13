const Header = ({ title }) => <h1>{title}</h1>

const Total = ({ sum }) => <p>Total of {sum} exercises</p>

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Content = ({ parts }) => parts.map((part) => <Part key={part.id} part={part} />)

const Course = ({course}) => {
  return (
    <div>
      <Header title={course.name} />
      <Content parts={course.parts} />
      <Total sum={course.parts.reduce((partialSum, part) => partialSum + part.exercises, 0)} />
    </div>
  )  
}

export default Course