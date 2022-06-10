import { useState, useEffect } from 'react'
import axios from 'axios'
// import Filter from './components/Filter'
import personService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)

  // useEffect(() => {
  //   console.log('effect')
  //   axios
  //     .get('http://localhost:3001/persons')
  //     .then(response => {
  //       console.log('promise fulfilled')
  //       setPersons(response.data)
  //     })
  // }, [])
  // console.log('render', persons.length, 'notes')

  // useEffect(() => {
  //   personService
  //     .getAll()
  //     .then(response => {
  //       setPersons(response.data)
  //     })
  // }, [])

  // 2.16: Phonebook step8
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)

    const person = persons.filter((p) => p.name === newName)
    const personToAdd = person[0]
    const updatedPerson = { ...personToAdd, number: newNumber }
    console.log(person.length)

    if (person.length !== 0) {
      if (window.confirm(`${personToAdd.name} is already added to the phonebook, replace the old number with the new one?`)) {
        personService.update(updatedPerson.id, updatedPerson).then(returnedPerson => {
          console.log(`${returnedPerson.name} successfully updated`)

          setPersons(persons.map(p => p.id !== personToAdd.id ? p : returnedPerson))
          setNewName('')
          setNewNumber('')
          setMessage(
            `${updatedPerson.name} was successfully updated`
          )
        })
        .catch((error) => {
          console.log(error)
          setPersons(persons.filter(p => p.id !== updatedPerson.id))
          setNewName('')
          setNewNumber('')
          setMessage(`[ERROR] ${updatedPerson.name} was already deleted from server`)
        })
      } 
    }
    
    if (person.length === 0) {
      const nameObject = {
        name: newName,
        number: newNumber,
      }
  
      personService
        .create(nameObject)
        .then(returnedPerson => {
          console.log(returnedPerson)
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setMessage(
            `${newName} was successfully added`
          )
        }) 
        .catch(error => {
          setMessage(
            `[ERROR] ${error.response.data.error}`
          )
          console.log(error.response.data)
        })
  
    }


    // 2.15: Phonebook step7
    // adding entry to localhost:3001/persons
    // axios
    //   .post('http://localhost:3001/persons', nameObject)
    //   .then(response => {
    //     console.log(response)
    //     setPersons(persons.concat(nameObject))
    //     setNewName('')
    //     setNewNumber('')
    //   })

    // personService
    //   .create(nameObject)
    //   .then(response => {
    //     setPersons(persons.concat(response.data))
    //     setNewName('')
    //     setNewNumber('')
    //   })

    // // 2.16: Phonebook step8
    // personService
    //   .create(nameObject)
    //   .then(returnedPerson => {
    //     console.log(returnedPerson)
    //     setPersons(persons.concat(returnedPerson))
    //     setNewName('')
    //     setNewNumber('')
    //   })



    // console.log(nameObject.name, nameObject.number)

    // setPersons(persons.concat(nameObject))
    // setNewName('')
    // setNewNumber('')


    // console.log(persons.map(person => person.name).includes(newName))

    // 2.7: The Phonebook Step2
    // if (persons.map(person => person.name).includes(newName)) {
    //   // console.log(newName, 'is already added to phonebook')
    //   alert(`${newName} is already added to phonebook`)
    // } else {
    //   setPersons(persons.concat(nameObject))
    //   setNewName('')
    //   // console.log(newName, 'added to phonebook')
    //   alert(`${newName} added to phonebook`)
    // }
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
    console.log(event.target.value)
    setNewFilter(event.target.value)
    const regex = new RegExp(newFilter, 'i')
    // const filteredPersons = () => persons.filter(person => person.name.includes(newFilter))
    const filteredPersons = () => persons.filter(person => person.name.match(regex))
    setPersons(filteredPersons)
  }


  const Header = ({ text }) => <h2>{text}</h2>
  // const Name = ({ name, number }) => <p>{name} {number}</p>
  const Name = ({ name, number, toggleDelete }) => {
    return (
      <li>
        <p>{name} {number}</p><button onClick={toggleDelete}>delete</button>
      </li>
    )
  }

  const Button = () => {
    return (
      <div>
        <button type='submit'>add</button>
      </div>
    )
  }

  const NameInput = ({ value, onChange }) => {
    return (
      <div>name: <input value={value} onChange={onChange} /></div>
    )
  }

  const NumberInput = ({ value, onChange }) => {
    return (
      <div>number: <input value={value} onChange={onChange} /></div>
    )
  }

  // const Filter = ({ value, onChange }) => {
  //   return (
  //     <div>
  //       filter show with <input value={value} onChange={onChange} />
  //     </div>
  //   )
  // }

  // const PersonForm = ({ onSubmit, name, number }) => {
  //   return (
  //     <form onSubmit={onSubmit}>
  //       <NameInput value={name} onChange={handleNameChange} />
  //       <NumberInput value={number} onChange={handleNumberChange} />
  //       <Button />
  //     </form>
  //   )
  // }

  const toggleDelete = (id) => {
    // console.log('delete ' + name)
    const filteredPerson = persons.filter(person => person.id === id)
    const personName = filteredPerson[0].name
    const personId = filteredPerson[0].id

    if (window.confirm(`Delete ${personName}`)) {
      personService
        .remove(id)
      console.log(`${personName} successfully deleted`)
      setMessage(
        `${personName} was successfully deleted`
      )
      setPersons(persons.filter(person => person.id !== personId))
    }
  }

  return (
    <div>
      <Header text='Phonebook' />

      <div>filter shown with
        <input value={newFilter} onChange={handleFilterChange} />
      </div>

      <Header text='add a new' />

      <form onSubmit={addName}>
        <div>name: <input value={newName} onChange={handleNameChange} /></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
        <div><button type="submit">add</button></div>
      </form>

      <Header text='Number' />
      {persons.map(person =>
        <Name name={person.name} number={person.number} toggleDelete={() => toggleDelete(person.id)} />
      )}
    </div>
  )
}

export default App