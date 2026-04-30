import { Card, CardContent, CardHeader } from '@mui/material';
import Button from '@mui/material/Button';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import Typography from '@mui/material/Typography';

import { useAuth } from '../../components/context/AuthContext';
import { useNavigate } from 'react-router-dom';

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
    <div className="min-h-screen bg-background">
      <header className="border-b shadow-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              Panel de Padre de Familia
            </Typography>

            <Typography variant="h6">
              Bienvenido, {user?.nombre}
            </Typography>
          </div>
          <Button variant="outline" onClick={handleLogout} startIcon={<LogoutIcon />}>
            Cerrar sesión
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-10">
        <Card>
          <CardHeader
            title={<Typography variant="h6" sx={{ fontWeight: 700 }}>Hijo inscrito</Typography>}
            subheader="Listado de hijos inscritos en la institución"
          />
          <CardContent>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className="w-80px">No.</TableCell>
                  <TableCell>Nombre del hijo</TableCell>
                  <TableCell>Matrícula</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {alumnosData.map((alumno) => (
                  <TableRow key={alumno.id}>
                    <TableCell className="font-medium">{alumno.id}</TableCell>
                    <TableCell className="font-medium">{alumno.nombre}</TableCell>
                    <TableCell className="font-medium">{alumno.matricula}</TableCell>
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