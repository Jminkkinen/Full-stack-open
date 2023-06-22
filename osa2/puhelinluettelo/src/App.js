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

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="added">
      {message}
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

const Person = ({person, personsToShow, persons, setPersons, setNotification}) => {

  const id = person.id
  const removePerson = (event) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personsService
      .remove(person.id)
      .then(() => {
        setPersons(persons.filter((person) => id !== person.id));
        setNotification(`Removed ${person.name}`)
        setTimeout(() => {setNotification(null)}, 5000)
      })
    }
  }

  return(
    <form onSubmit={removePerson}>
      <p>{person.name} {person.number} <button type="submit">delete</button></p>
    </form>
  )
}

const Persons = ({personsToShow, persons, setPersons, setNotification}) => {
  return(
    personsToShow.map((person) => <Person key={person.id} person={person} personsToShow={personsToShow} persons={persons} setPersons={setPersons}/>
    )
  )
}
const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterPerson, setFilterPerson] = useState('')
  const [notification, setNotification] = useState(null)

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

    const tupla = persons.filter(person => personObject.name === person.name)

    if(tuplikaatti === true) {
      if (window.confirm(`${newName} is already in the phonebook, replace old number with a new one?`)) {
        personsService
          .update(tupla[0].id, personObject)
          .then(response => {
            setPersons(persons.map(person => person.id !== tupla[0].id ? person : response.data))
          })
      }
    }
    else {
      personsService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNotification(`Added ${personObject.name}`)
        setTimeout(() => {setNotification(null)}, 5000)
        setNewName('')
        setNewNumber('')
      })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterPerson(event.target.value)
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filterPerson.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
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
      <Persons personsToShow={personsToShow} persons={persons} setPersons={setPersons} setNotification={setNotification} />
    </div>
  )

}

export default App