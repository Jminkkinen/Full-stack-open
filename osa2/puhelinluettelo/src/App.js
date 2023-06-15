import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = (props) => {
  return(
      <div>
      filter shown with: <input 
        value={props.filterPerson}
        onChange={props.handleFilterChange}
      />
      </div>
  )
}

const PersonForm = (props) => {
  return(
    <form onSubmit={props.addPerson}>
      <div>
        name: <input
                value={props.newName}
                onChange={props.handleNameChange}
              />
      </div>
      <div>
        number: <input
                  value={props.newNumber}
                  onChange={props.handleNumberChange}
                />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Person = ({person}) => {
  return(
      <p>{person.name} {person.number}</p>
  )
}

const Persons = ({personsToShow}) => {
  return(
    personsToShow.map((person) => <Person key={person.id} person={person} />
    )
  )
}
const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [filterPerson, setFilterPerson] = useState('')

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }
  
  useEffect(hook, [])

  console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }

    const tuplikaatti = persons.map(person => person.name).includes(personObject.name)

    if(tuplikaatti === true) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      axios
      .post('http://localhost:3001/persons', personObject)
      .then(response => {
        console.log(response)
      })
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
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

  const handleFilterChange = (event) => {
    setFilterPerson(event.target.value)
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filterPerson.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterPerson={filterPerson} handleFilterChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} />
    </div>
  )

}

export default App