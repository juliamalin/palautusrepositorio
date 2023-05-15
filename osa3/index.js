
//web-palvelimen määrittelemä moduuli otetaan käyttöön

const express = require ('express')
const app = express()
const cors = require('cors')
require('dotenv').config()


const Number = require('./models/number')

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
  }

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({error: error.message})
    }

    next(error)
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  

const generateId = () => {
    const randomId = Math.floor(Math.random()*100)
    return randomId
}

app.use(cors())
app.use(express.json())
app.use(requestLogger)
app.use(express.static('build'))


app.get('/api/numbers', (req, res) => {
    Number.find({}).then(numbers => {
        res.json(numbers)
    })
    .catch(error => {
    console.log(error)
    res.status(500).send('Error retrieving phone numbers')
    })
  })

  app.post('/api/numbers', (request, response, next) => {
    const body = request.body
    console.log('request body:', request.body)


    if(!body.name || !body.number) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const number = new Number({
        name: body.name,
        number: body.number,
        id: generateId(),
      })

    console.log(number.id)
    /*if(numbers.some(p=> p.name===person.name)){
        return response.status(400).json({
            error: 'name is already added'
        })
    }*/
    number.save().then(savedNumber => {
        response.json(savedNumber)
    })
    .catch(error => next(error))
})

app.put('/api/numbers/:id',(request, response, next)=> {
    const {name, number} = request.body

    /*const number = {
        name: body.name,
        number: body.number,
    }*/

    Number.findByIdAndUpdate(
        request.params.id, 
        {name, number}, 
        {new: true, runValidators: true, context:'query'}
        )
    .then(updatedNumber => {
        response.json(updatedNumber)
    })
    .catch(error => next(error))
})


app.get('/api/numbers/:id',(request, response, next)=>{
    Number.findById(request.params.id)
    .then(number => {
        if(number){
        response.json(number)
        } else {
        response.status(404).end()
        }
    })
    .catch(error => next(error))

})

app.delete('/api/numbers/:id', (request, response, next) => {
    Number.findByIdAndRemove(request.params.id)
    .then(result => {
        response.status(204).end()
    })
    .catch(error => next(error))
})


app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

//luo web-palvelimen jolle rekisteröidään tapahtumakäsittelijä
//suoritetaan jokaisen local-host-osoitteelle tulevan HTTP-pyynnön yhteydessä
//sitovat palvelimen kuuntelemaan porttiin 3001 tulevia HTTP-pyyntöjä  
