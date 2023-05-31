
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

    // Iterate over all clients
    for (const cliente of clientesYPolizas) {
        const clienteDiv = document.createElement('div');
        clienteDiv.className = 'mb-4 bg-gray-200 p-4 rounded shadow'; // Add background and spacing to differentiate

        // Create a table for each client and their policies
        clienteDiv.innerHTML = `
            <table class="table-auto w-full text-gray-700 divide-y divide-gray-200">
                <thead class="bg-blue-300 text-white">
                    <tr>
                        <th class="px-6 py-3 text-xs leading-4 font-medium uppercase tracking-wider">ID Cliente</th>
                        <th class="px-6 py-3 text-xs leading-4 font-medium uppercase tracking-wider">Nombre</th>
                        <th class="px-6 py-3 text-xs leading-4 font-medium uppercase tracking-wider">Pólizas</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <tr>
                        <td class="px-6 py-4 whitespace-no-wrap">${cliente.cedula}</td>
                        <td class="px-6 py-4 whitespace-no-wrap">${cliente.nombre}</td>
                        <td class="px-6 py-4">
                            <table class="table-auto w-full text-gray-700 divide-y divide-gray-200">
                                <thead class="bg-blue-200 text-white">
                                    <tr>
                                        <th class="px-3 py-2 text-xs leading-4 font-medium uppercase tracking-wider">ID Póliza</th>
                                        <th class="px-3 py-2 text-xs leading-4 font-medium uppercase tracking-wider">Placa</th>
                                        <th class="px-3 py-2 text-xs leading-4 font-medium uppercase tracking-wider">Fecha Inicio</th>
                                        <th class="px-3 py-2 text-xs leading-4 font-medium uppercase tracking-wider">Plazo de Pago</th>
                                        <th class="px-3 py-2 text-xs leading-4 font-medium uppercase tracking-wider">Auto</th>
                                        <th class="px-3 py-2 text-xs leading-4 font-medium uppercase tracking-wider">Año</th>
                                        <th class="px-3 py-2 text-xs leading-4 font-medium uppercase tracking-wider">Costo Total</th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white divide-y divide-gray-200">
                                    ${cliente.polizas.map(poliza => `
                                        <tr>
                                            <td class="px-3 py-2 whitespace-no-wrap">${poliza.idPoliza}</td>
                                            <td class="px-3 py-2 whitespace-no-wrap">${poliza.placa}</td>
                                            <td class="px-3 py-2 whitespace-no-wrap">${poliza.fechaInicio}</td>
                                            <td class="px-3 py-2 whitespace-no-wrap">${poliza.plazoPago}</td>
                                            <td class="px-3 py-2 whitespace-no-wrap">${poliza.auto}</td>
                                            <td class="px-3 py-2 whitespace-no-wrap">${poliza.annio}</td>
                                            <td class="px-3 py-2 whitespace-no-wrap">₡${poliza.costoTotal}</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        `;
        clientesPolizasDiv.appendChild(clienteDiv);
    }
}

// Fetch and render clients when the page is loaded
document.addEventListener('DOMContentLoaded', (event) => {
    fetchClientesYPolizas().then(renderClientesYPolizas);
});


// Categorias y Coberturas
// 
async function agregarCategoria(descripcion) {
    const response = await fetch(`${backend}/administrador/agregarCategoria`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ descripcion })
    });

    // Asegúrate de manejar correctamente la respuesta.
}

async function agregarCobertura(idCategoria, nombreCobertura, costoMinimo, costoPorcentual) {
    const response = await fetch(`${backend}/administrador/agregarCobertura`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            categoria: { id: idCategoria },
            nombre: nombreCobertura, 
            costoMinimo, 
            costoPorcentual 
        }),
    });

    // Asegúrate de manejar correctamente la respuesta.
}
async function fetchCategorias() {
    const response = await fetch(`${backend}/administrador/obtenerCategorias`);
    const categorias = await response.json();
    return categorias;
}

// Render categories and their coverages in the HTML page
function renderCategorias(categorias) {
    
    const categoriasDiv = document.getElementById('categorias-coberturas');
    categoriasDiv.innerHTML = '';  // Clear the div

    // Iterate over all categories
    for (const categoria of categorias) {
        const categoriaDiv = document.createElement('div');
        categoriaDiv.className = 'mb-4 bg-gray-200 p-4 rounded shadow'; // Add background and spacing to differentiate

        // Create a table for each category and their coverages
        categoriaDiv.innerHTML = `
            <table class="table-auto w-full text-gray-700 divide-y divide-gray-200">
                <thead class="bg-blue-300 text-white">
                    <tr>
                        <th class="px-6 py-3 text-xs leading-4 font-medium uppercase tracking-wider">ID Categoría</th>
                        <th class="px-6 py-3 text-xs leading-4 font-medium uppercase tracking-wider">Descripción</th>
                        <th class="px-6 py-3 text-xs leading-4 font-medium uppercase tracking-wider">Coberturas específicas</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <tr>
                        <td class="px-6 py-4 whitespace-no-wrap">${categoria.id}</td>
                        <td class="px-6 py-4 whitespace-no-wrap">${categoria.descripcion}</td>
                        <td class="px-6 py-4">
                            <table class="table-auto w-full text-gray-700 divide-y divide-gray-200">
                                <thead class="bg-blue-200 text-white">
                                    <tr>
                                        <th class="px-3 py-2 text-xs leading-4 font-medium uppercase tracking-wider">ID Cobertura</th>
                                        <th class="px-3 py-2 text-xs leading-4 font-medium uppercase tracking-wider">Descripción</th>
                                        <th class="px-3 py-2 text-xs leading-4 font-medium uppercase tracking-wider">Costo mínimo</th>
                                        <th class="px-3 py-2 text-xs leading-4 font-medium uppercase tracking-wider">Costo porcentual</th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white divide-y divide-gray-200">
                                    ${categoria.coberturas.map(cobertura => `
                                        <tr>
                                            <td class="px-3 py-2 whitespace-no-wrap">${cobertura.id}</td>
                                            <td class="px-3 py-2 whitespace-no-wrap">${cobertura.descripcion}</td>
                                            <td class="px-3 py-2 whitespace-no-wrap">₡${cobertura.costoMinimo}</td>
                                            <td class="px-3 py-2 whitespace-no-wrap">${cobertura.costoPorcentual}%</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        `;
        categoriasDiv.appendChild(categoriaDiv);
    }
}

// Fetch and render categories when the page is loaded
document.addEventListener('DOMContentLoaded', (event) => {
    fetchCategorias().then(renderCategorias );
});




async function fetchMarcas() {
    const response = await fetch(`${backend}/administrador/obtenerMarcas`);
    const marcas = await response.json();

    const marcasDiv = document.getElementById('marcas-modelos');
    marcasDiv.innerHTML = '';

    for (const marca of marcas) {
        const marcaDiv = document.createElement('div');
        marcaDiv.className = 'mb-4 bg-gray-200 p-4 rounded shadow'; // Add background and spacing to differentiate

        marcaDiv.innerHTML = `
            <table class="table-auto w-full text-gray-700 divide-y divide-gray-200">
                <thead class="bg-blue-300 text-white">
                    <tr>
                        <th class="px-6 py-3 text-xs leading-4 font-medium uppercase tracking-wider">ID Marca</th>
                        <th class="px-6 py-3 text-xs leading-4 font-medium uppercase tracking-wider">Nombre</th>
                        <th class="px-6 py-3 text-xs leading-4 font-medium uppercase tracking-wider">Modelos específicos</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <tr>
                        <td class="px-6 py-4 whitespace-no-wrap">${marca.id}</td>
                        <td class="px-6 py-4 whitespace-no-wrap">${marca.nombre}</td>
                        <td class="px-6 py-4">
                            <table class="table-auto w-full text-gray-700 divide-y divide-gray-200">
                                <thead class="bg-blue-200 text-white">
                                    <tr>
                                        <th class="px-3 py-2 text-xs leading-4 font-medium uppercase tracking-wider">ID Modelo</th>
                                        <th class="px-3 py-2 text-xs leading-4 font-medium uppercase tracking-wider">Nombre</th>
                                        <th class="px-3 py-2 text-xs leading-4 font-medium uppercase tracking-wider">Imagen</th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white divide-y divide-gray-200">
                                    ${marca.modelos.map(modelo => `
                                        <tr>
                                            <td class="px-3 py-2 whitespace-no-wrap">${modelo.id}</td>
                                            <td class="px-3 py-2 whitespace-no-wrap">${modelo.nombre}</td>
                                            <td class="px-3 py-2 whitespace-no-wrap"><img class="imagen" src="${backend}/administrador/${modelo.id}/imagen" style="width: 50px; height: 50px;"></td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        `;
        marcasDiv.appendChild(marcaDiv);
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    fetchMarcas();
});



async function agregarMarca(nombreMarca) {
    const response = await fetch(`${backend}/administrador/agregarMarca`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombreMarca })
    });
    // Manejar la respuesta
}

async function agregarModelo(idMarca, nombreModelo, imagen) {
    const responseModelo = await fetch(`${backend}/administrador/agregarModelo`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            marca: { id: idMarca },
            nombre: nombreModelo, 
        }),
    });

    // Comprueba que la respuesta fue exitosa antes de continuar
    if (!responseModelo.ok) {
        // Manejar error
        return;
    }

    // La imagen debe ser un objeto File o Blob
    const formData = new FormData();
    formData.append('flag', imagen);

    const responseImagen = await fetch(`${backend}/administrador/${nombreModelo}/flag`, {
        method: 'POST',
        body: formData,
    });

    if (!responseImagen.ok) {
        // Manejar error
    }

    // Manejar la respuesta
}






