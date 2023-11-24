function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    fetch('../PiccoloWebNew/user.json')
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then(data => {
            const user = data.users.find(u => u.email === email && u.password === password);

            if (user) {
                sessionStorage.setItem('user', JSON.stringify(user));
                window.location.href = '../html/privatehome.html';
            } else {
                console.error('Credenciales incorrectas');
            }
        })
        .catch(error => console.error('Error fetching user data:', error));
}

function isLoggedIn() {
    return sessionStorage.getItem('user') !== null;
}

function handleRegistration(event) {
    event.preventDefault();

    const firstName = document.getElementById('register-firstname').value;
    const lastName = document.getElementById('register-lastname').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const birthdate = document.getElementById('register-birthdate').value;

    const user = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        birthdate: birthdate,
    };
    sessionStorage.setItem('user', JSON.stringify(user));
    window.location.href = '../html/privatehome.html';
}


function handleLogout() {
    sessionStorage.removeItem('user');
    window.location.href = '../html/loginregister.html';
}


document.addEventListener('DOMContentLoaded', () => {
    const productContainers = {
        'productcontainerHambur': 'Hamburguesas',
        'productcontainerBebidas': 'Bebidas',
        'productcontainerEmpa': 'Empanadas'
    };
    Object.entries(productContainers).forEach(([containerId, category]) => {
        renderProducts(containerId, category);
    });
    renderNavbar();
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', addToCart);
    });
    renderCart();
});



function stepper(input, isIncrement) {
    let min = parseInt(input.getAttribute("min"));
    let max = parseInt(input.getAttribute("max"));
    let step = parseInt(input.getAttribute("step"));
    let val = parseInt(input.value);
    let calcStep = isIncrement ? step : -step;
    let newValue = val + calcStep;

    if (newValue >= min && newValue <= max) {
        input.value = newValue;
    }
}

function createCard(product) {
    const card = document.createElement('div');
    card.classList.add('box');
    card.id = `${product.category.toLowerCase()}-${product.id}`;
    card.innerHTML = `
        <span class="price"> $${product.price} </span>
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <a class="btn">Pídela ahora</a>
        <div class="container">
            <button class="decrement" onclick="stepper(document.getElementById('my-input-${product.id}'), false)"> - </button>
            <input type="number" value="0" min="0" max="20" step="1" id="my-input-${product.id}" readonly>
            <button class="increment" onclick="stepper(document.getElementById('my-input-${product.id}'), true)"> + </button>
        </div>
    `;
    return card;
}

function renderProducts(container, category) {
    const productContainer = document.getElementById(container);
    fetch('../PiccoloWebNew/productos.json')
        .then(res => res.json())
        .then(data => {
            const products = data.categories.find(cat => cat.name === category);
            products.products.forEach(product => {
                const card = createCard({ ...product, category });
                productContainer.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching products:', error));
}


function renderNavbar() {
    const navbar = document.querySelector('.navbar');

    if (navbar) {
        navbar.innerHTML = '';
        menuItems.forEach(item => {
            const listItem = document.createElement('a');
            listItem.href = item.path;
            listItem.textContent = item.text;
            listItem.id = item.id;
            navbar.appendChild(listItem);
        });
    } else {
        console.error('Navbar element not found');
    }
}

function addToCart(event) {
    const productId = event.target.parentElement.id.split('-')[1];
    const product = getProductById(productId, data);
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingProductIndex = cart.findIndex(item => item.id === product.id);

    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

function getProductById(productId, data) {
    const allProducts = data.categories.flatMap(category => category.products);
    return allProducts.find(product => product.id === parseInt(productId));
}

function renderCart() {
    const cartContainer = document.getElementById('carrito-container');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartContainer.innerHTML = '';

    cart.forEach(product => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <span class="cart-item-name">${product.name}</span>
            <span class="cart-item-quantity">Cantidad: ${product.quantity}</span>
            <span class="cart-item-price">Precio unitario: $${product.price}</span>
            <span class="cart-item-total">Total: $${product.price * product.quantity}</span>
            <button class="btn-remove" onclick="removeFromCart(${product.id})">Eliminar</button>
        `;
        cartContainer.appendChild(cartItem);
    });
}

function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    renderCart();
}