import { useState } from 'react'

const Button = ({text, clickHandler}) => <button onClick={clickHandler}>{text}</button>

const Statistics = ({good, bad, neutral}) => {
  const total = good + bad + neutral

  if (total > 0) {
  return (
    <>
      <h1>Statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>Total {good + bad + neutral}</p>
      <p>Average {(good - bad) / total}</p>    
    </>
  )}
  else {
    return (
      <>
        <p>No feedback given</p>
      </>
    )
  }
  
}
const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button  text="Good" clickHandler={() => setGood(good+1)}/>
      <Button  text="Neutral" clickHandler={() => setNeutral(neutral+1)}/>
      <Button  text="Bad" clickHandler={() => setBad(bad+1)}/>
      <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

export default App