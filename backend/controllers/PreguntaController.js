import PreguntaModel from "../models/PreguntaModel.js";

export const mostrarPreguntas = async (req, res) => {
	try{
		const preguntas = await PreguntaModel.find()
		res.status(200).json({preguntas})
	} catch(error) {
		res.json({message: error.message})
	}
}

export default mostrarPreguntas