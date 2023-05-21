let backend = "http://localhost:8080/SegurosBackEnd/api";
function getUserData() {
    let userData = localStorage.getItem('user');
    if (userData) {
        return JSON.parse(userData);
    }
    return null;
}

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
            setUserData(userGlobal);
            // Verificar el tipo de usuario y realizar alguna acción correspondiente
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
                    console.error('Tipo de usuario no válido');
            }
        } else {
            // Autenticación fallida, mostrar algún mensaje de error
            console.error('Error en el inicio de sesión');
        }

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

            userGlobal.polizas.forEach(poliza => {
                tableHtml += `
                <tr>
                    <td class="border border-gray-300 px-4 py-2">${poliza.idPoliza}</td>
                    <td class="border border-gray-300 px-4 py-2">${poliza.placa}</td>
                    <td class="border border-gray-300 px-4 py-2">${poliza.fechaInicio}</td>
                    <td class="border border-gray-300 px-4 py-2">${poliza.auto}</td>
                    <td class="border border-gray-300 px-4 py-2"><img src="presentation/cliente/poliza/getImagen?id=${poliza.idPoliza}" alt="${poliza.idPoliza}" style="width: 50px; height: 50px;"></td>
                    <td class="border border-gray-300 px-4 py-2">₡${poliza.costoTotal}</td>
                </tr>
            `;
            });

            tableBody.innerHTML = tableHtml;
        } else {
            // Error en la respuesta del servidor
            console.error('Error al obtener las pólizas:', response.status);
        }
    } catch (error) {
        // Error en la solicitud o en la lógica de obtener las pólizas
        console.error('Error al obtener las pólizas:', error);
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
    const datosElement = document.getElementById('datosElement');
    const polizasElement = document.getElementById('polizasElement');
    const logoutElement = document.getElementById('logoutElement');
    const loginElement = document.getElementById('loginElement');


    if (userGlobal.nombre === '') {
        datosElement.style.display = 'none'; // Ocultar el elemento de datos
        polizasElement.style.display = 'none'; // Ocultar el elemento de polizas
        logoutElement.style.display = 'none';
    } else {
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
    ocultarElementosHeader();
}

document.addEventListener("DOMContentLoaded", loaded);
document.addEventListener('DOMContentLoaded', obtenerDatosCliente);
document.addEventListener('DOMContentLoaded', obtenerPolizas);
