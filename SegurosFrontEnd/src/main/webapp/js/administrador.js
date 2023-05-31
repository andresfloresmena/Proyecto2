
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

        // Create a table for each client and their policies
        clienteDiv.innerHTML = `
            <table class="table-auto">
                <thead>
                    <tr>
                        <th>ID Cliente</th>
                        <th>Nombre</th>
                        <th>Pólizas</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${cliente.id}</td>
                        <td>${cliente.nombre}</td>
                        <td>
                            <table class="table-auto">
                                <thead>
                                    <tr>
                                        <th>ID Póliza</th>
                                        <th>Placa</th>
                                        <th>Fecha Inicio</th>
                                        <th>Plazo de Pago</th>
                                        <th>Auto</th>
                                        <th>Año</th>
                                        <th>Costo Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${cliente.polizas.map(poliza => `
                                        <tr>
                                            <td>${poliza.id}</td>
                                            <td>${poliza.placa}</td>
                                            <td>${poliza.fechaInicio}</td>
                                            <td>${poliza.plazoPago}</td>
                                            <td>${poliza.auto}</td>
                                            <td>${poliza.annio}</td>
                                            <td>₡${poliza.costoTotal}</td>
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

// Render clients and their policies in the HTML page
function renderCategorias(categorias) {
    
    const categoriasDiv = document.getElementById('categorias-coberturas');
    categoriasDiv.innerHTML = '';  // Clear the div

    // Iterate over all categories
    for (const categoria of categorias) {
        const categoriaDiv = document.createElement('div');

        // Create a table for each category and their coverages
        categoriaDiv.innerHTML = `
            <table class="table-auto">
                <thead>
                    <tr>
                        <th>ID Categoría</th>
                        <th>Descripción</th>
                        <th>Coberturas específicas</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${categoria.id}</td>
                        <td>${categoria.descripcion}</td>
                        <td>
                            <table class="table-auto">
                                <thead>
                                    <tr>
                                        <th>ID Cobertura</th>
                                        <th>Descripción</th>
                                        <th>Costo mínimo</th>
                                        <th>Costo porcentual</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${categoria.coberturas.map(cobertura => `
                                        <tr>
                                            <td>${cobertura.id}</td>
                                            <td>${cobertura.descripcion}</td>
                                            <td>₡${cobertura.costoMinimo}</td>
                                            <td>${cobertura.costoPorcentual}%</td>
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

// Fetch and render clients when the page is loaded
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

        marcaDiv.innerHTML = `
            <table class="table-auto">
                <thead>
                    <tr>
                        <th>ID Marca</th>
                        <th>Nombre</th>
                        <th>Modelos específicos</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${marca.id}</td>
                        <td>${marca.nombre}</td>
                        <td>
                            <table class="table-auto">
                                <thead>
                                    <tr>
                                        <th>ID Modelo</th>
                                        <th>Nombre</th>
                                        <th>Imagen</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${marca.modelos.map(modelo => `
                                        <tr>
                                            <td>${modelo.id}</td>
                                            <td>${modelo.nombre}</td>
                                            <td><<img class="imagen" src="${backend}/administrador/${poliza.idPoliza}/imagen" style="width: 50px; height: 50px;"></td>
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






