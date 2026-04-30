import { Card, CardContent, CardHeader } from '@mui/material';
import Button from '@mui/material/Button';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import Typography from '@mui/material/Typography';

import { useAuth } from '../../components/context/AuthContext';
import { useNavigate } from 'react-router-dom';

import './Padre.css'

const alumnosData = [
  { id: 9, nombre: 'Patricia Morales Vega', grupo: '2A', matricula: 'MVIU009' },
];

function Padre() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

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
              Panel de Padre de Familia
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
            title={<Typography variant="h5" sx={{ fontWeight: 700, color: '#334155' }}>Hijos Inscritos</Typography>}
            subheader="Consulta el listado y matrículas de tus hijos"
            sx={{ borderBottom: '1px solid #f1f5f9', padding: '24px' }}
          />
          <CardContent sx={{ padding: 0 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className="table-header-cell">No.</TableCell>
                  <TableCell className="table-header-cell">Nombre del hijo</TableCell>
                  <TableCell className="table-header-cell">Matrícula</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {alumnosData.map((alumno) => (
                  <TableRow key={alumno.id} className="table-row">
                    <TableCell sx={{ color: '#64748b' }}>{alumno.id}</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>{alumno.nombre}</TableCell>
                    <TableCell>
                        <span className="matricula-badge">{alumno.matricula}</span>
                    </TableCell>
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

export { Padre };