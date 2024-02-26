import express from "express";
import { mostrarTodosUsuarios, mostrarUsuarioPorDNI } from "../controllers/UsuarioController.js";
import crearSesion from "../controllers/SesionController.js";
import unirseASesion from "../controllers/UnirseASesionController.js";
import mostrarPreguntas from "../controllers/PreguntaController.js";
const router = express.Router()

router.get('/', mostrarTodosUsuarios)
router.get('/:dni', mostrarUsuarioPorDNI)
router.post('crear-sesion', crearSesion)
router.post('/unirse-sesion', unirseASesion)
router.get('/preguntas', mostrarPreguntas)

export default router