// Elimina el contenido inicial del navbar
const contenedor = document.querySelector('.navbar-container');

// Define una estructura de array de objetos para las rutas del navbar
const menuItems = [
    { text: 'Inicio', path: '../html/privatehome.html' },
    { text: 'Hamburguesas', path: '../html/burger.html' },
    { text: 'Empanadas', path: '../html/empanadas.html' },
    { text: 'Bebidas', path: '../html/bebidas.html' },
    { text: 'Contacto', path: '../html/privatehome.html#contacto' },
    { text: 'Carrito', path: '../html/carrito.html' },
    { text: 'Cerrar sesión', path: '../index.html', id: 'logout-button' }
];

function fillNavbar() {
    const navbar = document.querySelector('.navbar');

    navbar.innerHTML = '';
    menuItems.forEach(item => {
        const listItem = document.createElement('a');
        listItem.href = item.path;
        listItem.textContent = item.text;
        listItem.id = item.id;
        navbar.appendChild(listItem);
    });
}
document.addEventListener('DOMContentLoaded', fillNavbar);