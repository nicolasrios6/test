import axios from 'axios'
import { useState} from 'react';
import LobbyAdmin from './LobbyAdmin';
import LobbyInvitado from './LobbyInvitado';

const Login = () => {

	const [dni, setDni] = useState('')
	const [tipoUsuario, setTipoUsuario] = useState(null)
	const [error, setError] = useState(null)

	const handleInputChange = (e) => {
		setDni(e.target.value)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try{
			const response = await axios.get(`https://test-zeta-one-18.vercel.app/usuarios/${dni}`)
			const usuario = response.data

			if(usuario.tipo === 'admin') {
				setTipoUsuario('admin')
			} else if(usuario.tipo === 'invitado') {
				setTipoUsuario('invitado')
			} else {
				setError('Tipo de usuario desconocido.')
			}
		} catch (error) {
			setError(error.response.data.message)
		}
	}

	if (tipoUsuario === 'admin') {
		return <LobbyAdmin onLogout={() => setTipoUsuario(null)} />
	} else if (tipoUsuario === 'invitado') {
		return <LobbyInvitado onLogout={() => setTipoUsuario(null)} />
	}


	return (
		<div>
			<h2>Inicie Sesión</h2>
			<form onSubmit={handleSubmit}>
				<label>
					Ingrese su DNI:
					<input type="text" value={dni} onChange={handleInputChange} />
				</label>
				<button type='submit'>Iniciar Sesión</button>
			</form>

			{error && (
				<p>Error: {error}</p>
			)}
		</div>
	);
}

export default Login;
