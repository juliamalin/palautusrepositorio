const Header = (props) => {
  return (
    <h1>{props.name}</h1>
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
      <Part osa={props.osa1.osio} lkm={props.osa1.lkm}/>
      <Part osa={props.osa2.osio} lkm={props.osa2.lkm}/>
      <Part osa={props.osa3.osio} lkm={props.osa3.lkm}/>
    </div>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.summa}</p>
    )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header name={course} />
      <Content osa1={{ osio: part1, lkm: exercises1 }} osa2={{ osio: part2, lkm: exercises2 }} osa3={{ osio: part3, lkm: exercises3 }} />
      <Total summa={exercises1 + exercises2 + exercises3}/>
    </div>
  )
}

export default App
