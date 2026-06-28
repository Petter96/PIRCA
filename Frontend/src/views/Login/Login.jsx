import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../../components/context/AuthContext';
import '../Login/Login.css';

function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [credentials, setCredentials] = useState({
        id_usuario: '',
        contrasena: ''
    });

    // 1. Estado para el error
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const apiURL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!credentials.id_usuario.trim() || !credentials.contrasena.trim()){
            setError('Introduce tanto el usuario como la contraseña');
            return;
        }

        try {
            const res = await fetch(`${apiURL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials)
            });

            const data = await res.json();

            if (res.ok) {
                login(data.user, data.token);

                switch (data.user.rol) {
                    case 'Administrativo': navigate('/administrativo'); break;
                    case 'Docente': navigate('/docente'); break;
                    case 'Padre': navigate('/padre'); break;
                    default: navigate('/');
                }
            } else {
                setError('Usuario o contraseña incorrectos.');
            }
        } catch (err) {
            setError('No se pudo conectar al servidor. Intenta más tarde.');
        }
    };

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    return (
        <div className='background'>
            <div className='wrapper'>
                <form onSubmit={handleSubmit}>
                    <h1>Inicio de sesión</h1>

                    <div className='input-box'>
                        <input type='text' placeholder='Nombre de usuario' name="id_usuario" id='user' onChange={handleChange} />
                        <FaUser className='icon' />
                    </div>

                    <div className='input-box'>
                        <input type={showPassword ? 'text' : 'password'} placeholder='Constraseña' name="contrasena" id='pass' onChange={handleChange} />
                        <div className='icons-container'>
                            <button type="button" className="toggle-btn" onClick={togglePasswordVisibility} title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    {error && <p className="error-msg">{error}</p>}

                    <button type='submit' title="Iniciar sesión">
                        Iniciar sesión
                    </button>
                </form>
            </div>
        </div>
    )
}

export { Login };