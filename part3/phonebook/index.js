const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const morgan = require('morgan')
const Person = require('./models/person')

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(express.static('build'))
app.use(express.json())
app.use(requestLogger)
app.use(cors())

app.use(morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body)
  ].join(' ')
}))

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (body.content == undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const person = new Person({
    name: String,
    number: String,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(person => {
    response.json(person)
  })
})

app.get('/info', (request, response) => {
  const currentDate = new Date().toLocaleString();
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  response.send(`
    <div>
      <p>Phonebook has info for ${persons.length} people</p
    </div>
    <div>
      <p>${currentDate} (${timeZone})
    </div>`)

})

// app.get('/api/persons/:id', (request, response) => {
//   const id = Number(request.params.id)
//   console.log(id)
//   const person = persons.find(p => p.id === id)

//   if (person) {
//     response.json(person)
//   } else {
//     response.status(404).end()
//   }
// })

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })
    .catch(error => next(error))
  // .catch(error => {
  //   console.log(error)
  //   response.status(400).send({ error: 'malformed id' })
  // })
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(p => p.id !== id)

  response.status(204).end()
})

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0
  return maxId + 1
}


// app.post('/api/persons', (request, response) => {
//   const body = request.body

//   console.log(body)
//   if (!body.name && !body.number) {
//     return response.status(400).json({ 
//       error: 'content missing' 
//     })
//   }

//   if (!body.name || !body.number) {
//     return response.status(400).json({
//       error: 'The name or number is missing '
//     })
//   }

//   // console.log(persons.filter(p => p.name === body.name))
//   // if (persons.filter(p => p.name === body.name) && persons.filter(p => p.number === body.number)) {
//   //   return response.status(400).json({
//   //     error: 'name or number must be unique'
//   //   })
//   // }

//   const person = {
//     id: generateId(),
//     name: body.name,
//     number: body.number
//   }

//   persons = persons.concat(person)

//   response.json(person)
// })

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})