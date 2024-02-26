import express from 'express'
import cors from 'cors'
// Importamos socket.io
import { Server } from 'socket.io'
// Importamos nuestro enrutador
import usuariosRoutes from './routes/routes.js'

import mongoose from 'mongoose'
const url = 'mongodb://localhost:27017/test'

mongoose.connect(url)

const db = mongoose.connection
db.on('open', () => {console.log('Conectado a MongoDB!.')})
db.on('error', () => {console.log('Error al conectarse a MongoDB.')})

const app = express()
const PORT = 8000


app.use(cors())

app.use(cors({
	origin: 'https://test-zeta-one-18.vercel.app/', // Cambia esto con la URL de tu frontend
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
	allowedHeaders: ['Content-Type', 'Authorization'],
  }));

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/usuarios', usuariosRoutes)


// app.get('/', (req, res) => {
	// 	res.send("Holaaaa")
	// })
	
	const server = app.listen(PORT, () => {
		console.log("Server escuchando en puerto: "+ PORT)
	})
const io = new Server(server)

io.on('connection', (socket) => {
	console.log('Nuevo cliente conectado')

	socket.on('comenzarJuego', () => {
		io.emit('juegoComenzado')
	})
})

/* Se crea una instancia de Server de Socket.IO pasando el servidor Express (app) como argumento.
Se maneja el evento de conexión (connection) para establecer una conexión con los clientes.
Cuando el evento comenzarJuego es emitido por un cliente, el servidor emite el evento juegoComenzado a todos los clientes conectados. */



