let backend = "http://localhost:8080/SegurosBackEnd/api";
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
        if (cliente.usuario.tipo === 1) {
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
    }

    clientesPolizasTable.appendChild(tableHead);
    clientesPolizasTable.appendChild(tableBody);
    clientesPolizasDiv.appendChild(clientesPolizasTable);
}

// Fetch and render clients when the page is loaded
document.addEventListener('DOMContentLoaded', (event) => {
    fetchClientesYPolizas().then(renderClientesYPolizas);
});