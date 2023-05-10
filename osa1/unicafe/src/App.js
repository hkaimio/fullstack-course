import { useState } from 'react'

const Button = ({text, clickHandler}) => <button onClick={clickHandler}>{text}</button>

const StatisticsLine = ({text, value, formatter}) => {
  let valueText
  if (formatter) {
    valueText = formatter.format(value)
  }
  else
  {
    valueText = value
  }
  return (<tr><td>{text}</td><td>{valueText}</td></tr>)
}
const Statistics = ({ good, bad, neutral }) => {
  const total = good + bad + neutral

  const avgFormatter = new Intl.NumberFormat()
  const percentFormatter = new Intl.NumberFormat(undefined, {style: "percent"})
  if (total > 0) {
    return (
      <>
        <h1>Statistics</h1>
        <table>
          <tbody>
            <StatisticsLine text="good" value={good} />
            <StatisticsLine text="neutral" value={neutral} />
            <StatisticsLine text="bad" value={bad} />
            <StatisticsLine text="Total" value={good + bad + neutral} />
            <StatisticsLine text="Average" value={(good - bad) / total} formatter={avgFormatter}/>
            <StatisticsLine text="Positive" value={(good) / total} formatter={percentFormatter}/>
          </tbody>
        </table>
      </>
    )
  } else {
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