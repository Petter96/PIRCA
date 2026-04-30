import { Router } from 'express';
import { createUser, deleteUser, getAlumnoPadre, getAlumnos, getUser, getUsers, loginUser, updateUser } from '../controllers/users.controllers.js';

const router = Router();

/*Obtener todos los usuarios*/
// router.get('/users', getUsers);
router.get('/users', getAlumnos);

/*Obtener los datos del hijo desde el Padre*/
router.get('/alumnos/:padreId', getAlumnoPadre);

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