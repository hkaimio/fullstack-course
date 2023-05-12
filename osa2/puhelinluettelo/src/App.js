import { useState } from 'react'

const PhonebookEntry = ({person}) => {
  return (
    <p>{person.name}: {person.phone}</p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }  ]) 

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
      <p>search: <input value={searchStr} onChange={handleSearchChange}/></p>
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
        {filteredPersons.map((person) => {
          return (<PhonebookEntry key={person.name} person={person} />)
        })}
    </div>
  )

}

export default App