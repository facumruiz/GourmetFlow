// Array para almacenar la información de las mesas registradas
const mesasRegistradas = [];

// Función para registrar una nueva mesa
function registrarMesa() {
    // Obtener valores del formulario
    const numeroMesa = document.getElementById('numeroMesa').value;
    const disponibilidad = document.getElementById('disponibilidad').value;

    // Validar que la disponibilidad sea un número
    if (isNaN(disponibilidad)) {
        alert('Por favor, ingrese un número válido para la disponibilidad.');
        return;
    }

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

        // Crear botones para agregar comanda y liberar mesa
        const btnAgregarComanda = crearBoton('Agregar Comanda', 'btn-comanda', () => agregarComanda(index));
        const btnLiberar = crearBoton('Liberar', 'btn-liberar', () => cambiarEstadoLiberar(index));

        // Agregar elementos al DOM
        divMesa.appendChild(btnMesa);
        divMesa.appendChild(btnAgregarComanda);
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
