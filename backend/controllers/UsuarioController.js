import UsuarioModel from "../models/UsuarioModel.js";


export const mostrarTodosUsuarios = async (req, res) => {
	try{
		const usuarios = await UsuarioModel.find()
		res.status(200).json(usuarios)
	} catch (error) {
		res.json({message: error.message})
	}
}

export const mostrarUsuarioPorDNI = async (req, res) => {
	const {dni} = req.params
	try{
		const usuario = await UsuarioModel.findOne({dni:dni})
		if(!usuario) {
			return res.status(400).json({message: "Usuario no encontrado."})
		}
		res.status(200).json(usuario)
	} catch(error) {
		res.status(500).json({message: error.message})
	}
}

export default {mostrarTodosUsuarios, mostrarUsuarioPorDNI}