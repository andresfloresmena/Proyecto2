function mostrarModal() {
    // Obtener el div de la ventana modal
    let modal = document.getElementById("modal");
    // Mostrar la ventana modal
    modal.style.display = "block";

    // Mostrar la primera pestaña (Datos básicos)
    let datosBtn = document.getElementById("datosBtn");
    let datosContent = document.getElementById("datosContent");
    datosBtn.classList.add("bg-gray-200", "text-gray-700");
    datosContent.classList.remove("hidden");

    // Ocultar las otras pestañas
    let coberturasBtn = document.getElementById("coberturasBtn");
    let pagoBtn = document.getElementById("pagoBtn");
    let coberturasContent = document.getElementById("coberturasContent");
    let pagoContent = document.getElementById("pagoContent");
    coberturasBtn.classList.remove("bg-gray-200", "text-gray-700");
    pagoBtn.classList.remove("bg-gray-200", "text-gray-700");
    coberturasContent.classList.add("hidden");
    pagoContent.classList.add("hidden");

    // Oscurecer el fondo detrás del modal
    let modalOverlay = document.getElementById("modal-overlay");
    modalOverlay.style.display = "block";
}


function closeModal() {
    // Obtener el elemento modal
    const modal = document.getElementById("modal");



    // Restablecer los valores de los campos de entrada a blanco
    const inputs = modal.querySelectorAll("input, select");
    inputs.forEach((input) => {
        if (input.type === "radio" || input.type === "checkbox") {
            input.checked = false; // Desmarcar los elementos de tipo radio o checkbox
        } else {
            input.value = ""; // Establecer el valor del campo en blanco
        }
    });

    // Restablecer el contenido de los elementos <td> a blanco
    const tds = modal.querySelectorAll("td");
    tds.forEach((td) => {
        td.textContent = "";
    });

    // Ocultar el modal
    modal.style.display = "none";

    // Restaurar el fondo detrás del modal
    let modalOverlay = document.getElementById("modal-overlay");
    modalOverlay.style.display = "none";
}


const datosBtn = document.getElementById('datosBtn');
const coberturasBtn = document.getElementById('coberturasBtn');
const pagoBtn = document.getElementById('pagoBtn');
const datosContent = document.getElementById('datosContent');
const coberturasContent = document.getElementById('coberturasContent');
const pagoContent = document.getElementById('pagoContent');
const coberturasNextBtn = document.getElementById('coberturasNextBtn');
const pagoNextBtn = document.getElementById('pagoNextBtn');
const cascaron = document.getElementById('cascaron');
if (cascaron) {
    cascaron.style.display = "none";
}


datosBtn.addEventListener('click', () => {
    if (validateDatos()) {
        datosBtn.classList.add('bg-gray-200', 'text-gray-700');
        coberturasBtn.classList.remove('bg-gray-200', 'text-gray-700');
        pagoBtn.classList.remove('bg-gray-200', 'text-gray-700');
        datosContent.classList.remove('hidden');
        coberturasContent.classList.add('hidden');
        pagoContent.classList.add('hidden');
        cascaron.style.display = "none";
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
        cascaron.style.display = "block";
    } else {
        alert('Por favor, completa todos los datos antes de pasar a la siguiente pestaña.');
    }
});

pagoBtn.addEventListener('click', () => {
    if (validateDatos() && validateCoberturas()) {
        pagoNext();
        datosBtn.classList.remove('bg-gray-200', 'text-gray-700');
        coberturasBtn.classList.remove('bg-gray-200', 'text-gray-700');
        pagoBtn.classList.add('bg-gray-200', 'text-gray-700');
        datosContent.classList.add('hidden');
        coberturasContent.classList.add('hidden');
        pagoContent.classList.remove('hidden');
        cascaron.style.display = "none";
    } else {
        alert('Por favor, completa todos los datos y selecciona al menos una cobertura antes de pasar a la siguiente pestaña.');
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
        cascaron.style.display = "block";
    } else {
        alert('Por favor, completa todos los datos antes de pasar a la siguiente pestaña.');
    }
});

const Cobertura = [];

pagoNextBtn.addEventListener('click', () => {
    pagoNext();
});

async function pagoNext() {
    if (Cobertura.length > 0) {
        Cobertura.splice(0, Cobertura.length);
    }
    cascaron.style.display = "none";
    if (validateDatos() && validateCoberturas()) {
        const placaValue = document.getElementById('placaAgregar').value;
        const selectElement = document.getElementById('modelo-marca');
        const selectedOption = selectElement.options[selectElement.selectedIndex];
        const marcaModeloText = selectedOption.text;
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
        modeloElement.textContent = `${marcaModeloText}`;
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
                        Cobertura.push(cobertura);
                        const row = document.createElement('tr');
                        const descripcionCell = document.createElement('td');
                        const costoCell = document.createElement('td');

                        descripcionCell.classList.add('border', 'px-4', 'py-2');
                        costoCell.classList.add('border', 'px-4', 'py-2');

                        descripcionCell.textContent = coberturaDescripcion;
                        costoCell.textContent = "₡" + cobertura.costoMinimo; // Aquí debes obtener el costo mínimo de la cobertura

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
        cascaron.style.display = "block";
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
        clickOpens: true // Abre el calendario al hacer clic en el campo
    });
});


async function pagar() {
    const placaValue = document.getElementById('placaAgregar').value;
    const marcaModeloValue = document.getElementById('modelo-marca').value;
    const selectElement = document.getElementById('modelo-marca');
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    const marcaModeloText = selectedOption.text;
    const añoValue = document.getElementById('annio').value;
    const valorValue = document.getElementById('valor').value;
    const fechaValue = document.getElementById('fecha').value;
    const modoPagoValue = document.querySelector('input[name="modoPago"]:checked').value;

    let poliza = {
        idPoliza: 0,
        placa: placaValue,
        fechaInicio: fechaValue,
        plazoPago: modoPagoValue,
        auto: marcaModeloText,
        annio: añoValue,
        costoTotal: valorValue, // Ten en cuenta que JavaScript no tiene un tipo de dato BigDecimal incorporado, tendrías que usar una biblioteca externa o implementar tu propia lógica para trabajar con números decimales de alta precisión.
        cliente: userGlobal,
        cobertura: Cobertura,
        idPolizaModelo: marcaModeloValue
    };

    const response = await fetch(`${backend}/polizas/pagar`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(poliza)
    });

    if (response.ok) {
        Swal.fire({
            icon: 'success',
            title: '¡Tu compra fue exitosa!',
            text: 'Gracias por tu compra',
            showConfirmButton: false,
            timer: 2000 // El alert se cerrará automáticamente después de 2 segundos
        });
        obtenerPolizas();
        closeModal();
    } else {
        console.log("Error");
    }
}

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
                    option.value = modelo.id;
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
        } else {
            console.error('Error al obtener las categorías');
        }
    } catch (error) {
        console.error('Error al obtener las categorías:', error);
    }
}




// Llamar a la función para obtener las categorías al cargar la página
document.addEventListener('DOMContentLoaded', obtenerCategorias);