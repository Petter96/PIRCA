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
  { id: 4, nombre: 'Ana Martínez Ruiz', grupo: '2A', matricula: 'MVIU003' },
  { id: 5, nombre: 'Pedro Sánchez Torres', grupo: '2A', matricula: 'MVIU005' },
  { id: 8, nombre: 'Jorge Ramírez Castillo', grupo: '2A', matricula: 'MVIU008' },
  { id: 9, nombre: 'Patricia Morales Vega', grupo: '2A', matricula: 'MVIU009' },
  { id: 10, nombre: 'Ricardo Torres Mendoza', grupo: '2A', matricula: 'MVIU010' },
  { id: 11, nombre: 'Elena Castro Navarro', grupo: '2A', matricula: 'MVIU011' },
  { id: 12, nombre: 'Fernando Ruiz Ortega', grupo: '2A', matricula: 'MVIU012' },
  { id: 13, nombre: 'Gabriela Sánchez Cruz', grupo: '2A', matricula: 'MVIU013' },
  { id: 14, nombre: 'Diego López Salazar', grupo: '2A', matricula: 'MVIU014' },
  { id: 15, nombre: 'Valeria Jiménez Paredes', grupo: '2A', matricula: 'MVIU015' },
];

export default function TeacherDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('currentUser');
    if (!stored) {
      router.push('/');
      return;
    }
    const parsed = JSON.parse(stored);
    if (parsed.role !== 'teacher') {
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
              Panel Docente
            </Typography>

            <Typography variant="h6">
              Bienvenido, <span className="font-medium">{user?.username}</span> — Materia: <span className="font-medium">{user?.subject}</span>
            </Typography>
          </div>
          <Button variant="outline" onClick={() => { sessionStorage.clear(); router.push('/'); }} startIcon={<LogoutIcon />}>
            Cerrar sesión
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-10">
        <Card>
          <CardHeader
            title={<Typography variant="h6" sx={{ fontWeight: 700 }}>Lista de Alumnos</Typography>}
            subheader="Listado de alumnos de la materia asignada."
          />
          <CardContent>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className="w-80px">No.</TableCell>
                  <TableCell>Nombre del Alumno</TableCell>
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