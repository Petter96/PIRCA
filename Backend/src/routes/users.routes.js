import { Router } from 'express';
import { createUser, deleteUser, getAlumnoDocente, getAlumnoPadre, getAlumnos, getAlumnosAdmin, getUser, getUsers, loginUser, updateUser } from '../controllers/users.controllers.js';

const router = Router();

/*Obtener todos los usuarios*/
// router.get('/users', getUsers);
router.get('/users', getAlumnos);

/*Obtener los datos del hijo desde el Padre*/
router.get('/alumnos/:padreId', getAlumnoPadre);

/*Obtener los datos de los alumnos de una clase desde Docentes*/
router.get('/alumnos/docente/:docenteId', getAlumnoDocente);

/*Obtener listado de alumnos*/
router.get('/alumnos-general/admin', getAlumnosAdmin);

/*Obtener un usuario por ID*/
router.get('/users/:id', getUser);

/*Obtener los logins de los usuarios*/
router.post('/login', loginUser);

/*Crear un usuario*/
router.post('/users', createUser);

/*Elimiar un usuario por ID*/
router.delete('/users/:id', deleteUser);

/*Actualizar usuario*/
router.put('/users/:id', updateUser);

export default router;