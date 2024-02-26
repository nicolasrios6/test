import mongoose from "mongoose";

const Schema = mongoose.Schema

const sesionSchema = new Schema({
	codigo: {type: String, required: true, unique: true}
})

export default mongoose.model('SesionModel', sesionSchema)