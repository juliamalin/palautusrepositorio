import { useMutation, useQueryClient } from 'react-query'
import { createAnecdote } from '../requests'

import {useNotificationDispatch} from '../NotificationContext'

const AnecdoteForm = () => {
  const dispatch = useNotificationDispatch()
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
    }
  })

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    try {
      await newAnecdoteMutation.mutateAsync({content, votes: 0})
      dispatch({
        type: 'CREATE',
        payload: {
          message: `you created '${content}'`,
          duration: 5,
          dispatch: dispatch
        }
      })
    } catch (error) {
      console.log(error)
      dispatch({
        type: 'CREATE',
        payload: {
          message: `Error: ${error.response.data.error}`,
          duration: 5,
          dispatch: dispatch
        }
      })
    }

}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
