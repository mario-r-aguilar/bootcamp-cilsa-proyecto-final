# Proyecto Final Grupo 3: Tech Nexus | To Do List

**Bootcamp CILSA Full Stack Developer**

## Integrantes del Equipo

- [Lautaro de la Mano](https://github.com/Lautidelamano)
- [Fernando Barrionuevo](https://github.com/Rasta0705)
- [Dardo Santana](https://github.com/dardosantana)
- [Mario Aguilar](https://github.com/mario-r-aguilar)

## Descripción del proyecto

Se trata de un sitio web pensado para que una empresa pueda proporcionarle
a un empleado una herramienta para gestionar sus tareas laborales diarias.
Es un MVP que permite al empleado crear su usuario, loguearse, agregar tareas,
editarlas, eliminarlas y también puede editar sus datos registrados si lo desea.

## Frontend

### Composición del sitio

El sitio se divide en dos secciones, la primera compuesta de una página **Inicio**,
una para **Registrarse** y una para el **Login**.
La segunda sección contiene la página del **Perfil**, donde verá el listado de tareas
y tendrá un botón en cada una para modificarlas o eliminarlas. También cuenta con
una página para **Agregar Tareas**, otra para **Editar sus Datos de Registro**
y el botón para **Desloguearse**.
A la mencionada segunda sección solo se puede acceder si el empleado está logueado.

### Navegabilidad

Aquí se puede apreciar que hay una interacción plena entre las páginas de la
primer sección. Mientras que en la segunda sección, donde solo se accede cuando el
empleado está logueado, hay interacción plena entre _Mi Perfil_, _Agregar Tarea_ y
_Editar Perfil_, pero a la página _Editar Tarea_ solo se puede acceder desde _Mi Perfil_.
Sin embargo, desde _Editar Tarea_ si es posible acceder al resto de páginas de la
segunda sección. No hay vinculación directa entre las dos secciones.

![muestra la navegabilidad del sitio, tal cual como se describió en el párrafo anterior](./public/img/proyect-docs/navegabilidad.webp)

### Capturas del sitio

**Inicio**

![muestra una captura de la página de inicio](./public/img/proyect-docs/captura-inicio.webp)

> AGREGAR AQUI EL RESTO DE CAPTURAS DEL SITIO

### Tecnologías del frontend

- **HTML**: Se utiliza en la estructura semántica del sitio.
- **CSS**: Se emplea principalmente para personalizar la navbar y footer.
- **Bootstrap v5.2.3**: Se usa para aplicar estilos a las páginas y para lograr que sean responsive.
- **Javascript**: Se emplea para realizar las validaciones de los formularios y para lograr dinamismo en la web.
- **Datatables v1.13.5**: Se utiliza para mostrar el listado de tareas y agregar controles interactivos a la tabla.
- **jQuery v3.6.0**: Se usa como complemento necesario de Datatables.
- **Bootstrap v4.5.2**: Se usa como complemento necesario de Datatables.

---

## Base de Datos

El motor de base de datos utilizado en este proyecto es **MySQL**.

### Entidades y Atributos

Para este MVP se crearon dos entidades: **User y Task**.

![muestra una captura de la tabla o entidad llamada task y sus atributos](./public/img/proyect-docs/task-table.webp)

Esta tabla representa la entidad Task y contiene las tareas que se les asignan a los empleados.
El atributo **task_id** es la clave primaria que se utiliza como identificador único de la tarea,
es un valor numérico y autoincrementadle. En tanto el atributo **user_id** es una clave foránea que
referencia a la _tabla user_, es un dato obligatorio. Cuando se crean o
modifican las tareas se registra la fecha y hora automáticamente
(**task_date_created y task_date_modify**). Asimismo, además de los
atributos obligatorios **task_title** y **task_description**, tiene **task_status**, donde
solo se admiten los siguientes estados: pending, in progress, blocked y finished.

![muestra una captura de la tabla o entidad llamada user y sus atributos](./public/img/proyect-docs/task-table.webp)

Esta tabla representa la entidad User, la cual contiene los datos del usuario.
Los atributos que contiene esta tabla son: el nombre de usuario (**user_name**), el cual debe
contener un valor único, su contraseña (**user_pass**) para el logueo en la
aplicación, el nombre (**user_firstname**) y apellido (**user_lastname**) de la
persona. Además, posee el atributo **user_id** que es la clave primaria utilizada como identificador
único de cada usuario.

### Relaciones

A continuación podemos ver las relaciones entre las entidades o tablas:

**user_table y task_table**: Un usuario puede tener muchas tareas, pero una tarea solo tiene un usuario asignado.

A continuación, podemos observar el **Diagrama Entidad Relación** que generamos usando **MySQL Workbench** (_V. 8.0 CE_) con la cardinalidad correspondiente.

![muestra una captura del diagrama entidad relación con su cardinalidad](./public/img/proyect-docs/erd.webp)

---
