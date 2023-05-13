document.addEventListener('DOMContentLoaded', function() {
  // Obtén una referencia al elemento <ul> que contiene los <li> en el header
  var ulElemento = document.querySelector('#header ul');

  // Obtén una referencia a los elementos <li> que deseas ocultar
  var liElementos = ulElemento.querySelectorAll('li');

  // Oculta los elementos que deseas
  liElementos[0].style.display = 'none'; // Oculta el primer elemento <li>
  liElementos[2].style.display = 'none'; // Oculta el tercer elemento <li>
  liElementos[3].style.display = 'none'; // Oculta el tercer elemento <li>
});
