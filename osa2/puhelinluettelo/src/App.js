import { useState, useEffect } from 'react'
import axios from 'axios'
import phonebook from './services/phonebook'
import './App.css'

const SERVER_URL = 'http://localhost:3001'

const PhonebookEntry = ({person, handleDeleteBtnClicked}) => {
  return (
    <p>{person.name}: {person.number} <button onClick={handleDeleteBtnClicked}>Delete</button></p>
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

const PersonList = ({persons, filterStr, handleDeleteBtnClicked}) => {
  const filteredPersons = 
    filterStr === "" ? 
      persons : 
      persons.filter(person => person.name.toLowerCase().includes(filterStr.toLowerCase()))
  
  return (
    <>
    {filteredPersons.map((person) => {
      return (<PhonebookEntry 
        key={person.id} 
        person={person} 
        handleDeleteBtnClicked={(event) => handleDeleteBtnClicked(event, person)}/>)
    })}
    </>
  )

}

const Notification = ({message}) => {
  console.log('render message', message)
  if (message === null) {
    console.log('no message')
    return null
  } else {
    console.log('show content!', message.text)
    return (
      <div id="notification-area" className={message.style}>{message.text}</div>
    )
  }
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [message, setMessage] = useState(null)

  useEffect(() => {
    console.log('effect')
    phonebook.getAll()
      .then(allPersons => {
        setPersons(allPersons)
      })
  }, [])
  console.log('render')
  const [searchStr, setSearchStr] = useState('')

  const showMessage = (text, style) => {
    console.log('showMessage', text, style)
    setMessage({text, style})
    setTimeout(() => {
      console.log('remove message', text, style)
      setMessage(null)
    }, 3000)
  }

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
    const matches = persons.filter(p => p.name.toLowerCase() === person.name.toLowerCase())
    console.log('matches', matches)
    if (matches.length > 0) {
      const personId = matches[0].id
      console.log('check if update', person)
      if (window.confirm(`${person.name} already exists. Do you want to update the phone number?`)) {
        phonebook.updatePerson(personId, person)
          .then(updatedPerson => {
            const newPersons = persons.map(p =>
              p.id === personId ? updatedPerson : p)
            setPersons(newPersons)
            showMessage(`Modified ${updatedPerson.name}`, "info")
          })
      }
    }
    else {
      console.log("no match, adding", person)
      phonebook.create(person)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
          showMessage(`Added ${newPerson.name}`, "info")
        })
    }
  }


  const addPersonBtnClicked = (event) => {
    event.preventDefault()
    
    addPerson({
      name: newName,
      number: newPhone
    })
    setNewName("")
    setNewPhone("")
  } 

  const deletePerson = (person) => {
    console.log("Deleting person", person)
    phonebook.deletePerson(person.id)
      .then ( () => {
        console.log('deleted from database', person)
        const newPersons = persons.filter(p => p.id !== person.id) 
        setPersons(newPersons)
        showMessage(`Deleted ${person.name}`, 'info')
        console.log('deleted from local data', newPersons)
      })
  }

  const personDeleteBtnClicked = (event, person) => {    
    event.preventDefault()
    console.log('delete btn handler', person)
    deletePerson(person)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <Filter searchStr={searchStr} handleSearchStrChange={handleSearchChange}/>
      <PersonForm name={newName} phone={newPhone} handleNameChange={handleNewNameChange} handlePhoneChange={handleNewPhoneChange} handleAddPerson={addPersonBtnClicked}/>
      <h2>Numbers</h2>
      <PersonList 
        persons={persons} 
        filterStr={searchStr}
        handleDeleteBtnClicked={personDeleteBtnClicked}/>
    </div>
  )

}

export default App