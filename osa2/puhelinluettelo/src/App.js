import { useState, useEffect } from 'react'
import personsService from './services/persons'

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

const Person = ({person, personsToShow}) => {

  const removePerson = (event) => {
    event.preventDefault()
    if (window.confirm(`Delete ${person.name} ?`)) {
      personsService
      .remove(person.id)
      // .then(response => {
      //   personsToShow.remove(person.id)
      // })
    }
    // personsService
    // .remove(person.id)
    // .then(response => {
    //   setPersons(persons.map(person => person.id !== id))
    // })
  }

  return(
    <form onSubmit={removePerson}>
      <p>{person.name} {person.number} <button type="submit">delete</button></p>
    </form>
  )
}

const Persons = ({personsToShow}) => {
  return(
    personsToShow.map((person) => <Person key={person.id} person={person} personsToShow={personsToShow} />
    )
  )
}
const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [filterPerson, setFilterPerson] = useState('')

  useEffect(() => {
    personsService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

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
      personsService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })
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