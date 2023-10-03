// Espera a que se cargue el contenido del documento
document.addEventListener('DOMContentLoaded', () => {
  // almacena el #menu-bar en la variable menu. Se repite algo similar debajo
  const menu = document.querySelector('#menu-bar');
  const navbar = document.querySelector('.navbar');
  const dropdown = document.querySelector('.dropdown');
  const dropdownContent = document.querySelector('.dropdown-content');

  // manejador de eventos para el click en el elemento menu
  menu.onclick = () => {
    // Alterna fa-times. fa-times es parte de Font Awesome, un simbolo de X
    menu.classList.toggle('fa-times');
    // para mostrar y ocultar la navbar
    navbar.classList.toggle('active');
  };

  // manejador de eventos para el click en el elemento dropdown
  dropdown.onclick = () => {
    // para mostrar y ocultar el menú desplegable
    dropdownContent.classList.toggle('show');
  };
});
