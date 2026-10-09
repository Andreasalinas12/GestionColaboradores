CREATE TABLE IF NOT EXISTS colaborador (
    idcolaborador INTEGER PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    direccion VARCHAR(200),
    edad INTEGER NOT NULL,
    profesion VARCHAR(100),
    estado_civil VARCHAR(50)
);

INSERT INTO colaborador
(idcolaborador, nombre, apellido, direccion,
 edad, profesion, estado_civil)
VALUES
(1, 'Andrea', 'Salinas', 'Zona 1, Ciudad',
 22, 'Ingeniera', 'Soltera'),
(2, 'Omar', 'Rodriguez', 'Zona 10, Ciudad',
 35, 'Ingeniero', 'Soltero'),
(3, 'Manuel', 'Salinas', 'Zona 4, Ciudad',
 58, 'Licenciado', 'Casado')
ON CONFLICT (idcolaborador) DO NOTHING;