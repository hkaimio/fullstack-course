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

export default {
    getAll,
    create,
    deletePerson
}