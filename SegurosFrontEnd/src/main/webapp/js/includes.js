const header = document.getElementById('header');
const footer = document.getElementById('footer')

fetch('/SegurosFrontEnd/presentation/includes/Header.html')
        .then(response => response.text())
        .then(data =>{
        header.innerHTML = data;
});

fetch('/SegurosFrontEnd/presentation/includes/Footer.html')
        .then(response => response.text())
        .then(data =>{
        footer.innerHTML = data;
});

document.addEventListener('DOMContentLoaded', function() {
  // Obtén una referencia a todos los enlaces
  var enlaces = document.querySelectorAll('a[data-url]');

  // Agrega un controlador de eventos para cada enlace
  enlaces.forEach(function(enlace) {
    enlace.addEventListener('click', function(event) {
      event.preventDefault(); // Evita la redirección predeterminada

      var url = enlace.dataset.url; // Obtiene la URL de destino del atributo data-url
      history.pushState(null, null, url); // Cambia la URL en el historial sin cargar una nueva página
    });
  });
});

