const navbar = `<nav class="navbar">
<a href="../html/privatehome.html">Inicio</a>
<a href="../html/productos.html">Productos</a>
<a href="../html/privatehome.html#contacto">Contacto</a>
<a href="../html/index.html" id="logout">Cerrar sesión</a>
</nav>`;

const contenedor = document.getElementById('navbar-container');
contenedor.innerHTML = navbar;