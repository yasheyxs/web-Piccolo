document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');

  const logoutButton = document.querySelector('.navbar'); // Assuming .navbar is the parent container of the logout button

  function redirectToLogin() {
      window.location.href = '../html/loginregister.html';
  }

  navbar.addEventListener('click', (event) => {
      if (event.target.id === 'logout-button') {
          // Handle the logout button click
          redirectToLogin();
      }
  });

  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');

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

  // Función para el stepper
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
});