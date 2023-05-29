let backend = "http://localhost:8080/SegurosBackEnd/api";
function getUserData() {
    let userData = localStorage.getItem('user');
    if (userData) {
        return JSON.parse(userData);
    }
    return null;
}
var link = document.createElement("link");
link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css";
link.rel = "stylesheet";

// Luego, añades el elemento <link> al <head> del documento.
document.head.appendChild(link);

// Función para almacenar los datos del usuario en el almacenamiento local
function setUserData(userData) {
    localStorage.setItem('user', JSON.stringify(userData));
}

// Obtener los datos del usuario al cargar la página
let userGlobal = getUserData() || {
    cedula: '',
    nombre: '',
    usuario: {
        cedula: '',
        clave: '',
        nombre: '',
        telefono: '',
        correo: '',
        datos_tarjeta: '',
        tipo: ''
    },
    polizas: []
};

async function registrar() {
    ocultarElementosHeader();
    let id = document.getElementById("id").value;
    let clave = document.getElementById("clave").value;
    let nombre = document.getElementById("nombre").value;
    let telefono = document.getElementById("telefono").value;
    let correo = document.getElementById("correo").value;
    let datos_tarjeta = document.getElementById("tarjeta").value;
    let usuario = {
        cedula: id,
        clave: clave,
        nombre: nombre,
        telefono: telefono,
        correo: correo,
        datos_tarjeta: datos_tarjeta,
        tipo: 1,
        polizas: null
    };
    let cliente = {
        cedula: id,
        nombre: nombre,
        usuario: usuario
    };
    let request = new Request(`${backend}/registrar`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cliente)
    });
    try {
        let response = await fetch(request);
        if (!response.ok) {
            errorMessage(response.status);
            return;
        }
        let data = await response.json();
        console.log('Usuario registrado:', data);
    } catch (error) {
        console.error('Error:', error);
    }
}

async function login() {
    let identificacion = document.getElementById('identificacion').value;
    let clave = document.getElementById('clave').value;
    let usuario = {
        cedula: identificacion,
        clave: clave
    };
    // Realizar la lógica de autenticación o envío de datos al servidor aquí
    try {
        const response = await fetch(`${backend}/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(usuario)
        });

        if (response.ok) {
            userGlobal = await response.json();
            if (userGlobal.cedula !== "000") {
                switch (userGlobal.usuario.tipo) {
                    case 1:
                        const paginaPolizas = '/SegurosFrontEnd/presentation/cliente/polizas/View.html';
                        // Redireccionar a la página correspondiente
                        window.location.href = paginaPolizas;
                        console.log('Inicio de sesión exitoso - Tipo 1');
                        break;
                    case 2:
                        // Acción para tipo de usuario 2
                        console.log('Inicio de sesión exitoso - Tipo 2');
                        break;
                    default:
                }
            } else {
                const identificacionInput = document.getElementById('identificacion');
                const claveInput = document.getElementById('clave');
                const errorMessage = document.createElement('p');

                identificacionInput.classList.add('border-red-500');
                claveInput.classList.add('border-red-500');

                errorMessage.textContent = 'Identificación o clave incorrectos. ¡Inténtelo de nuevo!';
                errorMessage.classList.add('text-red-500', 'text-sm', 'mb-2');

                const form = document.querySelector('form');

    // Agregar evento de escucha de entrada para el input de identificación
                identificacionInput.addEventListener('input', clearErrorMessage);
    // Agregar evento de escucha de entrada para el input de clave
                claveInput.addEventListener('input', clearErrorMessage);

                function clearErrorMessage() {
                    const existingErrorMessage = form.querySelector('p');
                    if (existingErrorMessage) {
                        form.removeChild(existingErrorMessage);
                    }
                }

                form.insertBefore(errorMessage, form.firstChild);
                localStorage.clear();
                userGlobal = {}; // Limpiar los datos en userGlobal
            }
            // Verificar el tipo de usuario y realizar alguna acción correspondiente
            
            
        } else {
            // Autenticación fallida, mostrar algún mensaje de error
            console.error('Error en el inicio de sesión');

            // Agregar clases CSS para resaltar el error

        }
        setUserData(userGlobal);
    } catch (error) {
// Error en la solicitud o en la lógica de autenticación
        console.error('Error en la solicitud:', error);

    }
}

async function obtenerPolizas() {
    try {
        const response = await fetch(`${backend}/polizas`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(userGlobal)
        });

        if (response.ok) {
            userGlobal = await response.json();
            // Aquí puedes realizar las acciones necesarias con los datos de respuesta
            // como actualizar el contenido de la tabla utilizando innerHTML


            const tableBody = document.getElementById('polizasTableBody');
            let tableHtml = '';
            document.getElementById('placa').value = '';

            userGlobal.polizas.forEach(poliza => {
                tableHtml += `
                <tr>
                    
                    <td class="border border-gray-300 px-4 py-2">${poliza.idPoliza}</td>
                    <td class="border border-gray-300 px-4 py-2">${poliza.placa}</td>
                    <td class="border border-gray-300 px-4 py-2">${poliza.fechaInicio}</td>
                    <td class="border border-gray-300 px-4 py-2">${poliza.auto}</td>
                    <td class="border border-gray-300 px-4 py-2"><img class="imagen" src="${backend}/polizas/${poliza.idPoliza}/imagen" style="width: 50px; height: 50px;"></td>
                    <td class="border border-gray-300 px-4 py-2">₡${poliza.costoTotal}</td>
                    <td class="border border-gray-300 px-4 py-2">${poliza.idPoliza}</td>
                    <td class="border border-gray-300 px-4 py-2"> <a href="/SegurosFrontEnd/presentation/cliente/polizas/Detalles.html?idPoliza=${poliza.idPoliza}"><i class="fas fa-eye"></i></a> </td>
                </tr>
            `;
            });

            tableBody.innerHTML = tableHtml;
        } else {
            // Error en la respuesta del servidor
            console.error('Error al obtener las pólizas:', response.status);
        }
        ocultarElementosHeader();
    } catch (error) {
        // Error en la solicitud o en la lógica de obtener las pólizas
        console.error('Error al obtener las pólizas:', error);
    }
}

async function obtenerPolizasPorPlaca(event, placa) {
    event.preventDefault(); // Esta línea evita la acción por defecto
    try {
        const cedula = userGlobal.cedula;

        const response = await fetch(`${backend}/polizas/findPoliza?placa=${encodeURIComponent(placa)}&cedula=${encodeURIComponent(cedula)}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        });

        if (response.ok) {
            const polizas = await response.json();

            const tableBody = document.getElementById('polizasTableBody');
            let tableHtml = '';

            polizas.forEach(poliza => {
                tableHtml += `
                <tr>
                    <td class="border border-gray-300 px-4 py-2">${poliza.idPoliza}</td>
                    <td class="border border-gray-300 px-4 py-2">${poliza.placa}</td>
                    <td class="border border-gray-300 px-4 py-2">${poliza.fechaInicio}</td>
                    <td class="border border-gray-300 px-4 py-2">${poliza.auto}</td>
                    <td class="border border-gray-300 px-4 py-2"><img class="imagen" src="${backend}/polizas/${poliza.idPoliza}/imagen" style="width: 50px; height: 50px;"></td>
                    <td class="border border-gray-300 px-4 py-2">₡${poliza.costoTotal}</td>
                    <td class="border border-gray-300 px-4 py-2">${poliza.idPoliza}</td>
                   <td class="border border-gray-300 px-4 py-2"> <a href="/SegurosFrontEnd/presentation/cliente/polizas/Detalles.html?idPoliza=${poliza.idPoliza}"><i class="fas fa-eye"></i></a> </td>
                </tr>
            `;
            });

            tableBody.innerHTML = tableHtml;
        } else {
            // Error en la respuesta del servidor
            console.error('Error al obtener las pólizas:', response.status);
        }
        ocultarElementosHeader();
    } catch (error) {
        // Error en la solicitud o en la lógica de obtener las pólizas
        console.error('Error al obtener las pólizas:', error);
    }
}

async function obtenerPolizasYCoberturas() {

    const urlParams = new URLSearchParams(window.location.search);
    const idPoliza = urlParams.get('idPoliza');

    try {

        const response = await fetch(`${backend}/polizas/findUnaPoliza?idPoliza=${encodeURIComponent(idPoliza)}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        });

        if (response.ok) {
            const policy = await response.json();
            let policyInfo = document.getElementById('policy-info');
            policyInfo.innerHTML = `
                    <tr>
                        <td class="border px-4 py-2">${policy.cliente.nombre}</td>
                        <td class="border px-4 py-2">${policy.placa}</td>
                        <td class="border px-4 py-2">${policy.plazoPago}</td>
                        <td class="border px-4 py-2">${policy.auto}</td>
                        <td class="border border-gray-300 px-4 py-2"><img class="imagen" src="${backend}/polizas/${policy.idPoliza}/imagen" style="width: 50px; height: 50px;"></td>
                        <td class="border px-4 py-2">${policy.annio}</td>
                        <td class="border px-4 py-2">₡${policy.costoTotal}</td>
                    </tr>
                `;
        } else {
            console.error('Error al obtener la poliza:', response.status);
        }

        const coverageResponse = await fetch(`${backend}/polizas/PolizaCobertura?idPoliza=${encodeURIComponent(idPoliza)}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        });

        if (coverageResponse.ok) {
            const coverages = await coverageResponse.json();
            var coverageInfo = document.getElementById('coverage-info');
            coverages.forEach(function (coverage) {
                coverageInfo.innerHTML += `
                        <tr>
                            <td class="border px-4 py-2">${coverage.descripcion}</td>
                            <td class="border px-4 py-2">₡${coverage.costoMinimo}</td>
                            <td class="border px-4 py-2">${coverage.costoPorcentual}%</td>
                        </tr>
                    `;
            });
        } else {
            console.error('Error al obtener las coberturas:', coverageResponse.status);
        }
        ocultarElementosHeader();
    } catch (error) {
        // Error en la solicitud o en la lógica de obtener las pólizas y coberturas
        console.error('Error al obtener la poliza y las coberturas:', error);
    }


}


// Función para actualizar los datos del cliente
async function actualizarDatosCliente() {
    let nombre = document.getElementById('nombreFld').value;
    let telefono = document.getElementById('telefono').value;
    let correo = document.getElementById('correo').value;
    let tarjeta = document.getElementById('tarjeta').value;
    let clave = document.getElementById('clave').value;
    let cliente = {
        cedula: userGlobal.cedula,
        nombre: nombre,
        usuario: {
            cedula: userGlobal.cedula,
            clave: clave,
            nombre: nombre,
            telefono: telefono,
            correo: correo,
            datos_tarjeta: tarjeta
        }
    };
    setUserData(cliente);
    let request = new Request(`${backend}/actualizarDatosCliente`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cliente)
    });
    try {
        let response = await fetch(request);
        if (!response.ok) {
            errorMessage(response.status);
            return;
        }
        let data = await response.json();
        console.log('Datos del cliente actualizados:', data);
        obtenerDatosCliente();
        ocultarElementosHeader();
    } catch (error) {
        console.error('Error:', error);
    }
}

function obtenerDatosCliente() {
    try {
        document.getElementById('nombreFld').value = userGlobal.nombre;
        document.getElementById('telefono').value = userGlobal.usuario.telefono;
        document.getElementById('correo').value = userGlobal.usuario.correo;
        document.getElementById('tarjeta').value = userGlobal.usuario.datos_tarjeta;
        document.getElementById('clave').value = userGlobal.usuario.clave;
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
}
;

function ocultarElementosHeader() {
    const polizasElement = document.getElementById('polizasElement');
    const datosElement = document.getElementById('datosElement');
    const logoutElement = document.getElementById('logoutElement');
    const loginElement = document.getElementById('loginElement');

    if (!userGlobal || userGlobal.cedula === '') {
        // Si no hay usuario logueado, ocultar elementos del encabezado
        polizasElement.style.display = 'none';
        datosElement.style.display = 'none';
        logoutElement.style.display = 'none';
        loginElement.style.display = 'block';
    } else {
        // Si hay un usuario logueado, ocultar elementos del encabezado
        polizasElement.style.display = 'block';
        datosElement.style.display = 'block';
        logoutElement.style.display = 'block';
        loginElement.style.display = 'none';
    }
}

function logout() {
    localStorage.clear();
    userGlobal = {}; // Limpiar los datos en userGlobal
    ocultarElementosHeader();
}

function loaded() {
    document.getElementById('registrar').addEventListener('click', e => registrar());

}

document.addEventListener("DOMContentLoaded", loaded);
document.addEventListener('DOMContentLoaded', obtenerDatosCliente);
document.addEventListener('DOMContentLoaded', obtenerPolizas);
document.addEventListener('DOMContentLoaded', obtenerPolizasYCoberturas);

const form = document.getElementById('findPolizasForm'); // Asegúrate de reemplazar 'form-id' por el ID de tu formulario
form.addEventListener('submit', (event) => obtenerPolizasPorPlaca(event, form.placa.value));