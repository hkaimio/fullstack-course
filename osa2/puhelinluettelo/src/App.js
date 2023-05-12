import { useState } from 'react'

const PhonebookEntry = ({person}) => {
  return (
    <p>{person.name}: {person.phone}</p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
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

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
      <div>
          name: <input value={newName} onChange={handleNewNameChange}/>
        </div>
        <div>
          phone: <input value={newPhone} onChange={handleNewPhoneChange}/>
        </div>
        <div>
          <button type="submit" onClick={addPersonBtnClicked}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {persons.map((person) => {
          return (<PhonebookEntry key={person.name} person={person} />)
        })}
    </div>
  )

}

export default App