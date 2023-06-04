
document.addEventListener('DOMContentLoaded', (event) => {
    fetchMarcas().then(renderMarcas);
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
            Swal.fire({
                icon: 'success',
                title: '¡Marca agregada exitosamente!',
                text: '',
                showConfirmButton: false,
                timer: 2000 // El alert se cerrará automáticamente después de 2 segundos
            });
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
    fetchMarcas().then(renderMarcas);
    obtenerMarcas();
    document.getElementById('marca-nombre').value = '';
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
            Swal.fire({
                icon: 'success',
                title: '¡Modelo agregado exitosamente!',
                text: '',
                showConfirmButton: false,
                timer: 2000 // El alert se cerrará automáticamente después de 2 segundos
            });
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


    let url = `${backend}/administrador/obtenerIdModelo?marcaId=${marca}`;

    let idModelo = '';
    try {
        const response2 = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevoModelo),
        });

        if (!response2.ok) {
            throw new Error('Network response was not ok');
        } else {
            idModelo = await response2.json(); // Asigna el valor devuelto a la variable idModelo
        }
    } catch (error) {
        console.error('Error:', error);
    }
    ;


// Crear un objeto FormData y agregar los datos
    const formData = new FormData();
    formData.append('flag', imagenModelo);

    try {
// Realizar la solicitud POST utilizando fetch
        const response3 = await fetch(`${backend}/administrador/${idModelo}/flag`, {
            method: 'POST',
            body: formData
        });
        if (response3.ok) {
            // La imagen se cargó exitosamente
            console.log('Imagen cargada exitosamente');
        } else {
            // Error al cargar la imagen
            console.error('Error al cargar la imagen');
        }
    } catch (error) {
        console.error('Error al cargar la imagen:', error);
    }
    ;


    // Vuelve a obtener y renderizar las marcas después de enviar el formulario
    fetchMarcas().then(renderMarcas);
    document.getElementById('modelo-marca').value = '';
    document.getElementById('modelo-nombre').value = '';
    document.getElementById('modelo-imagen').files[0];
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

async function fetchMarcas() {
    const response = await fetch(`${backend}/administrador/obtenerMarcas`);
    const marcas = await response.json();
    return marcas;
}

function renderMarcas(marcas) {
    const marcasDiv = document.getElementById('marcas-modelos');
    marcasDiv.innerHTML = '';

    // Add a div to hold the table with scrolling ability
    const scrollableDiv = document.createElement('div');
    scrollableDiv.style.width = '100%';  // Adjust as needed
    scrollableDiv.style.height = '500px';  // Adjust as needed
    scrollableDiv.style.overflow = 'auto';  // Enable scrolling when necessary

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

    // Add the table to the scrollable div
    scrollableDiv.appendChild(marcaTable);

    marcasDiv.appendChild(scrollableDiv);
}
;

