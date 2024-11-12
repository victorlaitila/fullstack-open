import { useState } from 'react'

const AnecdoteWithVotes = ({ noOfVotes, anecdote }) => {
  return (
    <div>
      {anecdote}
      <div>Has {noOfVotes} vote(s)</div>
    </div>
  )
}

const AnecdoteButton = ({label, onClick}) => {
  return (
    <button onClick={onClick}>
      {label}
    </button>
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
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVote] = useState(Array(8).fill(0))
  const [favoriteAnecdoteIndex, setFavoriteAnecdoteIndex] = useState(0);


  const displayNextAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomIndex)
  }

  const voteForAnecdote = () => {
    const updatedVotes = [...votes]
    updatedVotes[selected] += 1
    setVote(updatedVotes)
    // Updating favoriteAnecdoteIndex if the current anecdote has more votes than the favorite
    if (updatedVotes[selected] > updatedVotes[favoriteAnecdoteIndex]) {
      setFavoriteAnecdoteIndex(selected);
    }
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <AnecdoteWithVotes noOfVotes={votes[selected]} anecdote={anecdotes[selected]} />
      <div>
        <br></br>
        <AnecdoteButton label="Vote" onClick={() => voteForAnecdote()} />
        <AnecdoteButton label="Next anecdote" onClick={() => displayNextAnecdote()} />
      </div>
      <h2>Anecdote with most votes</h2>
      <AnecdoteWithVotes noOfVotes={votes[favoriteAnecdoteIndex]} anecdote={anecdotes[favoriteAnecdoteIndex]} />
    </div>
  )
}

export default App