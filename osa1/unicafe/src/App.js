import { useState } from 'react'

const StatisticLine = (props) => (
<tr><th align="left">{props.text}</th> <th align="left">{props.value}</th></tr>
)


const Statistics = (props) =>  {
  const all = props.good + props.neutral + props.bad

  if (all !== 0) {
    return(
      <div>
        <h1>statistics</h1>
        <StatisticLine text="good" value ={props.good} />
        <StatisticLine text="neutral" value ={props.neutral} />
        <StatisticLine text="bad" value ={props.bad} />
        <StatisticLine text="all" value ={all} />
        <StatisticLine text="average" value ={(props.good - props.bad) / all} />
        <StatisticLine text="positive" value ={Math.round((props.good / all * 100) * 10) / 10 + " %"} />
      </div>
    )
  }
}

const Button = (props) => (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App