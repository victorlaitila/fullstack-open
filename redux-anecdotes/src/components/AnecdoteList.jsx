import { useDispatch, useSelector } from "react-redux"
import { upvoteAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const anecdotes = useSelector(({anecdotes, filter}) => {
    if (filter) {
      const filteredAnecdotes = anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
      return filteredAnecdotes.sort((a,b) => b.votes - a.votes)
    } else {
      return [...anecdotes].sort((a,b) => b.votes - a.votes)
    }
  })

  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(upvoteAnecdote(id))
    const anecdote = anecdotes.find(a => a.id === id).content
    const toastMessage = `You voted for: ${anecdote}`
    dispatch(setNotification(toastMessage, 5))
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList