import { useState } from 'react'

const Mostvotes = ({points, anecdotes}) => {
  const big = Math.max(...points)
  const anecdote = points.indexOf(big)
  return (
    <div>
      <div>
        {anecdotes[anecdote]}
      </div>
      <div>
        has {big} votes
      </div>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  console.log("selektoitu:", selected)

  const [points, setPoints] = useState(new Array(8).fill(0))
  console.log("points:", points)

  const handleClick = () => {
    console.log('click')
    setPoints(points => {
      const nextPoints = [...points]
      nextPoints[selected] += 1
      return nextPoints
    })
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <div>has {points[selected]} votes</div>
      <button onClick={handleClick}>
        vote
      </button>
      <button onClick={() => setSelected(Math.floor(Math.random() * (anecdotes.length)))}>
        next anecdote
      </button>
      <h1>Anecdote with most votes</h1>
      <Mostvotes points={points} anecdotes={anecdotes}/>
    </div>

  )
}

export default App