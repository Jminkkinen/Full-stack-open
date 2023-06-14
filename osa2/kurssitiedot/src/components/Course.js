
const Header = ({header}) => {
    return (
      <div>
        <h2>
          {header}
        </h2>
      </div>
    )
  }
  
  const Part = ({part}) => {
    return(
      <p>{part.name} {part.exercises}</p>
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
  
    let number = content.map((part) =>
      part.exercises
    )
  
    let result = number.reduce((a, b) => {
      return a + b;
    })
  
    return (
      <b>total of {result} exercises</b>
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

export default Course