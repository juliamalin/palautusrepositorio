import { useState, useEffect } from 'react'
import axios from 'axios'
import nameService from './services/notes'




const PersonForm = (props) => {
  return (
    <form onSubmit={props.addName}>
        <div>
          name: <input 
          value={props.newName}
          onChange = {props.handleNameChange}
          />
        </div>
        <div>
          number: <input 
          value = {props.newNumber}
          onChange={props.handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const ShowPersons = ({persons, delName}) => {
  console.log({persons})
  return (
    <div> 
    {persons.map (p => 
      <Name key={p.name} name={p.name} number={p.number} id={p.id} delName={delName}  />
    )}
  </div>
  )
}

const Name = ({name, number, id, delName}) => {
  return (
    <p>
    {name} {number}
    <Button id={id} delName={delName} />
    </p>
  )
}

const Button = ({ id, delName}) => {
  //console.log(id)
  return (
    <button onClick={()=>delName(id)}>
      delete
    </button>
  )
}

const Notification = ({message}) => {
  const notificationStyle = {
    color: 'green',
    fontSize: 16
  }

  return (
    <div style={notificationStyle}>
    {message && <div className="success-message">{message}</div>}
    </div>
  )
}

const Error = ({message}) => {
  const errorStyle = {
    color: 'red',
    fontSize: 16
  }

  return (
    <div style={errorStyle}>
    {message && <div className="success-message">{message}</div>}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122'}
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [okMessage, setOkMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)


  useEffect(()=> {
    nameService
    .getAll()
    .then(initialName => {
      setPersons(initialName)
      console.log(initialName)
    })
  },[])

  const addName = (event) => {
    event.preventDefault()
    console.log('clicked', event.target)
    const nameObject = {
      name: newName,
      number: newNumber
    }

    const existingPerson = persons.find(p => p.name === newName);

    if (existingPerson) {
      const id = existingPerson.id
      nameService
      .update(id, nameObject)
      .then(returnedName => {
        console.log(returnedName)
        setPersons(persons.map(person => person.id !== id ? person : nameObject))
        setNewName('')
              setOkMessage(`Person '${newName}' number is now changed`)
              setTimeout(()=>{
                setOkMessage(null)
              }, 5000)
      })
      .catch(error => {
        setErrorMessage('Failed to update person')
        setTimeout(()=>{
          setErrorMessage(null)
        }, 5000)
      })

      } else {
          nameService
            .create(nameObject)
            .then(returnedName => {
              console.log(returnedName)
              setPersons(persons.concat(returnedName))
              setNewName('')
              setOkMessage(`Person '${newName}' is now added`)
              setTimeout(()=>{
                setOkMessage(null)
              }, 5000)
            })
            .catch(error => {
              setErrorMessage('Failed to update person')
              setTimeout(()=>{
                setErrorMessage(null)
              }, 5000)
            })
      }

    }
  
  const delName = id => {
    const name = persons.find(p=> p.id===id)
    console.log('delete', id)
    nameService
      .del(id)
      .then(()=> {
        setPersons(persons.filter(person => person.id!==id))
        setOkMessage(`Person '${id}' is now deleted`)
        setTimeout(()=>{
          setOkMessage(null)
        }, 5000)
      })       
  }


  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={okMessage} />
      <Error message={errorMessage} />
      <PersonForm handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}
                  addName={addName} newName={newName} newNumber={newNumber} />
      <h2>Numbers</h2>
      <ShowPersons persons = {persons} delName={delName} />
    </div>
  )

}

export default App