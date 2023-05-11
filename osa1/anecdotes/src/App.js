import { useState } from 'react'

const getRandomInt = (max) => Math.floor(Math.random() * max);

const Button = ({text, clickHandler}) => <button onClick={clickHandler}>{text}</button>

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
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [mostVoted, setMostVoted] = useState(0)

  const voteAnecdote = (n) => {
    let copy = [...votes]
    copy[n] += 1
    setVotes(copy)
    setMostVoted(argmax(copy))
  }

  const argmax = (arr) => {
    let maxValue = 0
    let maxIndex = 0
    let n
    for (n=0; n < arr.length; n++) {
      if (arr[n] > maxValue) {
        maxIndex = n
        maxValue = arr[n]
      }
    }
    return maxIndex
  }

  const Anecdote = ({number}) => {
    return (
    <p>
      {anecdotes[number]}
      <br/>
      Has {votes[number]} votes.
    </p>
    )
  }
   
  return (
    <div>
        <Anecdote number={selected}/>
      <Button clickHandler={() => voteAnecdote(selected)} text="Vote"/>
      <Button clickHandler={() => setSelected(getRandomInt(anecdotes.length))} text="Show anecdote"/>
      <p>Anecdote with most votes:</p>
      <Anecdote number={mostVoted}/>
    </div>
  )
}

export default App