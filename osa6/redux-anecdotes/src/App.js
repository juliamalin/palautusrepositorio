import AnecdoteForm from './components/Anecdoteform'
import AnecdoteList from './components/Anecdotelist'



const App = () => {


  
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList/>
      <h2>create new</h2>
      <AnecdoteForm/>
    </div>
  )
}

export default App