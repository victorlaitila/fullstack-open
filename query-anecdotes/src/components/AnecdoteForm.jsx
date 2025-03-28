import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createNew } from '../services/anecdote'
import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const AnecdoteForm = () => {
  const [notification, setNotification] = useContext(NotificationContext)
  const queryClient =  useQueryClient() 

  const newAnecdoteMutation = useMutation({
    mutationFn: createNew,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote).sort((a,b) => b.votes - a.votes))
      setNotification(`You created: ${newAnecdote.content}`)
    },
    onError: () => {
      setNotification('Anecdote too short, must be at least length 5')
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
