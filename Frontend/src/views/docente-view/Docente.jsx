import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from '@mui/material';
import Button from '@mui/material/Button';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import Typography from '@mui/material/Typography';


import { useAuth } from '../../components/context/AuthContext';
import { useNavigate } from 'react-router-dom';

import './Docente.css'

function Docente() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [alumnos, setAlumnos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlumnos = async () => {
      try {
        const response = await fetch(`http://localhost:4000/alumnos/docente/${user.perfilId}`);

        if (!response.ok) {
          throw new Error('Error en la petición');
        }

        const data = await response.json();
        setAlumnos(data);

      } catch (error) {
        console.error('Error al obtener los datos de los alumnos:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.perfilId) {
      fetchAlumnos();
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/');
  }

  if (!user) return null;

  const infoClase = alumnos.length > 0 ? { materia: alumnos[0].materia, grado: alumnos[0].grado } : null;

  return (
    <div className="dashboard-container">
      <header className="header-panel">
        <div className="header-content">
          <div>
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#1e293b' }}>
              Panel de Docente
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
            title={<Typography variant="h5" sx={{ fontWeight: 700, color: '#334155' }}>Alumnos Inscritos, {infoClase?.materia}, {infoClase?.grado}</Typography>}
            subheader="Consulta de los alumnos"
            sx={{ borderBottom: '1px solid #f1f5f9', padding: '24px' }}
          />
          <CardContent sx={{ padding: 0 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className="table-header-cell">Matricula</TableCell>
                  <TableCell className="table-header-cell">Alumno</TableCell>
                  <TableCell className="table-header-cell">Calificación</TableCell>
                  <TableCell className="table-header-cell">Observaciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {alumnos.map((item, index) => (
                  <TableRow key={index} className="table-row">
                    <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>{item.matricula_alumno}</TableCell>
                    <TableCell sx={{ color: '#64748b' }}>{item.nombre_alumno} {item.apellido_alumno}</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: item.calificacion < 6 ? '#d32f2f' : '#2e7d32' }}>{item.calificacion ?? 'S/C'}</TableCell>
                    <TableCell sx={{ fontStyle: 'italic', color: '#64748b' }}>{item.observaciones || 'Sin observaciones'}</TableCell>
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

export { Docente };