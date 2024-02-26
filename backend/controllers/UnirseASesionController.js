import SesionModel from "../models/SesionModel.js";

export const unirseASesion = async (req, res) => {
	const {codigoSesion} = req.body

	try{
		const sesion = await SesionModel.findOne({codigo: codigoSesion})

		if(!sesion) {
			return res.status(404).json({message : 'Codigo de sesion no encontrado.'})
		}

		// Verifico que el codigo de sesion coincide con el codigo de la sesion creada por el admin.
		if(sesion.codigo === codigoSesion) {
			return res.status(200).json({message: 'Usuario unido a la sesion.'})
		} else {
			return res.status(401).json({message: 'Codigo se sesion incorrecto.'})
		}

	} catch(error) {
		res.status(500).json({message: error.message})
	}
}

export default unirseASesion