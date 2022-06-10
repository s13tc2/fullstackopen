const mongoose = require('mongoose')


// if (process.argv.length < 3) {
//     console.log('Please provide the password as an argument: node mongo.js <password>')
//     process.exit(1)
// } 

if (process.argv.length < 5) {
    console.log('Please provide the password as an argument: node mongo.js <password> <name> <number>')
    process.exit(1)
}

const password = process.argv[2]
const nameToAdd = process.argv[3]
const numberToAdd = process.argv[4]

const url = `mongodb+srv://fullstackopen:${password}@cluster0.zwv17.mongodb.net/phonebookApp?retryWrites=true&w=majority`

const personsSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personsSchema)


// mongoose
//   .connect(url)
//   .then((result) => {
//     console.log('connected')

//     // const person = new Person({
//     //     name: nameToAdd,
//     //     number: numberToAdd,
//     // })

//     // return person.save()

//     console.log('phonebook:')
//     Person.find({}).then(result => {
//         result.forEach(person => {
//             console.log(`${person.name} ${person.number}`)
//             mongoose.connection.close()
//         })
//   })
// })


mongoose
    .connect(url)
    .then((result) => {
        console.log('connected')

        const person = new Person({
            name: nameToAdd,
            number: numberToAdd,
        })

        return person.save()
    })
    .then(() => {
        console.log(`added ${nameToAdd} number ${numberToAdd} to phonebook`)
        return mongoose.connection.close()
    }).catch((err) => console.log(err))
    

    
