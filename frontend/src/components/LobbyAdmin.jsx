import PropTypes from 'prop-types'; // Importa PropTypes
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'
import { io } from 'socket.io-client'
import Juego from './Juego';

const LobbyAdmin = ({onLogout}) => {
	const [sesionCreada, setSesionCreada] = useState(false)
	const [codigoSesion, setCodigoSesion] = useState('')
	const [juegoComenzado, setJuegoComenzado] = useState(false)
	const socket = io('http://localhost:8000')

	const handleCrearSesion = () => {
		const codigo = uuidv4()
		setCodigoSesion(codigo)
		setSesionCreada(true)

		socket.emit('comenzarJuego')
	}

	const handleComenzarJuego = () => {
		socket.emit('comenzarJuego')
		setJuegoComenzado(true)
	}

	return (
		<div>
			<button onClick={handleCrearSesion}>¡Crear sesión de juego!</button>

			{
				sesionCreada && (
					<>
						<p>Codigo: {codigoSesion}</p>
						<button onClick={handleComenzarJuego}>Comenzar!!</button>
						{juegoComenzado && <Juego />}
					</>
				)
			}

			<button onClick={onLogout}>Salir</button>
		</div>
	);
}

LobbyAdmin.propTypes = {
    onLogout: PropTypes.func.isRequired,
};

export default LobbyAdmin;
