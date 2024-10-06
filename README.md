
# Inventario de Productos - Aplicación Web (SPA)

Este proyecto es un sistema de inventario de productos, donde los usuarios pueden ver productos, filtrarlos, y agregar productos a su lista de favoritos. Los administradores pueden agregar, editar y eliminar productos, así como gestionar usuarios. Este proyecto está desarrollado utilizando **React** en el frontend y **Node.js** con **Express** en el backend. La base de datos utilizada es **MongoDB**, y la comunicación entre el frontend y el backend se realiza mediante **Axios**.

## Funcionalidades del Proyecto

### Frontend
- Listado de productos con paginación.
- Búsqueda y filtrado de productos por categoría.
- Registro y login de usuarios (autenticación con JWT).
- Gestión de productos para usuarios con rol "admin":
  - Crear, editar y eliminar productos.
- Perfil de usuario: 
  - Edición de información personal.
  - Cambiar contraseña.
- Favoritos:
  - Los usuarios pueden agregar productos a una lista de favoritos.
  - Ver, eliminar productos de la lista de favoritos.

### Backend
- Autenticación con JWT.
- CRUD de productos (solo administradores).
- Gestión de usuarios (ver y editar perfiles).
- API RESTful para gestionar los productos y los favoritos.

## Estructura de Carpetas

El proyecto está dividido en dos repositorios:
1. **Frontend**: Implementado con React y Vite.
2. **Backend**: Implementado con Node.js, Express y MongoDB.

## Dependencias Utilizadas

### Backend
- `express`: Framework para crear el servidor.
- `mongoose`: Para trabajar con MongoDB.
- `jsonwebtoken`: Para generar y verificar tokens JWT.
- `bcryptjs`: Para encriptar las contraseñas.
- `dotenv`: Para gestionar variables de entorno.
- `cors`: Para permitir peticiones cross-origin.
- `express-validator`: Para la validación de datos en las rutas.

### Frontend
- `react`: Biblioteca para construir interfaces de usuario.
- `axios`: Para hacer peticiones HTTP al backend.
- `react-bootstrap`: Para estilos y componentes UI basados en Bootstrap.
- `vite`: Herramienta de desarrollo y compilación rápida.

## Configuración del Backend

El archivo `config.env` debe contener las siguientes variables de entorno, o se pueden ajustar al gusto del usuario:

```bash
# Conexión a MongoDB
MONGO_URI=mongodb://localhost:27017/BD

# Configuración del servidor
PORT=5000

# Credenciales del administrador
ADMIN_USERNAME=admin
ADMIN_NOMBRE=Admin
ADMIN_EMAIL=admin@invsis.com
ADMIN_PASSWORD=admin
ADMIN_ROL=admin

# JWT
JWT_SECRET=uvmpanas1337
JWT_EXPIRE=100000H
```

### Instalación y Ejecución

#### Backend
1. Clona el repositorio del backend.
2. Instala las dependencias ejecutando: `npm install`.
3. Crea un archivo `.env` en la raíz del proyecto con las variables de configuración (por defecto, es incluído en este proyecto como ejemplo).
4. Ejecuta el servidor con: `npm run dev`.

#### Frontend
1. Clona el repositorio del frontend.
2. Instala las dependencias ejecutando: `npm install`.
3. Ejecuta el frontend con: `npm run dev`.

## Lógica de Programación

### Autenticación y Roles
El sistema utiliza JWT para la autenticación. Al iniciar sesión, el backend genera un token que se almacena en `localStorage` del frontend. Este token se utiliza en cada petición protegida (como agregar, editar o eliminar productos). Los administradores tienen permisos adicionales para gestionar productos y usuarios.

### Productos y Paginación
El backend proporciona una API para obtener productos, con soporte para paginación, búsqueda y filtrado por categoría. El frontend consume esta API y muestra los productos en una tabla, permitiendo buscar y filtrar de manera dinámica.

### Favoritos
Cada usuario autenticado puede agregar productos a su lista de favoritos. La lista de favoritos se almacena en la base de datos y se puede gestionar (agregar y eliminar productos) a través del frontend.

## Cómo Utilizar el Proyecto

### Paso 1: Configuración
- Configurar el archivo `.env` en el backend con las variables necesarias.
- Se debe de tener MongoDB corriendo en la máquina local o en un servidor. Ajustar el archivo "config.env" según sea necesario.

### Paso 2: Ejecutar Backend
```bash
npm run dev
```

### Paso 3: Ejecutar Frontend
```bash
npm run dev
```

### Paso 4: Probar el Proyecto
1. Regístrate como un usuario nuevo.
2. Si estás logueado como administrador (credenciales del archivo `.env`), podrás agregar, editar o eliminar productos.
3. Los usuarios pueden buscar productos, agregarlos a favoritos, y ver su perfil.

## Otros Detalles

- **Diseño Responsivo**: El frontend utiliza `react-bootstrap` para un diseño responsivo y agradable en dispositivos móviles y de escritorio.
- **Seguridad**: Las contraseñas están encriptadas usando `bcryptjs`, y las rutas protegidas están disponibles solo para usuarios autenticados.
- **Validación**: Los formularios y las rutas de la API utilizan `express-validator` para validar los datos de entrada.
