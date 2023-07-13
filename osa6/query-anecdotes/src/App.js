import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQueryClient, useMutation, useQuery } from 'react-query'
import axios from 'axios'
import { getAnecdotes, voteAnecdote } from './requests'
import {useNotificationDispatch} from './NotificationContext'


const App = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const voteAnecdoteMutation = useMutation(voteAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })

  const handleVote = (anecdote) => {
    console.log('vote')
    voteAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes+1})
    dispatch({
      type: 'VOTE',
      payload: {
        message: `you voted '${anecdote.content}'`,
        duration: 5,
        dispatch: dispatch
      }
    })

  }

  const result = useQuery(
    'anecdotes', getAnecdotes,
    {
      refetchOnWindowFocus: false,
      retry: 1
    })
  
  console.log(result)

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError){
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
