import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux' 

const AnecdoteForm = (props) => {

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value=''
        props.createAnecdote(content)
        props.showNotification(`you created '${content}'`, 5)
    }

    return (
        <form onSubmit={addAnecdote}>
        <div><input name="anecdote"/></div>
        <button type="submit">create</button>
      </form>
    )
}


const mapDispatchToProps = {
    createAnecdote,
    showNotification
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)


//vanha versio ilman connectia

/*const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value=''
        dispatch(createAnecdote(content))
        dispatch(showNotification(`you created '${content}'`, 3))
    }

    return (
        <form onSubmit={addAnecdote}>
        <div><input name="anecdote"/></div>
        <button type="submit">create</button>
      </form>
    )
}

export default AnecdoteForm*/