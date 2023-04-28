
//web-palvelimen määrittelemä moduuli otetaan käyttöön
const express = require ('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

//json-parser!
//POST-pyynnön mukana tulee json-muotoista dataa-> 
//muuttaa json-muotoisen datan js-olioksi
//sijoitetaan request-olion kenttään body

let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
      },
      {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
      },
      {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
      },
      {
        "name": "Mary Poppendieck",
        "number": "39-23-1111111111",
        "id": 4
      }
]

app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())

app.get('/', function (req, res, next) {
    res.send(persons)
    console.log(req.url)
    console.log(req.method)
    next()

  })


app.get('/api/persons', (req, res) => {
   
    res.json(persons)
})

app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${persons.length} people</p> <p>${Date()}<p/>`);
})

app.get('/api/persons/:id',(request, response)=>{
    const id = Number(request.params.id)
    console.log(id)
    const person = persons.find(person => person.id===id)
    console.log(person)
    
    if(person) {
        response.json(person)
    } else {
        response.status(400).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

const generateId = () => {
    const randomId = Math.floor(Math.random()*100)
    return randomId
}

app.post('/api/persons', (request, response) => {

    const body = request.body

    if(!body.name) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    if(!body.number) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }

    if(persons.some(p=> p.name===person.name)){
        return response.status(400).json({
            error: 'name is already added'
        })
    }


    persons = persons.concat(person)
    //console.log(person)
    response.json(person)
})

const requestLogger = (request, response, next) => {

}

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

//luo web-palvelimen jolle rekisteröidään tapahtumakäsittelijä
//suoritetaan jokaisen local-host-osoitteelle tulevan HTTP-pyynnön yhteydessä
/*const app = http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify(persons))
  })*/

//sitovat palvelimen kuuntelemaan porttiin 3001 tulevia HTTP-pyyntöjä  
