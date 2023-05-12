const App = () => {
  const courses = [
    {
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
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

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
      <p><strong>Number of exercises {tot}</strong></p>
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
      {courses.map((course) => <Course key={course.id} course={course}/>)}
    </div>
  )
}

export default App