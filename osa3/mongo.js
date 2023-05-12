const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://juliamalin:${password}@cluster0.qakohat.mongodb.net/phoneApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const phoneSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Phone = mongoose.model('Phonenumber', phoneSchema)

if (process.argv.length<=3){
  console.log('phonebook:')
  Phone.find({}).then(result => {
    result.forEach(phone => {
      console.log(phone.name, phone.number)
    })
    mongoose.connection.close()
  })

} else {
  const phone = new Phone({
    name: process.argv[3],
    number: process.argv[4]
  })

  phone.save().then(result => {
    console.log(`added ${phone.name} number ${phone.number} to phonebook`)
    mongoose.connection.close()
  })

}





