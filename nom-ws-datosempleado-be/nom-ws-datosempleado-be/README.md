# Gestión de Colaboradores

## Descripción

Aplicación web desarrollada para la administración y consulta de información de colaboradores.
El sistema permite consultar los colaboradores registrados en una base de datos PostgreSQL mediante una API REST desarrollada en ASP.NET Core .NET 8. La información se presenta en una interfaz desarrollada con React, TypeScript y Fluent UI.
También incluye una funcionalidad para determinar un nivel de riesgo según la edad de cada colaborador.

## Tecnologías 

**Backend**
- C#
- ASP.NET Core Web API (.NET 8)
- Entity Framework Core 8
- Npgsql
- Swagger / OpenAPI

**Frontend**
- React
- TypeScript
- Vite
- Fluent UI v9
- HTML5 y CSS3

**Base de datos**
- PostgreSQL 17
- pgAdmin 4

**Herramientas de desarrollo**
- Visual Studio 2026
- Node.js
- npm
- Git

## Funcionalidades

### Consulta de colaboradores

Permite consultar la información registrada en PostgreSQL.

Los datos incluyen:

- Identificador del colaborador
- Nombre
- Apellido
- Dirección
- Edad
- Profesión
- Estado civil

## Configuración del backend

### Requisitos

- .NET SDK 8.0
- PostgreSQL
- Visual Studio 2026 o editor compatible

### Configurar la conexión a PostgreSQL

La aplicación utiliza la cadena de conexión denominada `PostgreSQL`.

Ejemplo de configuración:

```json
{
  "ConnectionStrings": {
    "PostgreSQL": "Host=localhost;Port=5432;Database=test;Username=postgres;Password=contraseña"
  }
}
```

Reemplazar `contraseña` por contraseña local de PostgreSQL.


### Ejecutar el backend

Desde la carpeta del proyecto backend:

```powershell
dotnet restore
dotnet run
```

También puede ejecutarse desde Visual Studio mediante F5.

url

```text
https://localhost:7294
```

Swagger, cuando se ejecuta en el entorno Development, está disponible en:

```text
https://localhost:7294/swagger
```

### Endpoint de consulta

**GET /api/Colaboradores**

Permite obtener el listado de colaboradores registrados en PostgreSQL.

Ejemplo de respuesta:

```json
[
  {
    "idColaborador": 1,
    "nombre": "Andrea",
    "apellido": "Salinas",
    "direccion": "Zona 1, Ciudad",
    "edad": 22,
    "profesion": "Ingeniera",
    "estadoCivil": "Soltera"
  }
]
```

## Configuración del frontend

### Requisitos

- Node.js compatible con Vite
- npm

### Instalar dependencias

Desde la carpeta `nom-wa-datosempleado-fe`:

```powershell
npm install
```

En caso de necesitar instalar Fluent UI:

```powershell
npm install @fluentui/react-components
```

### Ejecutar React

```powershell
npm run dev
```

En PowerShell, si existe una restricción de ejecución de scripts, utilizar:

```powershell
npm.cmd run dev
```

La aplicación se abre normalmente en:

```text
http://localhost:5173
```

### Compilar el frontend

```powershell
npm.cmd run build
```

Este comando ejecuta la validación de TypeScript y genera los archivos de distribución mediante Vite.

## Comunicación entre frontend y backend

React consume la API REST mediante `fetch`.

```typescript
const respuesta = await fetch(
  'https://localhost:7294/api/Colaboradores'
);

const datos = await respuesta.json();
```

El backend tiene configurada una política CORS para permitir solicitudes desde:

```text
http://localhost:5173
```

Si se modifica el puerto del frontend o backend, se deben actualizar las direcciones correspondientes.

## Pruebas funcionales

Para validar el funcionamiento:

1. Iniciar PostgreSQL y verificar que la base de datos esté disponible.
2. Ejecutar la API .NET 8.
3. Comprobar el endpoint de colaboradores desde Swagger.
4. Ejecutar el frontend React.
5. Presionar el botón de carga de colaboradores.
6. Verificar que aparezcan los registros.
7. Presionar el botón Nivel Riesgo de cada colaborador.
8. Comprobar que el mensaje corresponda a la edad registrada.