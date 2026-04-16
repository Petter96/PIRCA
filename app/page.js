'use client';

import { FaUser, FaLock } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import "./Login.css";

const MOCK_USERS = [
  { id: 1, username: 'admin',  password: '1234',   role: 'admin'   },
  { id: 2, username: 'pedro',  password: 'abc123',  role: 'parent' },
  { id: 3, username: 'maria',  password: 'pass456', role: 'teacher', subject: 'Matemáticas' },
];

export default function Home() {
  const router = useRouter();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const form = e.currentTarget;
    const identifier = form.identifier.value.trim();
    const password = form.password.value.trim();

    const userFound = MOCK_USERS.find(
      (u) => u.username === identifier && u.password === password
    );

    if (userFound) {
      sessionStorage.setItem('currentUser', JSON.stringify(userFound));

      const routes = {
        admin: '/views/administrativo-view',
        parent: '/views/padre-view',
        teacher: '/views/docente-view',
      };

      router.push(routes[userFound.role] || '/dashboard');

    } else {
      setError('Usuario o contraseña incorrectos');
      setLoading(false);
    }
  };

  return (
    <div className='background'>
      <div className='wrapper'>
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className='input-box'>
            <input type='text' placeholder='Username' name="identifier" id='user'  />
            <FaUser className='icon' />
          </div>
          <div className='input-box'>
            <input type='text' placeholder='Password' name="password" id='pass'  />
            <FaLock className="icon" />
          </div>

          {error && <p style={{ color: 'red', fontSize: '0.85rem', marginBottom: '10px' }}>{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <div className="register-link">
            <p>Don't have an account?<a href="#">Register</a></p>
          </div>
        </form>
      </div>
    </div>
  );
}
