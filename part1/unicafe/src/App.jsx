import { useState } from 'react'

const FeedbackButton = ({label, onClick}) => {
  return (
    <button onClick={onClick}>
      {label}
    </button>
  )
}

const Statistic = ({label, value}) => <p>{label} {value}</p>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [avg, setAvg] = useState(0)

  const addReview = (type) => {
    switch (type) {
      case 'good':
        setGood(good + 1)
        break
      case 'neutral':
        setNeutral(neutral + 1)
        break
      case 'bad':
        setBad(bad + 1)
        break
      default:
        return
    }
    // Continue here
    const updatedTotal = total + 1
    setTotal(total + 1)
    const updatedAvg = (good - bad) / updatedTotal
    setAvg(updatedAvg)
  };

  return (
    <div>
      <h2>Give feedback</h2>
      <div>
        <FeedbackButton label='good' onClick={() => addReview('good')} />
        <FeedbackButton label='neutral' onClick={() => addReview('neutral')} />
        <FeedbackButton label='bad' onClick={() => addReview('bad')} />
      </div>
      <h2>Statistics</h2>
      <div>
        <Statistic label='good' value={good} />
        <Statistic label='neutral' value={neutral} />
        <Statistic label='bad' value={bad} />
        <Statistic label='all' value={total} />
        <Statistic label='average' value={avg} />
      </div>
    </div>
  )
}

export default App