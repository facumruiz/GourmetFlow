# Registro de Mesas y Administración de comandas

Este repositorio contiene una aplicación de registro de mesas diseñada con la visión a futuro de convertirse en un Software como Servicio (SAAS) para la gestión de mesas en restaurantes y lugares de comida.

## Estructura del Proyecto

### HTML (`index.html`)

El archivo HTML proporciona la estructura básica de la página y enlaza con un archivo de estilos externo (`styles.css`) y un archivo de script JavaScript (`script.js`). La página incluye un formulario para registrar mesas, una sección para mostrar las mesas guardadas, un modal para ingresar comandas y una sección para mostrar las comandas guardadas.

### JavaScript (`script.js`)

El script JavaScript maneja la lógica de la aplicación. Algunas de las funciones clave incluyen:

- **`registrarMesa()`:** Registra una nueva mesa con el número y disponibilidad proporcionados.
- **`mostrarFormularioComanda(index)`:** Muestra un formulario modal para agregar una comanda a una mesa específica.
- **`agregarComanda(index)`:** Cambia el estado de una mesa a "ocupada" y muestra el formulario de comanda.
- **`cambiarEstadoLiberar(index)`:** Cambia el estado de una mesa a "libre".
- **`mostrarComandasGuardadas()`:** Muestra en el DOM las comandas guardadas para cada mesa.
- **`mostrarMesasGuardadas()`:** Muestra en el DOM las mesas registradas con botones para agregar comanda y liberar mesa.

## Puntos a Mejorar

### Integración de Base de Datos (SQLite)

- **Objetivo:** Mejorar la persistencia de datos mediante la integración de una base de datos, preferiblemente SQLite.
  
- **Pasos a seguir:**
  1. Investigar cómo integrar SQLite con una aplicación Electron.
  2. Modificar el script (`script.js`) para interactuar con la base de datos.
  3. Implementar funciones para almacenar y recuperar datos de mesas y comandas desde la base de datos.

### Función de Guardar Reservas

- **Objetivo:** Agregar la capacidad de guardar reservas de mesas.

- **Pasos a seguir:**
  1. Diseñar una interfaz de usuario para ingresar la información de la reserva.
  2. Crear funciones en `script.js` para gestionar la reserva de mesas.
  3. Almacenar la información de las reservas en la base de datos.


## Visión Futura - SAAS para Restaurantes

La idea principal de este proyecto es evolucionar hacia un servicio completo para la gestión de mesas en restaurantes y lugares de comida. Se busca proporcionar a los negocios del sector una solución eficiente y fácil de usar para la administración de mesas, pedidos y comandas.



**¡Esperamos que este proyecto evolucione y se convierta en una herramienta valiosa para la industria restaurantera!**
