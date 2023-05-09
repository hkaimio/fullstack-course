const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
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
      {props.parts.map(p => <Part part={p}/>)}
      </>
    )
  }

  const Total = (props) => {

    let tot = 0;
    for (const p of parts) {
      tot += p.exercises;
    }
    return (
      <p>Number of exercises {tot}</p>
    )
  }
  return (
    <div>
      <Header course={course}/>
      <Content parts={parts}/>
      <Total parts={parts}/>
      
    </div>
  )
}

export default App