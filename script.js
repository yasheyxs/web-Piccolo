// Espera a que se cargue el contenido del documento
document.addEventListener('DOMContentLoaded', () => {
  // almacena el #menu-bar en la variable menu. Se repite algo similar debajo
  const menu = document.querySelector('#menu-bar');
  const navbar = document.querySelector('.navbar');

  // Manejador de eventos para el click en el elemento menu
  menu.addEventListener('click', () => {
    // Alterna fa-times. fa-times es parte de Font Awesome, un símbolo de X
    menu.classList.toggle('fa-times');
    // para mostrar y ocultar la navbar
    navbar.classList.toggle('active');
  });

  // Manejador de eventos para el click en el elemento dropdown
  //dropdown.addEventListener('click', () => {
    // para mostrar y ocultar el menú desplegable
    //dropdownContent.classList.toggle('show');
  //});

  const logoutButton = document.getElementById('logout-button');
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');

  function redirectToLogin() {
    window.location.href = '../html/loginregister.html';
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();
      var loggedIn = true;

      if (loggedIn) {
        redirectToLogin();
      }
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', (event) => {
      event.preventDefault();
      var registered = true;
      if (registered) {
        redirectToLogin();
      }
    });
  }

  document.getElementById("logout").addEventListener("click", function () {
    window.location.href = "../html/index.html";
  });
});

function stepper(btn) {
  let container = btn.parentElement;
  let input = container.querySelector('input');
  let id = input.getAttribute("id");
  let min = parseInt(input.getAttribute("min"));
  let max = parseInt(input.getAttribute("max"));
  let step = parseInt(input.getAttribute("step"));
  let val = parseInt(input.value);
  let calcStep = (btn.classList.contains("increment")) ? step : -step;
  let newValue = val + calcStep;

  if (newValue >= min && newValue <= max) {
    input.value = newValue; 
  }
}
