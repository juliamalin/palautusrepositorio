const Header = (props) => {
  return (
    <h1>{props.name.name}</h1>
  )
}

const Part = (props) => {
  return (
    <p>{props.osa}{props.lkm}</p>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part osa={props.course.parts[0].name} lkm={props.course.parts[0].exercises}/>
      <Part osa={props.course.parts[1].name} lkm={props.course.parts[1].exercises}/>
      <Part osa={props.course.parts[2].name} lkm={props.course.parts[2].exercises}/>
    </div>
  )
}

const Total = (props) => {
  console.log(props)
  let summa = props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises
  return (
    <p>Number of exercises {summa}</p>
    )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
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
  }

  return (
    <div>
      <Header name={course} />
      <Content course={course} />
      <Total course={course}/>
    </div>
  )
}

export default App
