interface HeaderProps {
  courseName: string
}

interface CoursePart {
  name: string;
  exerciseCount: number;
}

interface ContentProps {
  courseParts: CoursePart[];
}

interface TotalProps {
  numberOfExercises: number
}

const Header = (props: HeaderProps) => {
  return <h1>{props.courseName}</h1>
}

const Content = (props: ContentProps) => {
  return (
    <div>
        {props.courseParts.map ((coursePart, index) => (
          <p key = {index}>
            {coursePart.name} {coursePart.exerciseCount}
          </p>
        ))}
    </div>
  )
}

const Total = (props: TotalProps) => {
  return <div>Number of exercises {props.numberOfExercises}</div>
}

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 8
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  const numberOfExercises = courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)

  return (
    <div>
      <Header courseName= {courseName}/>
      <Content courseParts = {courseParts}/>
      <Total numberOfExercises= {numberOfExercises}/>
    </div>
  );
};

export default App;