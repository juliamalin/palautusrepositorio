import { voteAnecdote } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'
import  Filter  from './Filteraction'
import Notification from './Notification'


const Anecdote = ({content, votes, handleClick}) => {
    return(
    <div>
      <div>{content}</div>
    <div>
      has {votes}
      <button onClick={handleClick}>vote</button>
      </div>
  </div>
)
}


const AnecdoteList = () => {

    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state=> state.filter)
    const dispatch = useDispatch()
    let filteredAnecdotes = [...anecdotes]

    const vote = (id) => {
        console.log('vote', id)
        dispatch(voteAnecdote(id))
      }

    if (filter) {
        const lowercaseSearchText = filter.toLowerCase()
        filteredAnecdotes = filteredAnecdotes.filter(anecdote => {
            const content = anecdote.content.toLowerCase()
            return content.includes(lowercaseSearchText)
        })
    }

    return (
        <div>
            <Filter />
        {filteredAnecdotes
            .sort((a, b) => b.votes-a.votes)
            .map((anecdote) =>(
            <Anecdote
              key={anecdote.id}
              content = {anecdote.content}
              votes = {anecdote.votes}
              handleClick = {() => vote(anecdote.id)} />
            ))}
            <div>
                <Notification />
            </div>
        </div>
    )
}

export default AnecdoteList