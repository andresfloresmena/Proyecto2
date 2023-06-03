function mostrarModal() {
    // Obtener el div de la ventana modal
    let modal = document.getElementById("modal");
    // Mostrar la ventana modal
    modal.style.display = "block";

    // Oscurecer el fondo detrás del modal
    let modalOverlay = document.getElementById("modal-overlay");
    modalOverlay.style.display = "block";
}

function closeModal() {
    // Obtener el elemento modal
    const modal = document.getElementById("modal");

    // Ocultar el modal
    modal.style.display = "none";

    // Restaurar el fondo detrás del modal
    let modalOverlay = document.getElementById("modal-overlay");
    modalOverlay.style.display = "none";

    // Restablecer los valores de los campos de entrada a blanco
    const inputs = modal.querySelectorAll("input, select");
    inputs.forEach((input) => {
        if (input.type === "radio" || input.type === "checkbox") {
            input.checked = false; // Desmarcar los elementos de tipo radio o checkbox
        } else {
            input.value = ""; // Establecer el valor del campo en blanco
        }
    });
}


const datosBtn = document.getElementById('datosBtn');
const coberturasBtn = document.getElementById('coberturasBtn');
const pagoBtn = document.getElementById('pagoBtn');
const datosContent = document.getElementById('datosContent');
const coberturasContent = document.getElementById('coberturasContent');
const pagoContent = document.getElementById('pagoContent');
const coberturasNextBtn = document.getElementById('coberturasNextBtn');
const pagoNextBtn = document.getElementById('pagoNextBtn');

datosBtn.addEventListener('click', () => {
    if (validateDatos()) {
        datosBtn.classList.add('bg-gray-200', 'text-gray-700');
        coberturasBtn.classList.remove('bg-gray-200', 'text-gray-700');
        pagoBtn.classList.remove('bg-gray-200', 'text-gray-700');
        datosContent.classList.remove('hidden');
        coberturasContent.classList.add('hidden');
        pagoContent.classList.add('hidden');
    } else {
        alert('Por favor, completa todos los datos antes de pasar a la siguiente pestaña.');
    }
});

coberturasBtn.addEventListener('click', () => {
    if (validateDatos()) {
        datosBtn.classList.remove('bg-gray-200', 'text-gray-700');
        coberturasBtn.classList.add('bg-gray-200', 'text-gray-700');
        pagoBtn.classList.remove('bg-gray-200', 'text-gray-700');
        datosContent.classList.add('hidden');
        coberturasContent.classList.remove('hidden');
        pagoContent.classList.add('hidden');
    } else {
        alert('Por favor, completa todos los datos antes de pasar a la siguiente pestaña.');
    }
});

pagoBtn.addEventListener('click', () => {
    if (validateDatos()) {
        datosBtn.classList.remove('bg-gray-200', 'text-gray-700');
        coberturasBtn.classList.remove('bg-gray-200', 'text-gray-700');
        pagoBtn.classList.add('bg-gray-200', 'text-gray-700');
        datosContent.classList.add('hidden');
        coberturasContent.classList.add('hidden');
        pagoContent.classList.remove('hidden');
    } else {
        alert('Por favor, completa todos los datos antes de pasar a la siguiente pestaña.');
    }
});

coberturasNextBtn.addEventListener('click', () => {
    if (validateDatos()) {
        datosBtn.classList.remove('bg-gray-200', 'text-gray-700');
        coberturasBtn.classList.add('bg-gray-200', 'text-gray-700');
        pagoBtn.classList.remove('bg-gray-200', 'text-gray-700');
        datosContent.classList.add('hidden');
        coberturasContent.classList.remove('hidden');
        pagoContent.classList.add('hidden');
    } else {
        alert('Por favor, completa todos los datos antes de pasar a la siguiente pestaña.');
    }
});

async function pagoNext() {
    if (validateDatos() && validateCoberturas()) {
        const placaValue = document.getElementById('placaAgregar').value;
        const marcaModeloValue = document.getElementById('modelo-marca').value;
        const añoValue = document.getElementById('annio').value;
        const valorValue = document.getElementById('valor').value;
        const fechaValue = document.getElementById('fecha').value;
        const modoPagoValue = document.querySelector('input[name="modoPago"]:checked').value;

        const autoElement = document.querySelector('#pagoContent h6');
        const clienteElement = document.getElementById('clienteValue');
        const modeloElement = document.getElementById('modeloValue');
        const fechaInicioElement = document.getElementById('fechaInicioValue');
        const plazoPagoElement = document.getElementById('plazoPagoValue');
        const costoTotalElement = document.getElementById('costoTotalValue');

        autoElement.textContent = `Placa: ${placaValue}`;
        clienteElement.textContent = `${userGlobal.nombre}`; // Aquí debes obtener el valor del cliente seleccionado
        modeloElement.textContent = `${marcaModeloValue}`;
        fechaInicioElement.textContent = `${fechaValue}`; // Aquí debes obtener la fecha de inicio
        plazoPagoElement.textContent = `${modoPagoValue}`; // Aquí debes obtener el plazo de pago
        costoTotalElement.textContent = `₡${valorValue}`; // Aquí debes obtener el costo total

        const coberturasTableBody = document.getElementById('coberturasTableBody');
        coberturasTableBody.innerHTML = ""; // Limpiar las coberturas seleccionadas

        // Aquí debes agregar la lógica para obtener y mostrar las coberturas seleccionadas en la tabla correspondiente
        const coberturasSeleccionadas = document.querySelectorAll('input[name="coberturas"]:checked');

        for (const coberturaSeleccionada of coberturasSeleccionadas) {
            const coberturaDescripcion = coberturaSeleccionada.parentNode.textContent.trim();
            const response = await fetch(`${backend}/polizas/obtenerCategorias`);
            const categorias = await response.json();
            for (const categoria of categorias) {
                for (const cobertura of categoria.coberturas) {
                    if (cobertura.descripcion === coberturaDescripcion) {
                        const row = document.createElement('tr');
                        const descripcionCell = document.createElement('td');
                        const costoCell = document.createElement('td');

                        descripcionCell.classList.add('border', 'px-4', 'py-2');
                        costoCell.classList.add('border', 'px-4', 'py-2');

                        descripcionCell.textContent = coberturaDescripcion;
                        costoCell.textContent = "₡"+cobertura.costoMinimo; // Aquí debes obtener el costo mínimo de la cobertura

                        row.appendChild(descripcionCell);
                        row.appendChild(costoCell);

                        coberturasTableBody.appendChild(row);
                    }
                }
            }
        }

        datosBtn.classList.remove('bg-gray-200', 'text-gray-700');
        coberturasBtn.classList.remove('bg-gray-200', 'text-gray-700');
        pagoBtn.classList.add('bg-gray-200', 'text-gray-700');
        datosContent.classList.add('hidden');
        coberturasContent.classList.add('hidden');
        pagoContent.classList.remove('hidden');
    } else {
        alert('Por favor, completa todos los datos y selecciona al menos una cobertura antes de pasar a la siguiente pestaña.');
    }
}
;


function validateDatos() {
    const placaValue = document.getElementById('placaAgregar').value;
    const marcaModeloValue = document.getElementById('modelo-marca').value;
    const añoValue = document.getElementById('annio').value;
    const valorValue = document.getElementById('valor').value;
    const modoPagoValue = document.querySelector('input[name="modoPago"]:checked');

    return placaValue !== '' && marcaModeloValue !== '' && añoValue !== '' && valorValue !== '' && modoPagoValue !== null;
}

function validateCoberturas() {
    const coberturasSelected = document.querySelectorAll('input[name="coberturas"]:checked');
    return coberturasSelected.length > 0;
}

document.addEventListener("DOMContentLoaded", function () {
    flatpickr("#fecha", {
        dateFormat: "Y-m-d", // Formato de fecha (Año-Mes-Día)
        allowInput: true, // Permite la entrada manual
        clickOpens: true, // Abre el calendario al hacer clic en el campo
    });
});


async function obtenerMarcas() {
    try {
        const response = await fetch(`${backend}/polizas/obtenerMarcas`);

        if (response.ok) {
            const marcas = await response.json();

            const selectMarca = document.getElementById('modelo-marca');

            while (selectMarca.firstChild) {
                selectMarca.removeChild(selectMarca.firstChild);
            }

            // Agregar opción por defecto
            const defaultOption = document.createElement('option');
            defaultOption.value = "";
            defaultOption.text = "Seleccione una marca";
            defaultOption.disabled = true; // Deshabilitar la opción
            defaultOption.selected = true; // Seleccionar la opción por defecto
            selectMarca.appendChild(defaultOption);

            for (const marca of marcas) {
                const optionGroup = document.createElement('optgroup');
                optionGroup.label = marca.nombre;

                for (const modelo of marca.modelos) {
                    const option = document.createElement('option');
                    option.value = modelo.nombre;
                    option.text = modelo.nombre;
                    optionGroup.appendChild(option);
                }

                selectMarca.appendChild(optionGroup);
            }
        } else {
            console.error('Error al obtener las marcas');
        }
    } catch (error) {
        console.error('Error al obtener las marcas:', error);
    }
}

// Llamar a la función para obtener las marcas al cargar la página
document.addEventListener('DOMContentLoaded', obtenerMarcas);


// Función para obtener las categorías del backend y generar las opciones en el formulario de cobertura
async function obtenerCategorias() {
    try {
        const response = await fetch(`${backend}/polizas/obtenerCategorias`);

        if (response.ok) {
            const categorias = await response.json();

            const coberturasContent = document.getElementById('coberturasContent');

            // Limpiar contenido existente
            coberturasContent.innerHTML = '';

            const title = document.createElement('h1');
            title.classList.add('mb-4', 'text-xl', 'font-semibold');
            title.textContent = 'Coberturas';

            coberturasContent.appendChild(title);

            for (const categoria of categorias) {
                const categoryTitle = document.createElement('h2');
                categoryTitle.classList.add('mb-4', 'text-lg', 'font-semibold');
                categoryTitle.textContent = categoria.descripcion;

                const form = document.createElement('form');
                form.classList.add('flex', 'flex-wrap');

                for (const cobertura of categoria.coberturas) {
                    const checkboxContainer = document.createElement('div');
                    checkboxContainer.classList.add('mr-4', 'mb-2');

                    const checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.name = 'coberturas';
                    checkbox.value = cobertura.id;

                    const label = document.createElement('label');
                    label.appendChild(checkbox);
                    label.appendChild(document.createTextNode(cobertura.descripcion));

                    checkboxContainer.appendChild(label);
                    form.appendChild(checkboxContainer);
                }

                coberturasContent.appendChild(categoryTitle);
                coberturasContent.appendChild(form);
            }

            const nextButton = document.createElement('button');
            nextButton.id = 'pagoNextBtn';
            nextButton.type = 'button';
            nextButton.classList.add('px-4', 'py-2', 'bg-blue-500', 'text-white', 'font-semibold', 'rounded', 'hover:bg-blue-700', 'transition-colors');
            nextButton.textContent = 'Siguiente (Pago)';

            coberturasContent.appendChild(nextButton);
        } else {
            console.error('Error al obtener las categorías');
        }
    } catch (error) {
        console.error('Error al obtener las categorías:', error);
    }
}




// Llamar a la función para obtener las categorías al cargar la página
document.addEventListener('DOMContentLoaded', obtenerCategorias);