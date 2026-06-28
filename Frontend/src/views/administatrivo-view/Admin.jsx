import { useEffect, useState, useRef } from 'react';
import { Card, CardContent, CardHeader, TextField, InputAdornment } from '@mui/material';
import Button from '@mui/material/Button';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';

import { Loader } from '../../components/Loader/Loader';

import { useAuth } from '../../components/context/AuthContext';
import { useNavigate } from 'react-router-dom';

import './Admin.css'

function Admin() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [alumnos, setAlumnos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  
  const inputSearchRef = useRef(null);

  useEffect(() => {
    const fetchAlumnosGeneral = async () => {
      const startTime = Date.now();

      try {
        const apiURL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
        const response = await fetch(`${apiURL}/alumnos-general/admin`);

        if (!response.ok) {
          throw new Error('Error en la petición');
        }
        const data = await response.json();
        setAlumnos(data);

      } catch (error) {
        console.error('Error al obtener el listado de alumnos', error);
      } finally {
        const endTime = Date.now();
        const duration = endTime - startTime;
        const minimumTime = 2000;

        if (duration < minimumTime) {
          setTimeout(() => {
            setLoading(false);
          }, minimumTime - duration);
        } else {
          setLoading(false);
        }
      }
    };

    fetchAlumnosGeneral();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  }

  const alumnosFiltrados = alumnos.filter((item) => {
    const busqueda = searchTerm.toLowerCase();

    const nombreCompleto = `${item?.nombre || ' '} ${item?.apellido || ''}`.toLowerCase();
    const matricula = (item?.matricula || '').toString().toLowerCase();
    const grado = `${item?.grado || ''} ${item?.grupo || ''}`.toLowerCase();
    return (
      nombreCompleto.includes(busqueda) ||
      matricula.includes(busqueda) ||
      grado.includes(busqueda)
    );
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'e') {
        e.preventDefault(); 
        e.stopPropagation();
        
        if (inputSearchRef.current) {
          inputSearchRef.current.focus(); 
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (!user) return null;

  if (loading) {
    return <Loader />;
  }

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
          <Button variant="outlined" color="error" className="logout-button" onClick={handleLogout} startIcon={<LogoutIcon />} title="Cerrar sesión">
            Cerrar sesión
          </Button>
        </div>
      </header>

      <main className="main-content">
        <div className="search-container">
          <TextField variant="outlined" size="small" placeholder="Buscar alumno..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} inputRef={inputSearchRef} InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>) }} />
        </div>

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
                {/* /* 3. MAPEAR EL ARRAY FILTRADO */ }
                {alumnosFiltrados.length > 0 ? (
                  alumnosFiltrados.map((item) => (
                    <TableRow key={item.matricula} className="table-row">
                      <TableCell>
                        <span className="matricula-badge">{item.matricula}</span>
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>{item?.nombre} {item?.apellido}</TableCell>
                      <TableCell sx={{ color: '#64748b' }}>{item?.grado} {item?.grupo}</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: item.calificacion_general < 6 ? '#d32f2f' : '#2e7d32' }}>
                        {item.calificacion_general ?? 'S/C'}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  // Mensaje amigable por si la búsqueda no arroja resultados
                  <TableRow>
                    <TableCell colSpan={4} align="center" sx={{ py: 4, color: '#64748b' }}>
                      No se encontraron alumnos que coincidan con "{searchTerm}"
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

export { Admin };