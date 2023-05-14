import axios from "axios"

const SERVER_URL = 'http://localhost:3001'
const PERSONS_URL = `${SERVER_URL}/persons`

const getAll = () => {
    return axios
      .get(PERSONS_URL)
      .then(response => response.data)
}

const create = (person) => {
    return axios
        .post(PERSONS_URL, person)
        .then(response => response.data)
    }

const deletePerson = (id) => {
    return axios.delete(`${PERSONS_URL}/${id}`)
}

const updatePerson = (id, person) => {
    console.log('update person', id, person)
    return axios
        .put(`${PERSONS_URL}/${id}`, person)
        .then(response => response.data)
}


export default {
    getAll,
    create,
    deletePerson,
    updatePerson
}