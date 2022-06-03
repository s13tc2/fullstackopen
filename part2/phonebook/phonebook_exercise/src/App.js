import { useState, useEffect } from 'react'
import axios from 'axios'
// import Filter from './components/Filter'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'notes')


  const addName = (event) => {
    event.preventDefault()
    // console.log('button clicked', event.target)
    const nameObject = {
      name: newName, 
      number: newNumber
    }
    // console.log(nameObject.name, nameObject.number)
    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')

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
  const Name = ({ name, number }) => <p>{name} {number}</p>
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

  const Filter = ({ value, onChange }) => {
      return (
        <div>
          filter show with <input value={value} onChange={onChange}/>
        </div>
      )
  }


  const PersonForm = ({ onSubmit, name, number }) => {
    return (
      <form onSubmit={onSubmit}>
        <NameInput value={name} onChange={handleNameChange} />
        <NumberInput value={number} onChange={handleNumberChange} />
        <Button />
      </form>
    )
  }



  return (
    <div>
      <Header text='Phonebook' />
      <div>filter shown with 
        <input value={newFilter} onChange={handleFilterChange}/>
      </div>
      {/* <Filter value={newFilter} onChange={handleFilterChange}/> */}
      <Header text='add a new' />
      <form onSubmit={addName}>
        <div>name: <input value={newName} onChange={handleNameChange}/></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div><button type="submit">add</button></div>
      </form>
      {/* <PersonForm onSubmit={addName} /> */}
      <Header text='Number' />

      {persons.map(person => 
        <Name name={person.name} number={person.number}/>
      )}
      
    </div>
  )
}

export default App