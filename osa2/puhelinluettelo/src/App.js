import { useState, useEffect } from 'react'
import axios from 'axios'

const PhonebookEntry = ({person}) => {
  return (
    <p>{person.name}: {person.number}</p>
  )
}

const Filter = ({searchStr, handleSearchStrChange}) => {
  return (
    <p>search: <input value={searchStr} onChange={handleSearchStrChange}/></p>
  )
}

const PersonForm = ({name, phone, handleNameChange, handlePhoneChange, handleAddPerson}) => {
  return (
    <form>
    <div>
        name: <input value={name} onChange={handleNameChange}/>
      </div>
      <div>
        phone: <input value={phone} onChange={handlePhoneChange}/>
      </div>
      <div>
        <button type="submit" onClick={handleAddPerson}>add</button>
      </div>
    </form>
  )  
}

const PersonList = ({persons, filterStr}) => {
  const filteredPersons = 
    filterStr === "" ? 
      persons : 
      persons.filter(person => person.name.toLowerCase().includes(filterStr.toLowerCase()))
  
  return (
    <>
    {filteredPersons.map((person) => {
      return (<PhonebookEntry key={person.name} person={person} />)
    })}
    </>
  )

}

const App = () => {
  const [persons, setPersons] = useState([]) 

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/db')
      .then(resp => {
        console.log('promise fulfilled', resp.data)
        setPersons(resp.data.persons)
      })
  }, [])
  console.log('render')
  const [searchStr, setSearchStr] = useState('')

  const handleSearchChange = (event) => {
    setSearchStr(event.target.value)
  }


  const [newName, setNewName] = useState('')

  const handleNewNameChange = (event) => {
    setNewName(event.target.value)
  }

  const [newPhone, setNewPhone] = useState('')

  const handleNewPhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  const addPerson = (person) => {
    console.log("Adding person ", person)
    // Check if person exists
    if (persons.some( p => p.name.toLowerCase() === person.name.toLowerCase()))
    {
      alert(`${person.name} already exists in the phonebook`)
    }
    else
    {
      setPersons(persons.concat(person))
    }
  }

  const addPersonBtnClicked = (event) => {
    event.preventDefault()
    addPerson({
      name: newName,
      phone: newPhone
    })
    setNewName("")
    setNewPhone("")
  } 

  const filteredPersons = 
    searchStr === "" ? 
      persons : 
      persons.filter(person => person.name.toLowerCase().includes(searchStr.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchStr={searchStr} handleSearchStrChange={handleSearchChange}/>
      <PersonForm name={newName} phone={newPhone} handleNameChange={handleNewNameChange} handlePhoneChange={handleNewPhoneChange} handleAddPerson={addPersonBtnClicked}/>
      <h2>Numbers</h2>
      <PersonList persons={persons} filterStr={searchStr}/>
    </div>
  )

}

export default App