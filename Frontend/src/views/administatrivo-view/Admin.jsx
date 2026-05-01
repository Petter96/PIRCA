import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from '@mui/material';
import Button from '@mui/material/Button';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import Typography from '@mui/material/Typography';

import { useAuth } from '../../components/context/AuthContext';
import { useNavigate } from 'react-router-dom';

import './Admin.css'

function Admin() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [alumnos, setAlumnos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlumnosGeneral = async () => {
      try {
        const response = await fetch('http://localhost:4000/alumnos-general/admin');

        if (!response.ok) {
          throw new Error('Error en la petición');
        }
        const data = await response.json();
        setAlumnos(data);
      } catch (error) {
        console.error('Error al obtener el listado de alumnos', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlumnosGeneral();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  }

  if (!user) return null;

  return (
    <div className="dashboard-container">
      <header className="header-panel">
        <div className="header-content">
          <div>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#1e293b' }}>
              Panel del Personal Administrativo
            </Typography>

            <Typography variant="body1" className="welcome-text">
              Bienvenido, {user?.nombre}
            </Typography>
          </div>
          <Button variant="outlined" color="error" className="logout-button" onClick={handleLogout} startIcon={<LogoutIcon />}>
            Cerrar sesión
          </Button>
        </div>
      </header>

      <main className="main-content">
        <Card className="custom-card">
          <CardHeader
            title={<Typography variant="h5" sx={{ fontWeight: 700, color: '#334155' }}>Listado de alumnos</Typography>}
            subheader="Consulta del listado de alumnos"
            sx={{ borderBottom: '1px solid #f1f5f9', padding: '24px' }}
          />
          <CardContent sx={{ padding: 0 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className="table-header-cell">Matrícula</TableCell>
                  <TableCell className="table-header-cell">Nombre del Alumno</TableCell>
                  <TableCell className="table-header-cell">Grado y Grupo</TableCell>
                  <TableCell className="table-header-cell">Calificación General</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {alumnos.map((item) => (
                  <TableRow key={item.matricula} className="table-row">
                    <TableCell>
                      <span className="matricula-badge">{item.matricula}</span>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>{item?.nombre} {item?.apellido}</TableCell>
                    <TableCell sx={{ color: '#64748b' }}>{item?.grado} {item?.grupo}</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: item.calificacion_general < 6 ? '#d32f2f' : '#2e7d32' }}>{item.calificacion_general ?? 'S/C'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

export { Admin };