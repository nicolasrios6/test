import SesionModel from "../models/SesionModel.js";
import { v4 as uuidv4} from 'uuid'

export const crearSesion = async (req, res) => {
	try{
		const codigoSesion = generarCodigoUnico()

		const nuevaSesion = new SesionModel({codigo:codigoSesion})

		await nuevaSesion.save()

		res.status(201).json({codigo: codigoSesion})
	} catch(error) {
		res.status(500).json({message: error.message})
	}
}

const generarCodigoUnico = () => {
	const codigoUnico = uuidv4()
	return codigoUnico
}

export default crearSesion