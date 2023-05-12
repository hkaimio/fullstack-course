
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

  export default Course