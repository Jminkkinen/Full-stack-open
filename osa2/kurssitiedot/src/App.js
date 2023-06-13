
const Header = ({header}) => {
  return (
    <div>
      <h1>
        {header}
      </h1>
    </div>
  )
}

const Part = ({part}) => {
  return(
    <p>{part.name} {part.exercises}</p>
    // <div>
    //   <p>
    //     {props.part.name} {props.part.exercises}
    //   </p>
    // </div>
  )
}

const Content = ({content}) =>  {
  return (
    <div>
      {content.map(part => 
          <Part key={part.id} part={part} />
      )}
    </div>
  )
}

const Total = ({content}) => {

  let sum
  let counter
  const number = content.map((part) =>
    sum = part.exercises,
  );

  console.log(sum)
  return (
    <div>
      total of {sum} exercises
    </div>
  )
}

const Course = (props) => {
  return (
    <div>
      <Header header={props.course.name} />
      <Content content={props.course.parts} />
      <Total content={props.course.parts} />
    </div>
  )
}
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
      name: 'Redux',
      exercises: 11,
      id: 4
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
      {/* <Content parts={course.parts} /> */}
      {/* <Total parts={course.parts} /> */}
    </div>
  )
}

export default App