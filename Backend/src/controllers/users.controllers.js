import { pool } from '../db.js';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';

// getUsers
export const getUsers = async (req, res) => {
    const { rows } = await pool.query('SELECT * FROM users');
    res.json(rows);
};

export const getDocentes = async (req, res) => {
    const { rows } = await pool.query('SELECT * FROM docentes');
    res.json(rows);
};

export const getAlumnos = async (req, res) => {
    const { rows } = await pool.query('SELECT * FROM alumnos');
    res.json(rows);
};

// Logins
export const loginUser = async (req, res) => {
    const { id_usuario, contrasena } = req.body;

    try {
        const query = `SELECT l.*, COALESCE(p.nombre || ' ' || p.apellido, d.nombre || ' ' || d.apellido, a.nombre || ' ' || a.apellido) AS nombre_completo FROM login l LEFT JOIN padres p ON l.Padre_id = p.id_padre LEFT JOIN docentes d ON l.Matricula_docente = d.matricula_docente LEFT JOIN administrativos a ON l.Matricula_admin = a.matricula_admin WHERE l.id_usuario = $1`;

        const result = await pool.query(query, [id_usuario]);

        if (result.rows.length === 0) {
            return res.status(401).json({ message: "Usuario no encontrado" });
        }

        const user = result.rows[0];

        // Validamos contra 'contrasena' (como está en tu tabla)
        if (user.contrasena !== contrasena) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }

        const perfilId = user.padre_id || user.matricula_docente || user.matricula_admin;

        const token = jwt.sign(
            {
                id: user.id_usuario,
                nombre: user.nombre_completo,
                rol: user.rol,
                perfilId
            },
            JWT_SECRET,
            { expiresIn: '3h' }
        );

        return res.json({
            token,
            user: {
                id: user.id_usuario,
                nombre: user.nombre_completo, // Enviamos "Ana Garcia", "Carlos Lopez", etc.
                rol: user.rol,
                perfilId: perfilId
            }
        });

    } catch (error) {
        // Esto imprimirá el error real en tu terminal de Node
        console.error("Error en Postgres:", error.stack);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

// getUser
export const getUser = async (req, res) => {
    const { id } = req.params;
    const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);

    if (rows.length === 0) {
        return res.status(404).json({ message: "User not found" });
    }

    res.json(rows[0]);
};

export const getDocente = async (req, res) => {
    const { id } = req.params;
    const { rows } = await pool.query('SELECT * FROM docentes WHERE id_docente = $1', [id]);

    if (rows.length === 0) {
        return res.status(404).json({ message: "Docente not found" });
    }

    res.json(rows[0]);
};

export const getAlumno = async (req, res) => {
    const { id } = req.params;
    const { rows } = await pool.query('SELECT * FROM alumnos WHERE id_alumno = $1', [id]);

    if (rows.length === 0) {
        return res.status(404).json({ message: "Alumno not found" });
    }

    res.json(rows[0]);
};

// getAlumnoVistaPadre
export const getAlumnoPadre = async (req, res) => {
    const { padreId } = req.params;
    const { rows } = await pool.query('SELECT a.id_alumno, a.nombre AS nombre_alumno, a.apellido AS apellido_alumno, g.nombre AS grupo, m.nombre AS materia, c.calificacion, c.observaciones FROM parentesco p INNER JOIN alumnos a ON p.Alumno_id = a.id_alumno INNER JOIN grupo g ON a.Grupo_id = g.id_grupo INNER JOIN grupomateria gm ON g.id_grupo = gm.Grupo_id INNER JOIN materia m ON gm.Materia_id = m.id_materia LEFT JOIN calificaciones c ON c.Alumno_id = a.id_alumno AND c.Grupomateria_id = gm.id_grupomateria WHERE p.Padre_id = $1;', [padreId]);

    if (rows.length === 0) {
        return res.status(404).json({ message: "Alumno not found" });
    }

    res.json(rows);
};

// getAlumnoVistaDocente
export const getAlumnoDocente = async (req, res) => {
    try {
        const { docenteId } = req.params;
        const { rows } = await pool.query(`SELECT m.nombre AS materia, g.grado, g.nombre AS grupo, a.id_alumno AS matricula_alumno, a.nombre || ' ' || a.apellido AS nombre_alumno, c.calificacion, c.observaciones FROM grupomateria gm JOIN materia m ON gm.Materia_id = m.id_materia JOIN grupo g ON gm.Grupo_id = g.id_grupo JOIN alumnos a ON a.Grupo_id = g.id_grupo LEFT JOIN calificaciones c ON c.Alumno_id = a.id_alumno AND c.Grupomateria_id = gm.id_grupomateria WHERE gm.Matricula_docente = $1;`, [docenteId]);

        if (rows.length === 0) {
            return res.status(404).json({ message: "Subjects not assigned" })
        }
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Alumnos not found" })
    }
};

//getAlumnoVistaAdministrativo
export const getAlumnosAdmin = async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT a.id_alumno AS matricula, a.nombre, a.apellido, g.grado, g.nombre AS grupo, COALESCE(ROUND(AVG(c.calificacion), 2), 0) AS calificacion_general FROM alumnos a INNER JOIN grupo g ON a.Grupo_id = g.id_grupo LEFT JOIN calificaciones c ON a.id_alumno = c.Alumno_id GROUP BY a.id_alumno, a.nombre, a.apellido, g.grado, g.nombre ORDER BY g.grado, g.nombre, a.apellido;');
        res.json(rows);
    } catch (error) {
        console.error("getAlumnosAdmin error", error);
        res.status(500).json({ message: "Alumnos list errro" });
    }
};

// createUser
export const createUser = async (req, res) => {
    try {
        const data = req.body
        console.log(data);
        const result = await pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [data.name, data.email]);
        console.log(result);

        return res.json(rows[0]);
    } catch (error) {
        console.log(error);

        if (error?.code === '23505') {
            return res.status(409).json({ message: "Email already exists" });
        }

        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// createDocente
export const createDocente = async (req, res) => {
    try {
        const data = req.body
        console.log(data);
        const result = await pool.query('INSERT INTO docentes (nombre, apellido, correo, telefono, direccion, especialidad, matricula_docente) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [data.nombre, data.apellido, data.correo, data.telefono, data.direccion, data.especialidad, data.matricula_docente]);
        console.log(result);

        return res.json(rows[0]);
    } catch (error) {
        console.log(error);

        if (error?.code === '23505') {
            return res.status(409).json({ message: "Email already exists" });
        }

        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// deleteUser
export const deleteUser = async (req, res) => {
    const { id } = req.params;
    const { rowCount } = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
    console.log(rows);

    if (rowCount === 0) {
        return res.status(404).json({ message: "User not found" });
    }

    return res.sendStatus(204);
};

export const deleteDocente = async (req, res) => {
    const { id } = req.params;
    const { rowCount } = await pool.query('DELETE FROM docentes WHERE matricula_docente = $1 RETURNING *', [id]);
    console.log(rows);

    if (rowCount === 0) {
        return res.status(404).json({ message: "Docente not found" });
    }

    return res.sendStatus(204);
};

export const deletePadre = async (req, res) => {
    const { id } = req.params;
    const { rowCount } = await pool.query('DELETE FROM padres WHERE id_padre = $1 RETURNING *', [id]);
    console.log(rows);

    if (rowCount === 0) {
        return res.status(404).json({ message: "Padre not found" });
    }

    return res.sendStatus(204);
};

export const deleteGrupo = async (req, res) => {
    const { id } = req.params;
    const { rowCount } = await pool.query('DELETE FROM grupo WHERE id_grupo = $1 RETURNING *', [id]);
    console.log(rows);

    if (rowCount === 0) {
        return res.status(404).json({ message: "Grupo not found" });
    }

    return res.sendStatus(204);
};

export const deleteAlumno = async (req, res) => {
    const { id } = req.params;
    const { rowCount } = await pool.query('DELETE FROM alumnos WHERE id_alumno = $1 RETURNING *', [id]);
    console.log(rows);

    if (rowCount === 0) {
        return res.status(404).json({ message: "Alumno not found" });
    }

    return res.sendStatus(204);
};

export const deleteMateria = async (req, res) => {
    const { id } = req.params;
    const { rowCount } = await pool.query('DELETE FROM materia WHERE id_materia = $1 RETURNING *', [id]);
    console.log(rows);

    if (rowCount === 0) {
        return res.status(404).json({ message: "Materia not found" });
    }

    return res.sendStatus(204);
};

// updateUser
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    const { rows } = await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *', [data.name, data.email, id]);

    return res.json(rows[0]);
};