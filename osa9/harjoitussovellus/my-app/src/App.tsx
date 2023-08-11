interface HeaderProps {
  courseName: string
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartExtended extends CoursePartBase {
  description : string
}

interface CoursePartBasic extends CoursePartExtended {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartExtended {
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartRequirements extends CoursePartExtended {
  requirements: string[];
  kind: "special"
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartRequirements;

interface ContentProps {
  courseParts: CoursePart[];
}

interface TotalProps {
  numberOfExercises: number
}

const Part = (props: {coursePart: CoursePart}) => {
  const part = props.coursePart
    switch(part.kind) {
      case "basic":
        return (
          <p>
          <strong>{part.name} {part.exerciseCount}</strong> <br />
          <i>{part.description} </i>
        </p>
        );
      case "group":
        return (
          <p>
          <strong>{part.name} {part.exerciseCount}</strong> <br />
          project exercises {part.groupProjectCount}
        </p>
        );
      case "background":
        return (
          <p>
          <strong>{part.name} {part.exerciseCount}</strong> <br />
          <i>{part.description} </i><br />
          submit to {part.backgroundMaterial}
        </p>
        );
        case "special":
          return (
            <p>
            <strong>{part.name} {part.exerciseCount}</strong> <br />
            <i>{part.description} </i><br />
            required skills:  {part.requirements.join(", ")}
          </p>
          );
    default:
      return null
  }
}

const Header = (props: HeaderProps) => {
  return <h1>{props.courseName}</h1>
}

const Content = (props: ContentProps) => {
  return (
    <div>
        {props.courseParts.map ((coursePart, index) => (
          <div key = {index}>
          <Part coursePart={coursePart}/>
          </div>
        ))}
    </div>
  )
}

const Total = (props: TotalProps) => {
  return <div>Number of exercises {props.numberOfExercises}</div>
}

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    }
  ];



  const numberOfExercises = courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)

  return (
    <div>
      <Header courseName= {courseName}/>
      <Content courseParts= {courseParts}/>
      <Total numberOfExercises= {numberOfExercises}/>
    </div>
  );
};

export default App;