import { useState } from 'react'

const Button = ({ handleClick, text}) => (
  <button onClick={handleClick}>
      {text}
  </button>
)

const Header = (props) => {
  const { description } = props

  return (
    <h1>{description}</h1>
  )
}

const StatisticLine = (props) => {
  const { value, text } = props

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>{text} {value}</td>
          </tr>
        </tbody>
      </table>
    </div>
    
    //<p>{text} {value}</p>

  )
    
    
}

const Statistics = (props) => {
  const { good, neutral, bad, text_good, text_neutral, text_bad, text_total, text_avg, text_positive } = props


  const total = good + neutral + bad
  const avg = (good + neutral + bad) / 2

  if (total === 0) {
    return (
      <div>
        <p>No feedback given.</p>
      </div>
    )
  }

  
  return (
    <div>
      <p>{text_good} {good}</p>
      <p>{text_neutral} {neutral}</p>
      <p>{text_bad} {bad}</p>
      <p>{text_total} {total}</p>
      <p>{text_avg} {avg/total}</p>
      <p>{text_positive} {(good/total) * 100 + '%'}</p>
    </div>
  )

}



const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  const total = good + neutral + bad
  const avg = (good + neutral + bad) / 2
 
  return (
    <div>
      <Header description='give feedback' />
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />

      <Header description='statistics' />
      {/* <Statistics good={good} bad={bad} neutral={neutral} text_good='good' text_bad='bad' text_total='all' text_neutral='neutral' text_avg='average' text_positive='positive' /> */}
      <StatisticLine text='good' value={good} />
      <StatisticLine text='neutral' value={neutral} />
      <StatisticLine text='bad' value={bad} />
      <StatisticLine text='all' value={total} />
      <StatisticLine text='average' value={avg/total} />
      <StatisticLine text='positive' value={(good / total) * 100 + '%'} />


    </div>
  )
}

export default App