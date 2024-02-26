import mongoose from 'mongoose'
const url = 'mongodb://localhost:27017/test'

mongoose.connect(url)

const db = mongoose.connection
db.on('open', () => {console.log('Conectado a MongoDB!.')})
db.on('error', () => {console.log('Error al conectarse a MongoDB.')})

export default db