// Array para almacenar la información de las mesas registradas
const mesasRegistradas = [];

// Función para verificar si un número de mesa ya existe
function mesaExistente(numeroMesa) {
    return mesasRegistradas.some(mesa => mesa.numero === numeroMesa);
}

// Función para mostrar un mensaje de error
function showError(message) {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = message;
}

// Función para borrar el mensaje de error
function clearError() {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = '';
}

// Función para registrar una nueva mesa
function registrarMesa() {
    // Obtener valores del formulario
    const numeroMesa = document.getElementById('numeroMesa').value;
    const disponibilidad = document.getElementById('disponibilidad').value;

    // Validar que los campos no estén en blanco
    if (numeroMesa.trim() === '' || disponibilidad.trim() === '') {
        showError('Por favor, complete todos los campos.');
        return;
    }


    // Validar que el número de mesa sea único
    if (mesaExistente(numeroMesa)) {
        showError('El número de mesa ya existe. Por favor, ingrese uno diferente.');
        return;
    }

    // Validar que la numeroMesa sea un número no negativo
    if (isNaN(numeroMesa) || numeroMesa < 0) {
        showError('Por favor, ingrese números válidos para el número de mesa');
        return;
    }

    // Validar que la disponibilidad sea un número no negativo
    if (isNaN(disponibilidad) || disponibilidad < 0) {
        showError('Por favor, ingrese un número válido y no negativo para la disponibilidad.');
        return;
    }

    // Limpiar el mensaje de error si la entrada es válida
    clearError();

    // Agregar la mesa al array de mesas registradas
    mesasRegistradas.push({ numero: numeroMesa, disponibilidad, estado: 'libre', comandas: [] });

    // Limpiar el formulario y actualizar la visualización
    limpiarFormulario();
    mostrarMesasGuardadas();
}


// Función para limpiar los campos del formulario
function limpiarFormulario() {
    document.getElementById('numeroMesa').value = '';
    document.getElementById('disponibilidad').value = '';
}

// Función para agregar una comanda a una mesa
function agregarComanda(index) {
    const mesa = mesasRegistradas[index];
    mesa.estado = 'ocupada';
    mostrarFormularioComanda(index);
    mostrarMesasGuardadas();
}

// Función para cambiar el estado de una mesa a libre
function cambiarEstadoLiberar(index) {
    mesasRegistradas[index].estado = 'libre';
    mostrarMesasGuardadas();
}

// Función para mostrar el formulario de comandas
function mostrarFormularioComanda(index) {
    const modalComanda = document.getElementById('formularioComanda');
    modalComanda.style.display = 'flex';

    // Configurar el evento de envío del formulario de comanda
    const comandaForm = document.getElementById('comandaForm');
    comandaForm.onsubmit = (event) => {
        event.preventDefault();
        const orden = document.getElementById('orden').value;
        const horaFormato = formatTime(new Date());
        guardarComanda(index, orden, horaFormato);
        cerrarModalComanda();
    };
}

// Función para cerrar el modal de comanda
function cerrarModalComanda() {
    const modalComanda = document.getElementById('formularioComanda');
    modalComanda.style.display = 'none';
}

// Función para guardar una comanda en una mesa
function guardarComanda(index, orden, hora) {
    mesasRegistradas[index].comandas.push({ orden, hora });
    mostrarComandasGuardadas();
}

// Función para mostrar las comandas guardadas en el DOM
function mostrarComandasGuardadas() {
    const listaComandas = document.getElementById('comandasGuardadas');
    listaComandas.innerHTML = '';

    // Iterar sobre las mesas registradas y sus comandas
    mesasRegistradas.forEach((mesa) => {
        mesa.comandas.forEach((comanda) => {
            const listItem = document.createElement('li');
            listItem.textContent = `Mesa ${mesa.numero} - Orden: ${comanda.orden} - Hora: ${comanda.hora}`;
            listaComandas.appendChild(listItem);
        });
    });
}

// Función para mostrar las mesas registradas en el DOM
function mostrarMesasGuardadas() {
    const contenedorMesas = document.getElementById('mesasGuardadas');
    contenedorMesas.innerHTML = '';

    // Iterar sobre las mesas registradas y crear elementos para cada una
    mesasRegistradas.forEach((mesa, index) => {
        const divMesa = document.createElement('div');
        const btnMesa = document.createElement('button');
        btnMesa.textContent = `Mesa ${mesa.numero} - Disponibilidad: ${mesa.disponibilidad} - Estado: ${mesa.estado}`;
        btnMesa.className = `mesa ${mesa.estado === 'libre' ? 'libre' : 'ocupada'}`;

        // Agregar evento de clic al botón de la mesa para agregar comanda
        btnMesa.addEventListener('click', () => agregarComanda(index));

        // Crear botón para liberar mesa
        const btnLiberar = crearBoton('Liberar', 'btn-liberar', () => cambiarEstadoLiberar(index));

        // Agregar elementos al DOM
        divMesa.appendChild(btnMesa);
        divMesa.appendChild(btnLiberar);

        contenedorMesas.appendChild(divMesa);
    });
}


// Función para formatear la hora en un formato legible
function formatTime(date) {
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

// Función para crear un botón con texto, clase y función de clic
function crearBoton(texto, clase, eventoClick) {
    const boton = document.createElement('button');
    boton.textContent = texto;
    boton.className = clase;
    boton.addEventListener('click', eventoClick);
    return boton;
}
