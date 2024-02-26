import mongoose from "mongoose";

const Schema = mongoose.Schema

const preguntaSchema = new Schema({
	texto: String,
	opciones: [String],
	respuestaCorrecta: String
}, {collection: 'preguntas'})

export default mongoose.model('PreguntaModel', preguntaSchema)