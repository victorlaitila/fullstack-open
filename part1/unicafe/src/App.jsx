import { useState } from 'react'

const Button = ({label, onClick}) => {
  return (
    <button onClick={onClick}>
      {label}
    </button>
  )
}

const StatisticLine = ({text, value, suffix=""}) => {
  return (
    <tr>
      <td>
        {text} 
      </td>
      <td>
        {value} {suffix}
      </td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad, total, avg, positive}) => {
  if (total > 0) {
    return (
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={total} />
          <StatisticLine text="average" value={avg} />
          <StatisticLine text="positive" value={positive} suffix="%"/>
        </tbody>
      </table>
    )
  }
  return (
    <p>No feedback given</p>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addReview = (type) => {
    switch (type) {
      case "good":
        setGood(good + 1)
        break
      case "neutral":
        setNeutral(neutral + 1)
        break
      case "bad":
        setBad(bad + 1)
        break
      default:
        return
    }
  };

  const total = good + neutral + bad
  const avg = total > 0 ? (good - bad) / total : 0
  const positivePercentage = total > 0 ? good / total * 100 : 0

  return (
    <div>
      <h2>Give feedback</h2>
      <div>
        <Button label="good" onClick={() => addReview("good")} />
        <Button label="neutral" onClick={() => addReview("neutral")} />
        <Button label="bad" onClick={() => addReview("bad")} />
      </div>
      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} avg={avg} positive={positivePercentage} />
    </div>
  )
}

export default App