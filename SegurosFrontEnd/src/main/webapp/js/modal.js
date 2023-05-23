function mostrarModal() {
    // Obtener el div de la ventana modal
    var modal = document.getElementById("modal");
    // Mostrar la ventana modal
    modal.classList.remove("hidden");
    modal.classList.add("block");
}

function closeModal() {
    // Obtener el elemento modal
    const modal = document.getElementById("modal");

    // Ocultar el modal
    modal.classList.add("hidden");
}

const datosBtn = document.getElementById('datosBtn');
  const coberturasBtn = document.getElementById('coberturasBtn');
  const pagoBtn = document.getElementById('pagoBtn');
  const datosContent = document.getElementById('datosContent');
  const coberturasContent = document.getElementById('coberturasContent');
  const pagoContent = document.getElementById('pagoContent');
  const coberturasNextBtn = document.getElementById('coberturasNextBtn');
  const pagoNextBtn = document.getElementById('pagoNextBtn');

  datosBtn.addEventListener('click', () => {
    datosBtn.classList.add('bg-gray-200', 'text-gray-700');
    coberturasBtn.classList.remove('bg-gray-200', 'text-gray-700');
    pagoBtn.classList.remove('bg-gray-200', 'text-gray-700');
    datosContent.classList.remove('hidden');
    coberturasContent.classList.add('hidden');
    pagoContent.classList.add('hidden');
  });

  coberturasBtn.addEventListener('click', () => {
    datosBtn.classList.remove('bg-gray-200', 'text-gray-700');
    coberturasBtn.classList.add('bg-gray-200', 'text-gray-700');
    pagoBtn.classList.remove('bg-gray-200', 'text-gray-700');
    datosContent.classList.add('hidden');
    coberturasContent.classList.remove('hidden');
    pagoContent.classList.add('hidden');
  });

  pagoBtn.addEventListener('click', () => {
    datosBtn.classList.remove('bg-gray-200', 'text-gray-700');
    coberturasBtn.classList.remove('bg-gray-200', 'text-gray-700');
    pagoBtn.classList.add('bg-gray-200', 'text-gray-700');
    datosContent.classList.add('hidden');
    coberturasContent.classList.add('hidden');
    pagoContent.classList.remove('hidden');
  });

  coberturasNextBtn.addEventListener('click', () => {
    datosBtn.classList.remove('bg-gray-200', 'text-gray-700');
    coberturasBtn.classList.remove('bg-gray-200', 'text-gray-700');
    pagoBtn.classList.add('bg-gray-200', 'text-gray-700');
    datosContent.classList.add('hidden');
    coberturasContent.classList.add('hidden');
    pagoContent.classList.remove('hidden');
  });

  pagoNextBtn.addEventListener('click', () => {
    const placaValue = document.getElementById('placa').value;
    const marcaModeloValue = document.getElementById('marcaModelo').value;
    const añoValue = document.getElementById('annio').value;
    const valorValue = document.getElementById('valor').value;
    const modoPagoValue = document.querySelector('input[name="modoPago"]:checked').value;

    const autoElement = document.querySelector('#pagoContent h6.card-subtitle');
    const clienteElement = document.getElementById('clienteValue');
    const fechaInicioElement = document.getElementById('fechaInicioValue');
    const plazoPagoElement = document.getElementById('plazoPagoValue');
    const costoTotalElement = document.getElementById('costoTotalValue');

    autoElement.textContent = placaValue;
    clienteElement.textContent = ""; // Aquí debes obtener el valor del cliente seleccionado
    fechaInicioElement.textContent = ""; // Aquí debes obtener la fecha de inicio
    plazoPagoElement.textContent = ""; // Aquí debes obtener el plazo de pago
    costoTotalElement.textContent = ""; // Aquí debes obtener el costo total

    const coberturasTableBody = document.getElementById('coberturasTableBody');
    coberturasTableBody.innerHTML = ""; // Limpiar las coberturas seleccionadas

    // Aquí debes agregar la lógica para obtener y mostrar las coberturas seleccionadas en la tabla correspondiente

    datosBtn.classList.remove('bg-gray-200', 'text-gray-700');
    coberturasBtn.classList.remove('bg-gray-200', 'text-gray-700');
    pagoBtn.classList.add('bg-gray-200', 'text-gray-700');
    datosContent.classList.add('hidden');
    coberturasContent.classList.add('hidden');
    pagoContent.classList.remove('hidden');
  });