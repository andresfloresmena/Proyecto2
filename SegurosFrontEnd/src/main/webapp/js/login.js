let backend = "http://localhost:8080/SegurosBackEnd/api";

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

    let request = new Request(`${backend}/login`, {
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

function loaded() {
    document.getElementById('registrar').addEventListener('click', e => registrar());
}

document.addEventListener("DOMContentLoaded", loaded); 