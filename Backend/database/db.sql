CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO
    users (name, email)
VALUES
    ('Alice', 'alice@gmail.com'),
    ('Bob', 'bob@gmail.com');

SELECT
    *
FROM
    users;

------------------------------------------------------------------------
CREATE DATABASE pirca;

--Administrativos--
CREATE TABLE administrativos (
    id_admin SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100),
    departamento VARCHAR (100) NOT NULL,
    correo VARCHAR(150) NOT NULL UNIQUE,
    matricula_admin VARCHAR(50) NOT NULL UNIQUE
);

--Datos de ejemplo--
INSERT INTO administrativos (nombre, apellido, departamento, correo, matricula_admin) VALUES ('Ana', 'Garcia', 'Control Escolar', 'ana@gmail.com', 'ADM001');

--Docentes--
CREATE TABLE docentes (
    id_docente SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    correo VARCHAR(150) NOT NULL UNIQUE,
    telefono VARCHAR(20) NOT NULL UNIQUE,
    direccion VARCHAR(255),
    especialidad VARCHAR(100),
    matricula_docente VARCHAR(50) NOT NULL UNIQUE
);

--Datos de ejemplo--
INSERT INTO docentes (nombre, apellido, correo, telefono, direccion, especialidad, matricula_docente) VALUES ('Carlos', 'Lopez', 'carlos@gmail.com', '8822993344', 'Av. Central 123', 'Matematicas', 'DOC001');

--Padres--
CREATE TABLE padres (
    id_padre SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    correo VARCHAR(150) NOT NULL UNIQUE,
    telefono VARCHAR(20) NOT NULL UNIQUE,
    direccion VARCHAR(255)
);

--Datos de ejemplo--
INSERT INTO padres (nombre, apellido, correo, telefono, direccion) VALUES ('Maria', 'Hernandez', 'maria@gmail.com', '8899116633', 'Calle Norte 45');

--Login--
CREATE TABLE login (
    id_usuario VARCHAR(50) PRIMARY KEY,
    Padre_id INT DEFAULT NULL,
    Matricula_docente VARCHAR(50),
    Matricula_admin VARCHAR(50),
    contrasena VARCHAR(255) NOT NULL,
    rol VARCHAR(50) NOT NULL,
    CONSTRAINT fk_login_padre FOREIGN KEY (Padre_id) REFERENCES padres(id_padre),
    CONSTRAINT fk_login_docente FOREIGN KEY (Matricula_docente) REFERENCES docentes(matricula_docente),
    CONSTRAINT fk_login_administrativo FOREIGN KEY (Matricula_admin) REFERENCES administrativos(matricula_admin),
    CONSTRAINT chk_rol CHECK (
        (
            Padre_id IS NOT NULL
            AND Matricula_docente IS NULL
            AND Matricula_admin IS NULL
        )
        OR (
            Matricula_docente IS NOT NULL
            AND Padre_id IS NULL
            AND Matricula_admin IS NULL
        )
        OR (
            Matricula_admin IS NOT NULL
            AND Padre_id IS NULL
            AND Matricula_docente IS NULL
        )
    )
);

--Datos de ejemplo--
INSERT INTO login (id_usuario, Padre_id, Matricula_docente, Matricula_admin, contrasena, rol) VALUES ('marialogin', 1, NULL, NULL, 'hash123', 'Padre');
INSERT INTO login (id_usuario, Padre_id, Matricula_docente, Matricula_admin, contrasena, rol) VALUES ('carloslogin', NULL, 'DOC001', NULL, 'hash456', 'Docente');
INSERT INTO login (id_usuario, Padre_id, Matricula_docente, Matricula_admin, contrasena, rol) VALUES ('analogin', NULL, NULL, 'ADM001', 'hash789', 'Administrativo');

--Grupo--
CREATE TABLE grupo (
    id_grupo INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    grado VARCHAR(50),
    Tutor_id INT,
    CONSTRAINT fk_tutor FOREIGN KEY (Tutor_id) REFERENCES docentes(id_docente)
);

--Datos de ejemplo--
INSERT INTO grupo (nombre, grado, Tutor_id) VALUES ('A', '1° Grado', 1);

--Alumnos--
CREATE TABLE alumnos (
    id_alumno VARCHAR(50) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    f_nacimiento DATE,
    t_sangre VARCHAR(5),
    Grupo_id INT,
    CONSTRAINT fk_grupo FOREIGN KEY (Grupo_id) REFERENCES grupo(id_grupo)
);

--Datos de ejemplo--
INSERT INTO alumnos (id_alumno, nombre, apellido, f_nacimiento, t_sangre, Grupo_id) VALUES ('P92100042', 'Pedro', 'Diaz', '26-05-2003', 'O+', 1);
INSERT INTO alumnos (id_alumno, nombre, apellido, grupo_id) VALUES ('ALU001', 'Juan', 'Pérez', 1), ('ALU002', 'María', 'García', 1), ('ALU003', 'Carlos', 'Rodríguez', 1), ('ALU004', 'Ana', 'Martínez', 1), ('ALU005', 'Luis', 'Sánchez', 1);

--Parentesco--
CREATE TABLE parentesco (
    id_parentesco SERIAL PRIMARY KEY,
    Alumno_id VARCHAR(50) NOT NULL,
    Padre_id INT NOT NULL,
    parentesco VARCHAR(50),
    CONSTRAINT fk_parentescoA FOREIGN KEY (Alumno_id) REFERENCES alumnos(id_alumno),
    CONSTRAINT fk_parentescoP FOREIGN KEY (Padre_id) REFERENCES padres(id_padre)
);

--Datos de ejemplo--
INSERT INTO parentesco (Alumno_id, Padre_id, parentesco) VALUES ('P92100042', 1, 'Padre');

--Materias--
CREATE TABLE materia (
    id_materia SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT
);

--Datos de ejemplo--
INSERT INTO materia (nombre, descripcion) VALUES ('Matematicas', 'Materia de matematicas para primer grado');

--GrupoMateria--
CREATE TABLE grupomateria (
    id_grupomateria SERIAL PRIMARY KEY,
    Grupo_id INT NOT NULL,
    Materia_id INT NOT NULL,
    Matricula_docente VARCHAR(50) NOT NULL,
    CONSTRAINT fk_grupo FOREIGN KEY (Grupo_id) REFERENCES grupo(id_grupo),
    CONSTRAINT fk_materia FOREIGN KEY (Materia_id) REFERENCES materia(id_materia),
    CONSTRAINT fk_docente FOREIGN KEY (Matricula_docente) REFERENCES docentes(matricula_docente)
);

--Datos de ejemplo--
INSERT INTO grupomateria (Grupo_id, Materia_id, Matricula_docente) VALUES (1, 1, 'DOC001');

--Calificaciones--
CREATE TABLE calificaciones (
    id_calificacion SERIAL PRIMARY KEY,
    Alumno_id VARCHAR(50) NOT NULL,
    Grupomateria_id INT NOT NULL,
    calificacion NUMERIC(5, 2),
    observaciones TEXT,
    CONSTRAINT fk_calificacion FOREIGN KEY (Alumno_id) REFERENCES alumnos(id_alumno),
    CONSTRAINT fk_calificacionG FOREIGN KEY (Grupomateria_id) REFERENCES grupomateria(id_grupomateria)
);

--Datos de ejemplo--
INSERT INTO calificaciones (Alumno_id, Grupomateria_id, calificacion, observaciones) VALUES ('P92100042', 1, 95.50, 'Excelente desempeño');
INSERT INTO calificaciones (alumno_id, grupomateria_id, calificacion, observaciones) VALUES ('ALU001', 1, 9.5, 'Excelente desempeño en el examen parcial'), ('ALU002', 1, 7.0, 'Cumplió con todas las tareas, requiere mejorar participación'), ('ALU003', 2, 5.5, 'No entregó el proyecto final de la materia'), ('ALU004', 2, 4.0, 'Faltas excesivas y bajo puntaje en evaluaciones'), ('ALU005', 1, 8.8, 'Participativo y con buenos resultados en prácticas');