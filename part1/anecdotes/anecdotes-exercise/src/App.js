import { useState } from 'react'

const Header = ({ text }) => <h2>{text}</h2>

const Button = ({ handleClick, text}) => (
  <button onClick={handleClick}>
      {text}
  </button>
)

const Anecdote = ({ text, votesCount }) => (
  <div>
    <p>{text}</p>
    <p>has {votesCount} votes</p>
  </div>
)

const Result = ({ anecdotes, allVotes }) => {
  const highestVoteCount = Math.max(...allVotes)
  const highestVoteIndex = allVotes.indexOf(highestVoteCount)
  const mostVotedAnecdote = anecdotes[highestVoteIndex]

  if (highestVoteCount === 0) {
    return (
      <p>No votes yet</p>
    )
  }
  
  return (
    <div>
      <p>{mostVotedAnecdote}</p>
      <p>has {highestVoteCount} votes</p>
    </div>
  )

}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(0)
  const [allVotes, setAllVotes] = useState(Array(6).fill(0))

  const handleVoteClick = () => {
    const newAllVotes = [...allVotes]
    newAllVotes[selected] += 1
    setAllVotes(newAllVotes)
  }

  const handleAnecdoteClick = () => {
    const arrayIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(arrayIndex)
  }

  return (
    <div>
      <Header text="Anecdote of the day" />
      <Anecdote text={anecdotes[selected]} votesCount={allVotes[selected]} />
      <br></br>
      <Button handleClick={handleVoteClick} text='vote' />
      <Button handleClick={handleAnecdoteClick} text='next anecdote' />
      <br></br>
      <Header text="Anecdote with most votes" />
      <Result anecdotes={anecdotes} allVotes={allVotes} />
    </div>
  )
}

export default App