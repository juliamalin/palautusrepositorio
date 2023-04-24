const Header = ({name}) => {
  console.log(name)

  return (
    <h2>{name}</h2>
  )
}

const Part = ({osa}) => {
  console.log(osa)
  return (
    <p>{osa.name} {osa.exercises}</p>
  )
}

const Content = (props) => {
  const {parts} = props
  console.log(parts)
  return (
    <div>
      {parts.map (c => 
    <Part key={c.id} osa={c} />
    )}
    </div>
  )
}

const Course =({courses}) =>{
  console.log(courses)

  return (
    <div>
      {courses.map (c=>
          <div key={c.id}>
           <Header name={c.name} />
           <Content parts={c.parts} />
           <Total parts={c.parts}/>
           </div>
        )}
    </div>
  )

}

const Total = (props) => {
  console.log(props)
  const {parts} = props
  let sum = 0
  parts.map(value => {
    sum+=value.exercises
  })
  return (
    <p><strong>Number of exercises {sum}</strong></p>
    )
}

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

  return (
    <div>
      <h1>Web development curriculum</h1>
      <Course courses={courses} />
    </div>
  )
}

export default App

