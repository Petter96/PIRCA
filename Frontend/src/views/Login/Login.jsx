import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
import { useAuth } from './AuthContext';
import '../Login/Login.css';

function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [credentials, setCredentials] = useState({
        id_usuario: '',
        contrasena: ''
    });

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:4000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });

        const data = await res.json();

        if (res.ok) {
            login(data.user, data.token); // Guardamos en el Contexto

            // Redirección por Rol
            switch (data.user.rol) {
                case 'Administrativo':
                    navigate('/administrativo');
                    break;
                case 'Docente':
                    navigate('/docente');
                    break;
                case 'Padre':
                    navigate('/padre');
                    break;
                default:
                    navigate('/');
            }
        }
    };

    return (
        <div className='background'>
            <div className='wrapper'>
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>

                    <div className='input-box'>
                        <input type='text' placeholder='Username' name="id_usuario" id='user' onChange={handleChange} />
                        <FaUser className='icon' />
                    </div>

                    <div className='input-box'>
                        <input type='password' placeholder='Password' name="contrasena" id='pass' onChange={handleChange} />
                        <FaLock className="icon" />
                    </div>

                    {/* {error &&
                        <p style={{ color: 'red', fontSize: '0.85rem', marginBottom: '10px' }}>
                            {error}
                        </p>} */}

                    <button type='submit'>
                        Login uwu
                    </button>

                    <div className="register-link">
                        <p>Don't have an account?<a href="#">Register</a></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export { Login };