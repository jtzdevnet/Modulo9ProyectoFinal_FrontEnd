import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { loginUserService } from '../../Services/userServices'
import { useAuthContext } from '../../Hook/useAuthContext'
import { useState } from 'react'
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./index.scss"
import logo from "../../assets/logo.png"

const Login = () => {
	const [show, setShow] = useState(false);
	const { register, handleSubmit, formState:{ errors } } = useForm();
	const navigate = useNavigate()
	const { login } = useAuthContext()

	const onSubmit = async (data) =>  {
		//enviar mi formulario de signup
		try {
			const response = await loginUserService(data)
			if (response.status === 200){
				navigate('/')
				console.log('Usuario autenticado exitosamente')
				console.log(response.data)
				login(response.data.token) // utilizar login del contexto y decodificar el token en el navegador
			}
		}catch(error) {
			setShow(true)
			console.log(data);
			console.log('Ocurrio un error en Login', error)
		}
	}

	return (
		<div className='page-wrapper login-page'>
			<div className="container">
				<div className="logo-wrap">
					<img src={logo} alt="" />
				</div>
				<h1>Login</h1>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div>
						<label htmlFor="input-email">Email</label>
						<input name="email" id="input-email" type="text" {...register('email')} />
						
					</div>
					<div>
						<label htmlFor="input-password">Password</label>
						<input name="password" id="input-password" type="password" {...register('password')} />
						
					</div>
					<div>
						<Button variant="primary" type="submit">Login</Button>
					</div>
					<div>
						<Alert onLoad={() => setShow(false)} show={show}  variant="danger">Las credenciales son incorrectas. Intente de nuevo.</Alert>
					</div>
				</form>
			</div>
		</div>
	)
}

export default Login