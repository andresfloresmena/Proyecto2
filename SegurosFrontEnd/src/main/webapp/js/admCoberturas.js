
async function fetchCategorias() {
    const response = await fetch(`${backend}/administrador/obtenerCategorias`);
    const categorias = await response.json();
    return categorias;
}

// Render categories and their coverages in the HTML page
function renderCategorias(categorias) {
    const categoriasDiv = document.getElementById('categorias-coberturas');
    categoriasDiv.innerHTML = '';  // Clear the div

    // Add a div to hold the table with scrolling ability
    const scrollableDiv = document.createElement('div');
    scrollableDiv.style.width = '100%';  // Adjust as needed
    scrollableDiv.style.height = '500px';  // Adjust as needed
    scrollableDiv.style.overflow = 'auto';  // Enable scrolling when necessary

    // Create a table for all categories and their coverages
    const categoriasTable = document.createElement('table');
    categoriasTable.className = 'table-auto w-full text-gray-700 divide-y divide-gray-200';

    const tableHead = document.createElement('thead');
    tableHead.className = 'bg-blue-900 text-white';
    tableHead.innerHTML = `
    <tr>
      <th class="px-6 py-3 text-xs leading-4 font-medium uppercase tracking-wider">ID Categoría</th>
      <th class="px-6 py-3 text-xs leading-4 font-medium uppercase tracking-wider">Descripción</th>
      <th class="px-6 py-3 text-xs leading-4 font-medium uppercase tracking-wider">Coberturas específicas</th>
    </tr>
  `;

    const tableBody = document.createElement('tbody');
    tableBody.className = 'bg-white divide-y divide-gray-200';

    // Iterate over all categories
    for (let i = 0; i < categorias.length; i++) {
        const categoria = categorias[i];
        const categoriaRow = document.createElement('tr');

        const idCategoriaCell = document.createElement('td');
        idCategoriaCell.className = 'px-6 py-4 whitespace-no-wrap';
        idCategoriaCell.textContent = categoria.id;
        categoriaRow.appendChild(idCategoriaCell);

        const descripcionCategoriaCell = document.createElement('td');
        descripcionCategoriaCell.className = 'px-6 py-4 whitespace-no-wrap';
        descripcionCategoriaCell.textContent = categoria.descripcion;
        categoriaRow.appendChild(descripcionCategoriaCell);

        const coberturasCell = document.createElement('td');
        coberturasCell.className = 'px-6 py-4';

        const coberturasTable = document.createElement('table');
        coberturasTable.className = 'table-auto w-full text-gray-700 divide-y divide-gray-200';

        const coberturasTableHead = document.createElement('thead');
        coberturasTableHead.className = 'bg-blue-800 text-white';
        coberturasTableHead.innerHTML = `
      <tr>
        <th class="px-3 py-2 text-xs leading-4 font-medium uppercase tracking-wider">ID Cobertura</th>
        <th class="px-3 py-2 text-xs leading-4 font-medium uppercase tracking-wider">Descripción</th>
        <th class="px-3 py-2 text-xs leading-4 font-medium uppercase tracking-wider">Costo mínimo</th>
        <th class="px-3 py-2 text-xs leading-4 font-medium uppercase tracking-wider">Costo porcentual</th>
      </tr>
    `;

        const coberturasTableBody = document.createElement('tbody');
        coberturasTableBody.className = 'bg-white divide-y divide-gray-200';

        // Iterate over coberturas of each category
        for (const cobertura of categoria.coberturas) {
            const coberturaRow = document.createElement('tr');
            const idCoberturaCell = document.createElement('td');
            idCoberturaCell.className = 'px-3 py-2 whitespace-no-wrap';
            idCoberturaCell.textContent = cobertura.id;
            coberturaRow.appendChild(idCoberturaCell);

            const descripcionCoberturaCell = document.createElement('td');
            descripcionCoberturaCell.className = 'px-3 py-2 whitespace-no-wrap';
            descripcionCoberturaCell.textContent = cobertura.descripcion;
            coberturaRow.appendChild(descripcionCoberturaCell);

            const costoMinimoCell = document.createElement('td');
            costoMinimoCell.className = 'px-3 py-2 whitespace-no-wrap';
            costoMinimoCell.textContent = `₡${cobertura.costoMinimo}`;
            coberturaRow.appendChild(costoMinimoCell);

            const costoPorcentualCell = document.createElement('td');
            costoPorcentualCell.className = 'px-3 py-2 whitespace-no-wrap';
            costoPorcentualCell.textContent = `${cobertura.costoPorcentual}%`;
            coberturaRow.appendChild(costoPorcentualCell);

            coberturasTableBody.appendChild(coberturaRow);
        }

        coberturasTable.appendChild(coberturasTableHead);
        coberturasTable.appendChild(coberturasTableBody);
        coberturasCell.appendChild(coberturasTable);

        categoriaRow.appendChild(coberturasCell);
        tableBody.appendChild(categoriaRow);

        // Apply styling to differentiate between categories
        if (i % 2 === 0) {
            categoriaRow.classList.add('bg-gray-200');
        } else {
            categoriaRow.classList.add('bg-gray-100');
        }
    }

    categoriasTable.appendChild(tableHead);
    categoriasTable.appendChild(tableBody);
    scrollableDiv.appendChild(categoriasTable);
    categoriasDiv.appendChild(scrollableDiv);
}

// Fetch and render categories when the page is loaded
document.addEventListener('DOMContentLoaded', (event) => {
    fetchCategorias().then(renderCategorias);
});


// Función para enviar el formulario de agregar categoría
async function enviarFormularioCategoria(event) {
    event.preventDefault();

    const descripcion = document.getElementById('categoria-descripcion').value;

    const nuevaCategoria = {
        descripcion: descripcion,
    };

    try {
        const response = await fetch(`${backend}/administrador/agregarCategoria`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevaCategoria),
        });

        if (response.ok) {
            Swal.fire({
                icon: 'success',
                title: '¡Categoria agregada exitosamente!',
                text: '',
                showConfirmButton: false,
                timer: 2000 // El alert se cerrará automáticamente después de 2 segundos
            });
            // El formulario se envió exitosamente, puedes realizar alguna acción adicional si deseas
            console.log('Formulario de categoría enviado exitosamente');
        } else {
            // El formulario no se pudo enviar correctamente, puedes manejar el error de acuerdo a tus necesidades
            console.error('Error al enviar el formulario de categoría');
        }
    } catch (error) {
        console.error('Error al enviar el formulario de categoría:', error);
    }

    fetchCategorias().then(renderCategorias);
    obtenerCategorias();
    
    document.getElementById('categoria-descripcion').value = '';
}

// Función para enviar el formulario de agregar cobertura
async function enviarFormularioCobertura(event) {
    event.preventDefault();

    const categoria = document.getElementById('cobertura-categoria').value;
    const descripcion = document.getElementById('cobertura-descripcion').value;
    const costoMinimo = parseFloat(document.getElementById('cobertura-costo-minimo').value);
    const costoPorcentual = parseFloat(document.getElementById('cobertura-costo-porcentual').value);

    const nuevaCobertura = {
        descripcion: descripcion,
        costoMinimo: costoMinimo,
        costoPorcentual: costoPorcentual,
    };

    try {


        const response = await fetch(`${backend}/administrador/agregarCobertura?categoria=${categoria}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevaCobertura),
        });


        if (response.ok) {
            Swal.fire({
                icon: 'success',
                title: '¡Cobertura agregada exitosamente!',
                text: '',
                showConfirmButton: false,
                timer: 2000 // El alert se cerrará automáticamente después de 2 segundos
            });
            // El formulario se envió exitosamente, puedes realizar alguna acción adicional si deseas
            console.log('Formulario de cobertura enviado exitosamente');
        } else {
            // El formulario no se pudo enviar correctamente, puedes manejar el error de acuerdo a tus necesidades
            console.error('Error al enviar el formulario de cobertura');
        }
    } catch (error) {
        console.error('Error al enviar el formulario de cobertura:', error);
    }

    fetchCategorias().then(renderCategorias);

    obtenerCategorias();
    
    document.getElementById('cobertura-categoria').value = '';
    document.getElementById('cobertura-descripcion').value = '';
    document.getElementById('cobertura-costo-minimo').value = '';
    document.getElementById('cobertura-costo-porcentual').value = '';
}

// Asignar los eventos de envío de formulario
document.getElementById('categoria-form').addEventListener('submit', enviarFormularioCategoria);
document.getElementById('cobertura-form').addEventListener('submit', enviarFormularioCobertura);


// Función para obtener las categorías del backend y generar las opciones en el formulario de cobertura
async function obtenerCategorias() {
    try {
        const response = await fetch(`${backend}/administrador/obtenerCategorias`);

        if (response.ok) {
            const categorias = await response.json();

            const selectCategoria = document.getElementById('cobertura-categoria');

            while (selectCategoria.firstChild) {
                selectCategoria.removeChild(selectCategoria.firstChild);
            }

            // Agregar opción por defecto
            const defaultOption = document.createElement('option');
            defaultOption.value = "";
            defaultOption.text = "Seleccione una categoría";
            defaultOption.disabled = true; // Deshabilitar la opción
            defaultOption.selected = true; // Seleccionar la opción por defecto
            selectCategoria.appendChild(defaultOption);

            for (const categoria of categorias) {
                const option = document.createElement('option');
                option.value = categoria.id;
                option.text = categoria.descripcion;
                selectCategoria.appendChild(option);
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
