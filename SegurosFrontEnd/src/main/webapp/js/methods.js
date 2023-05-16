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
    clave: '',
    nombre: '',
    telefono: '',
    correo: '',
    datos_tarjeta: '',
    tipo: ''
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
        tipo: 1
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
            switch (userGlobal.tipo) {
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

document.addEventListener('DOMContentLoaded', () => {
    /*const polizas = <%= new Gson().toJson(polizas) %>; // Obtener los datos de las polizas desde el backend (reemplaza esta línea)
     
     const tableBody = document.getElementById('polizasTableBody');
     let tableHtml = '';
     polizas.forEach(poliza => {
     tableHtml += `
     <tr>
     <td class="border border-gray-300 px-4 py-2">${poliza.numero}</td>
     <td class="border border-gray-300 px-4 py-2">${poliza.placa}</td>
     <td class="border border-gray-300 px-4 py-2">${poliza.fecha}</td>
     <td class="border border-gray-300 px-4 py-2">${poliza.auto}</td>
     <td class="border border-gray-300 px-4 py-2"><img src="presentation/cliente/poliza/getImagen?id=${poliza.id}" alt="${poliza.id}" style="width: 50px; height: 50px;"></td>
     <td class="border border-gray-300 px-4 py-2">₡${poliza.valor}</td>
     </tr>
     `;
     });
     
     tableBody.innerHTML = tableHtml;*/
});
// Función para obtener los datos del cliente y mostrarlos en los campos de entrada
function obtenerDatosCliente() {
    try {
        document.getElementById('nombreFld').value = userGlobal.nombre;
        document.getElementById('telefono').value = userGlobal.telefono;
        document.getElementById('correo').value = userGlobal.correo;
        document.getElementById('tarjeta').value = userGlobal.datos_tarjeta;
        document.getElementById('clave').value = userGlobal.clave;
    } catch (error) {
        console.error('Error en la solicitud:', error);
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
            telefono: telefono,
            correo: correo,
            datos_tarjeta: tarjeta
        }
    };
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
        setUserData(cliente.usuario);
        obtenerDatosCliente();
    } catch (error) {
        console.error('Error:', error);
    }
}

function loaded() {
    obtenerDatosCliente();
    document.getElementById('login').addEventListener('click', e => login());
    document.getElementById('registrar').addEventListener('click', e => registrar());
}

document.addEventListener("DOMContentLoaded", loaded);