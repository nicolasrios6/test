import mongoose from "mongoose";

const Schema = mongoose.Schema

const usuarioSchema = new Schema({
	dni: Number,
	nombre: String,
	tipo:String
}, {collection: 'usuarios'})

export default mongoose.model('UsuarioModel', usuarioSchema)