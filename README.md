<br />
<div align="center">
    <br />
    <br />
    <p>
        Proyecto de prueba para la empresa unow
</p>


</div>

<br />


## 🗒️ Tabla de contenido 

1. [💬 Introduction](#introduction)
2. [🛠️ Tools](#tools)
3. [✨ Features](#features)
4. [🚀 Getting Started](#getting-started)
5. [💻 Code Snippets](#code-snippets)
6. [☕ Support Me](#support-me)

## <a name="introduction">💬 Introduction</a>

Este proyecto es una prueba para la empresa unow el desarrollo esta echo en Vit React js y javascript la aplicacion funciona como una aplicacion FrontEnd que consume recursos de una aplicacion Backend creada en laravel que funciona con autenticacion JWT tokens 

la aplicacion tiene varias vistas y un dashboard creado con una plantilla basada en taildwindCSS 

la aplicacion tiene una pantalla de login en la ruta "/" aca el usuario debe loguearse con sus credencailes correo y contraseña donde se hace una peticion al servidor backend laravel y este valida que el usuario exista ademas devuelve un token con la informacion del usuario codificada informacion que se usa dentro de la aplicacion forntend de multiples formas como para acceder a algunas rutas o partes de la aplicacion como tambien para hacer peticiones usando el token a rutas protegidas por el backend.

la ruta de /dashboard es donde esta el panel inicial puse una tabla con tareas para que no se viera vacio

la ruta "/dashboard/list-employees" es donde se encuentra la lista de usuarios tambien se pueden editar y eliminar pero solo el administrador "sw admin" puede acceder a esta seccion y la peticion esta protegida por token

la ruta "/dashboard/register-employee" es donde el usuario admin puede registrar otros usuarios por el usuario "sw admin" y la peticon esta protegida por token

en el icono de la foto en la barra del header o cabecera de la aplicacion se encuentra el icono del usuario ahi se puede editar el usuario asi mismo y tambien darse de baja o eliminar su propio usuario

en la cabecera tambien se encuentra el icono de salida de la aplicacion donde el usuario puede salir de esta eliminar el token creado para el

en la ruta "/register" no se encuentra protegida para el caso de que los usuarios se quieran registrar o ingresar a la aplicacion usando un formulario de registro





## <a name="tools">🛠️ Herramientas </a>

-   [React JS](https://react.dev)
-   [TailwindCSS](https://tailwindcss.com/)
-   [Lucide Icons](https://lucide.dev/)
-   [React Router](https://reactrouter.com/en/main)
-   react-table (para las tablas)
-   jwt-decode (decodifica el token y extrae la informacion)
-   react-toastify (para mensajes emergentes)


## <a name="features">✨ Caracteristicas </a>

-   El layout es responsive
-   La aplicacion es reactiva
-   tiene autenticacion por tokens y las rutas estan protegidas por el mismo
-   tambien se usa el puesto para restringir rutas segun el rol o la posicion (positon) donde asumo que el cargo "sw admin" es el que tiene todos los               privilegios
-   se utiliza el recurso endpoint https://ibillboard.com/api/positions para traer las posiciones y agregarlos a los selectores tanto en el formulario de            registro interno como en el externo
-   

## <a name="getting-started">🚀Como iniciar</a>



usando GitHub:

-   Ir al proyecto 
-   Click en boton verde arriba 👆
-   Click Download ZIP

#### Instalacion

Instalar poryecto usando npm:

```bash
npm install
```

**\*\*_asegurese de tenr instalado [NodeJS](https://nodejs.org/en) en tu maquina._**

#### Correr el proyecto

```bash
npm run dev
```

**\*\*_Este proyecto usa [Vite](https://vitejs.dev)._**

## <a name="support-me">☕ Support Juan David Vicuña Salazar</a>



