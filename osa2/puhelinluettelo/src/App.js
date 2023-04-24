import { useState } from 'react'

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

const ShowPersons = ({persons}) => {
  return (
    <div> 
    {persons.map (p => 
      <Name key={p.name} name={p.name} number={p.number} />
    )}
  </div>
  )
}

const Name = ({name, number}) => {
  return (
    <p>
    {name} {number}
    </p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }

  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')



  const addName = (event) => {
    event.preventDefault()
    console.log('clicked', event.target)
    const nameObject = {
      name: newName,
      number: newNumber
    }
    if (persons.some(person => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat(nameObject))
      setNewName('')
    }
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
      <PersonForm handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}
                  addName={addName} newName={newName} newNumber={newNumber}/>
      <h2>Numbers</h2>
      <ShowPersons persons = {persons} />
    </div>
  )

}

export default App