let backend = "http://localhost:8080/SegurosBackEnd/api";
// Clientes y Polizas
// 
// Fetch all clients and their policies from the server
async function fetchClientesYPolizas() {
    const response = await fetch(`${backend}/administrador/clientesYPolizas`);
    const clientesYPolizas = await response.json();
    return clientesYPolizas;
}

// Render clients and their policies in the HTML page
function renderClientesYPolizas(clientesYPolizas) {
    const clientesPolizasDiv = document.getElementById('clientes-polizas');
    clientesPolizasDiv.innerHTML = '';  // Clear the div

    // Create a table for all clients and their policies
    const clientesPolizasTable = document.createElement('table');
    clientesPolizasTable.className = 'table-auto w-full text-gray-700 divide-y divide-gray-200';

    const tableHead = document.createElement('thead');
    tableHead.className = 'bg-blue-900 text-white';
    tableHead.innerHTML = `
    <tr>
      <th class="px-6 py-3 text-xs leading-4 font-medium uppercase tracking-wider">ID Cliente</th>
      <th class="px-6 py-3 text-xs leading-4 font-medium uppercase tracking-wider">Nombre</th>
      <th class="px-6 py-3 text-xs leading-4 font-medium uppercase tracking-wider">Pólizas</th>
    </tr>
  `;

    const tableBody = document.createElement('tbody');
    tableBody.className = 'bg-white divide-y divide-gray-200';

    // Iterate over all clients
    for (let i = 0; i < clientesYPolizas.length; i++) {
        const cliente = clientesYPolizas[i];
        const clienteRow = document.createElement('tr');

        const idClienteCell = document.createElement('td');
        idClienteCell.className = 'px-6 py-4 whitespace-no-wrap';
        idClienteCell.textContent = cliente.cedula;
        clienteRow.appendChild(idClienteCell);

        const nombreClienteCell = document.createElement('td');
        nombreClienteCell.className = 'px-6 py-4 whitespace-no-wrap';
        nombreClienteCell.textContent = cliente.nombre;
        clienteRow.appendChild(nombreClienteCell);

        const polizasCell = document.createElement('td');
        polizasCell.className = 'px-6 py-4';

        const polizasTable = document.createElement('table');
        polizasTable.className = 'table-auto w-full text-gray-700 divide-y divide-gray-200';

        const polizasTableHead = document.createElement('thead');
        polizasTableHead.className = 'bg-blue-800 text-white';
        polizasTableHead.innerHTML = `
      <tr>
        <th class="px-3 py-2 text-xs leading-4 font-medium uppercase tracking-wider">ID Póliza</th>
        <th class="px-3 py-2 text-xs leading-4 font-medium uppercase tracking-wider">Placa</th>
        <th class="px-3 py-2 text-xs leading-4 font-medium uppercase tracking-wider">Fecha Inicio</th>
        <th class="px-3 py-2 text-xs leading-4 font-medium uppercase tracking-wider">Plazo de Pago</th>
        <th class="px-3 py-2 text-xs leading-4 font-medium uppercase tracking-wider">Auto</th>
        <th class="px-3 py-2 text-xs leading-4 font-medium uppercase tracking-wider">Año</th>
        <th class="px-3 py-2 text-xs leading-4 font-medium uppercase tracking-wider">Costo Total</th>
      </tr>
    `;

        const polizasTableBody = document.createElement('tbody');
        polizasTableBody.className = 'bg-white divide-y divide-gray-200';

        // Iterate over polizas of each client
        for (const poliza of cliente.polizas) {
            const polizaRow = document.createElement('tr');
            const idPolizaCell = document.createElement('td');
            idPolizaCell.className = 'px-3 py-2 whitespace-no-wrap';
            idPolizaCell.textContent = poliza.idPoliza;
            polizaRow.appendChild(idPolizaCell);

            const placaCell = document.createElement('td');
            placaCell.className = 'px-3 py-2 whitespace-no-wrap';
            placaCell.textContent = poliza.placa;
            polizaRow.appendChild(placaCell);

            const fechaInicioCell = document.createElement('td');
            fechaInicioCell.className = 'px-3 py-2 whitespace-no-wrap';
            fechaInicioCell.textContent = poliza.fechaInicio;
            polizaRow.appendChild(fechaInicioCell);

            const plazoPagoCell = document.createElement('td');
            plazoPagoCell.className = 'px-3 py-2 whitespace-no-wrap';
            plazoPagoCell.textContent = poliza.plazoPago;
            polizaRow.appendChild(plazoPagoCell);

            const autoCell = document.createElement('td');
            autoCell.className = 'px-3 py-2 whitespace-no-wrap';
            autoCell.textContent = poliza.auto;
            polizaRow.appendChild(autoCell);

            const annioCell = document.createElement('td');
            annioCell.className = 'px-3 py-2 whitespace-no-wrap';
            annioCell.textContent = poliza.annio;
            polizaRow.appendChild(annioCell);

            const costoTotalCell = document.createElement('td');
            costoTotalCell.className = 'px-3 py-2 whitespace-no-wrap';
            costoTotalCell.textContent = `₡${poliza.costoTotal}`;
            polizaRow.appendChild(costoTotalCell);

            polizasTableBody.appendChild(polizaRow);
        }

        polizasTable.appendChild(polizasTableHead);
        polizasTable.appendChild(polizasTableBody);
        polizasCell.appendChild(polizasTable);

        clienteRow.appendChild(polizasCell);
        tableBody.appendChild(clienteRow);

        // Apply styling to differentiate between clients
        if (i % 2 === 0) {
            clienteRow.classList.add('bg-gray-200');
        } else {
            clienteRow.classList.add('bg-gray-100');
        }
    }

    clientesPolizasTable.appendChild(tableHead);
    clientesPolizasTable.appendChild(tableBody);
    clientesPolizasDiv.appendChild(clientesPolizasTable);
}

// Fetch and render clients when the page is loaded
document.addEventListener('DOMContentLoaded', (event) => {
    fetchClientesYPolizas().then(renderClientesYPolizas);
});





async function fetchCategorias() {
    const response = await fetch(`${backend}/administrador/obtenerCategorias`);
    const categorias = await response.json();
    return categorias;
}

// Render categories and their coverages in the HTML page
function renderCategorias(categorias) {
    const categoriasDiv = document.getElementById('categorias-coberturas');
    categoriasDiv.innerHTML = '';  // Clear the div

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
    categoriasDiv.appendChild(categoriasTable);
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


}

// Asignar los eventos de envío de formulario
document.getElementById('cobertura-form').addEventListener('submit', enviarFormularioCategoria);
document.getElementById('categoria-form').addEventListener('submit', enviarFormularioCobertura);


// Función para obtener las categorías del backend y generar las opciones en el formulario de cobertura
async function obtenerCategorias() {
    try {
        const response = await fetch(`${backend}/administrador/obtenerCategorias`);

        if (response.ok) {
            const categorias = await response.json();

            const selectCategoria = document.getElementById('cobertura-categoria');

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




async function fetchMarcas() {
    const response = await fetch(`${backend}/administrador/obtenerMarcas`);
    const marcas = await response.json();

    const marcasDiv = document.getElementById('marcas-modelos');
    marcasDiv.innerHTML = '';

    const marcaTable = document.createElement('table');
    marcaTable.className = 'table-auto w-full text-gray-700 divide-y divide-gray-200';

    const marcaTableHead = document.createElement('thead');
    marcaTableHead.className = 'bg-blue-900 text-white';
    marcaTableHead.innerHTML = `
    <tr>
      <th class="px-6 py-3 text-xs leading-4 font-medium uppercase tracking-wider">ID Marca</th>
      <th class="px-6 py-3 text-xs leading-4 font-medium uppercase tracking-wider">Nombre</th>
      <th class="px-6 py-3 text-xs leading-4 font-medium uppercase tracking-wider">Modelos específicos</th>
    </tr>
  `;
    marcaTable.appendChild(marcaTableHead);

    const marcaTableBody = document.createElement('tbody');
    marcaTableBody.className = 'bg-white divide-y divide-gray-200';

    for (let i = 0; i < marcas.length; i++) {
        const marca = marcas[i];

        const marcaTableRow = document.createElement('tr');
        marcaTableRow.className = i % 2 === 0 ? 'bg-gray-100' : ''; // Change row background color

        const marcaIdCell = document.createElement('td');
        marcaIdCell.className = 'px-6 py-4 whitespace-no-wrap';
        marcaIdCell.textContent = marca.id;
        marcaTableRow.appendChild(marcaIdCell);

        const marcaNombreCell = document.createElement('td');
        marcaNombreCell.className = 'px-6 py-4 whitespace-no-wrap';
        marcaNombreCell.textContent = marca.nombre;
        marcaTableRow.appendChild(marcaNombreCell);

        const modelosTable = document.createElement('table');
        modelosTable.className = 'table-auto w-full text-gray-700 divide-y divide-gray-200';

        const modelosTableHead = document.createElement('thead');
        modelosTableHead.className = 'bg-blue-800 text-white';
        modelosTableHead.innerHTML = `
      <tr>
        <th class="px-3 py-2 text-xs leading-4 font-medium uppercase tracking-wider">ID Modelo</th>
        <th class="px-3 py-2 text-xs leading-4 font-medium uppercase tracking-wider">Nombre</th>
        <th class="px-3 py-2 text-xs leading-4 font-medium uppercase tracking-wider">Imagen</th>
      </tr>
    `;
        modelosTable.appendChild(modelosTableHead);

        const modelosTableBody = document.createElement('tbody');
        modelosTableBody.className = 'bg-white divide-y divide-gray-200';

        for (const modelo of marca.modelos) {
            const modeloTableRow = document.createElement('tr');
            modeloTableRow.innerHTML = `
        <td class="px-3 py-2 whitespace-no-wrap">${modelo.id}</td>
        <td class="px-3 py-2 whitespace-no-wrap">${modelo.nombre}</td>
        <td class="px-3 py-2 whitespace-no-wrap"><img class="imagen" src="${backend}/administrador/${modelo.id}/imagen" style="width: 50px; height: 50px;"></td>
      `;
            modelosTableBody.appendChild(modeloTableRow);
        }

        modelosTable.appendChild(modelosTableBody);

        const modelosTableCell = document.createElement('td');
        modelosTableCell.className = 'px-6 py-4';
        modelosTableCell.appendChild(modelosTable);
        marcaTableRow.appendChild(modelosTableCell);

        marcaTableBody.appendChild(marcaTableRow);
    }

    marcaTable.appendChild(marcaTableBody);

    marcasDiv.appendChild(marcaTable);
    renderMarcas();
}

document.addEventListener('DOMContentLoaded', (event) => {
    fetchMarcas();
});



// Función para enviar el formulario de agregar marca
async function enviarFormularioMarca(event) {
    event.preventDefault();

    const nombreMarca = document.getElementById('marca-nombre').value;

    const nuevaMarca = {
        nombre: nombreMarca,
    };

    try {

        const response = await fetch(`${backend}/administrador/agregarMarca`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevaMarca),
        });

        if (response.ok) {
            // El formulario se envió exitosamente, puedes realizar alguna acción adicional si deseas
            console.log('Formulario de marca enviado exitosamente');
        } else {
            // El formulario no se pudo enviar correctamente, puedes manejar el error de acuerdo a tus necesidades
            console.error('Error al enviar el formulario de marca');
        }
    } catch (error) {
        console.error('Error al enviar el formulario de marca:', error);
    }

    // Vuelve a obtener y renderizar las marcas después de enviar el formulario
    await fetchMarcas();
    renderMarcas();
}

// Función para enviar el formulario de agregar modelo
async function enviarFormularioModelo(event) {
    event.preventDefault();

    const marca = document.getElementById('modelo-marca').value;
    const nombreModelo = document.getElementById('modelo-nombre').value;
    //const imagenModelo = document.getElementById('modelo-imagen').value;
    const imagenModelo = document.getElementById('modelo-imagen').files[0];

    const nuevoModelo = {
        nombre: nombreModelo,
    };

    try {

        const response = await fetch(`${backend}/administrador/agregarModelo?marca=${marca}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevoModelo),
        });


        if (response.ok) {
            // El formulario se envió exitosamente, puedes realizar alguna acción adicional si deseas
            console.log('Formulario de modelo enviado exitosamente');
        } else {
            // El formulario no se pudo enviar correctamente, puedes manejar el error de acuerdo a tus necesidades
            console.error('Error al enviar el formulario de modelo');
        }
    } catch (error) {
        console.error('Error al enviar el formulario de modelo:', error);
    }

    // Obtener el nombre y la imagen del formulario


// Crear un objeto FormData y agregar los datos
    const formData = new FormData();
    formData.append('flag', imagenModelo);

// Realizar la solicitud POST utilizando fetch
    fetch(`${backend}/${marca}/flag`, {
        method: 'POST',
        body: formData
    })
            .then(response => {
                if (response.ok) {
                    // La imagen se cargó exitosamente
                    console.log('Imagen cargada exitosamente');
                } else {
                    // Error al cargar la imagen
                    console.error('Error al cargar la imagen');
                }
            })
            .catch(error => {
                console.error('Error al cargar la imagen:', error);
            });


    // Vuelve a obtener y renderizar las marcas después de enviar el formulario
    await fetchMarcas();
    renderMarcas();
}

// Asignar los eventos de envío de formulario
document.getElementById('marca-form').addEventListener('submit', enviarFormularioMarca);
document.getElementById('modelo-form').addEventListener('submit', enviarFormularioModelo);


// Función para obtener las marcas del backend y generar las opciones en el formulario de modelos
async function obtenerMarcas() {
    try {
        const response = await fetch(`${backend}/administrador/obtenerMarcas`);

        if (response.ok) {
            const marcas = await response.json();

            const selectMarca = document.getElementById('modelo-marca');

            for (const marca of marcas) {
                const option = document.createElement('option');
                option.value = marca.id;
                option.text = marca.nombre;
                selectMarca.appendChild(option);
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





