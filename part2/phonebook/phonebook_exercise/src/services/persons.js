import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

// useEffect(() => {
//     console.log('effect')
//     axios
//         .get('http://localhost:3001/persons')
//         .then(response => {
//             console.log('promise fulfilled')
//             setPersons(response.data)
//         })
// }, [])
// console.log('render', persons.length, 'notes')

// const getAll = () => {
//     return axios.get(baseUrl)
// }

// const create = newObject => {
//     return axios.post(baseUrl, newObject)
// }

// const update = (id, newObject) => {
//     return axios.put(`${baseUrl}/${id}`, newObject)
// }

// export default {
//     getAll: getAll,
//     create: create,
//     update: update
// }

// 2.16: Phonebook step8
const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

export default {
    getAll: getAll,
    create: create,
    update: update,
    remove: remove,
}