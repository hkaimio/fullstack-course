const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Selling the company',
        exercises: 15,
        id: 4
      } 
    ]
  }

  const Header = (props) => {
    return (
      <h1>{props.course}</h1>
    )
  }

  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>

    )
  }
  const Content = (props) => {
    return (
      <>
      {props.parts.map(p => <Part key={p.id} part={p}/>)}
      </>
    )
  }

  const Total = ({parts}) => {

    const tot = parts.reduce((exCount, part) => {
      return exCount + part.exercises
    }, 0 )
    
    return (
      <p>Number of exercises {tot}</p>
    )
  }

  const Course = ({ course }) => {
    return (
      <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />

      </div>
    )
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App