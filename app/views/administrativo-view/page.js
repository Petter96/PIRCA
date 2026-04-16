'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader } from '@mui/material';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import Typography from '@mui/material/Typography';

const alumnosData = [
  { id: 1, nombre: 'Juan Pérez González', grupo: '1A', matricula:'MVIU004' },
  { id: 2, nombre: 'María García López', grupo: '1A', matricula:'MVIU002' },
  { id: 3, nombre: 'Carlos López Hernández', grupo: '1B', matricula:'MVIU003' },
  { id: 4, nombre: 'Ana Martínez Ruiz', grupo: '2A', matricula:'MVIU090' },
  { id: 5, nombre: 'Pedro Sánchez Torres', grupo: '2A', matricula:'MVIU005' },
  { id: 6, nombre: 'Laura Rodríguez Díaz', grupo: '2B', matricula:'MVIU006' },
  { id: 7, nombre: 'Miguel Fernández Castro', grupo: '3A', matricula:'MVIU007' },
  { id: 8, nombre: 'Sofía Ramírez Morales', grupo: '3B', matricula:'MVIU008' },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('currentUser');
    if (!stored) {
      router.push('/');
      return;
    }
    const parsed = JSON.parse(stored);
    if (parsed.role !== 'admin') {
      router.push('/');
      return;
    }
    setUser(parsed);
  }, []);

  if (!user) return <p>Cargando...</p>;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b shadow-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              Panel Administrativo
            </Typography>

            <Typography variant="h6">
              Bienvenido, <span className="font-medium">{user?.username}</span>
            </Typography>
          </div>
          <Button variant="outline" onClick={() => { sessionStorage.clear(); router.push('/'); }} startIcon={<LogoutIcon />}>
            Cerrar sesión
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <Card>
          <CardHeader
            title={<Typography variant="h6" sx={{ fontWeight: 700 }}>Lista de Alumnos</Typography>}
            subheader="Registro de alumnos con su grupo asignado."
          />
          <CardContent>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className="w-80px">No.</TableCell>
                  <TableCell>Nombre del Alumno</TableCell>
                  <TableCell>Matrícula</TableCell>
                  <TableCell>Grupo</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {alumnosData.map((alumno) => (
                  <TableRow key={alumno.id}>
                    <TableCell className="font-medium">{alumno.id}</TableCell>
                    <TableCell className="font-medium">{alumno.nombre}</TableCell>
                    <TableCell className="font-medium">{alumno.matricula}</TableCell>
                    <TableCell>
                      <Badge>{alumno.grupo}</Badge>
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