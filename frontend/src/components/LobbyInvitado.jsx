import PropTypes from 'prop-types'; // Importa PropTypes
import { useEffect, useState } from 'react';
import axios from 'axios'
import { io } from 'socket.io-client';
import Juego from './Juego';


const LobbyInvitado = ({onLogout}) => {
	const [codigoSesion, setCodigoSesion] = useState('')
	const [mensaje, setMensaje] = useState('')
	const [esperando, setEsperando] = useState(false); // Nuevo estado para controlar si se está esperando que el juego comience
	const[jugando, setJugando] = useState(false)
	
	const socket = io('https://test-zeta-one-18.vercel.app/')

	const handleSubmit = async (e) => {
		e.preventDefault()

		try{
			const response = await axios.post('unirse-sesion', {codigoSesion})
			
			if(response.status === 200) {
				setMensaje(response.data.message)
				setEsperando(true) // Si el usuario se une correctamente, activa el estado de esperando
			} else {
				setMensaje(response.data.message)
			}
		} catch (error){
			console.error('Error: ', error)
		}
	}

	useEffect(() => {
		socket.on('juegoComenzado', () => {
			setMensaje('¡Comenzó el juego!')
			setJugando(true)
		})
		return () => {
			socket.off('juegoComenzado')
		}
	}, [socket])

	return (
		<div>
			<h3>Ingrese el código:</h3>
			<form onSubmit={handleSubmit}>
				<input
					type="text" 
					placeholder="Código de sesión"
					value={codigoSesion}
					onChange={(e) => setCodigoSesion(e.target.value)}
				/>
				<button type='submit'>Unirse a la sesión</button>
			</form>

			{mensaje && <p>{mensaje}</p>}

			{esperando && <p>Esperando que el administrador comience el juego ...</p>}

			{jugando && <Juego />}

			<button onClick={onLogout}>Salir</button>

		</div>
	);
}

LobbyInvitado.propTypes = {
    onLogout: PropTypes.func.isRequired,
};
export default LobbyInvitado;
