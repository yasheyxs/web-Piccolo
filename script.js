document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');

    function redirectToLogin() {
        window.location.href = '../html/loginregister.html';
    }

    navbar.addEventListener('click', (event) => {
        if (event.target.id === 'logout-button') {
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

const productContainerHambur = document.getElementById('product-containerHambur');
fetch('../productos.json')
    .then(res => res.json())
    .then(data => {
        const hamburgers = data.categories.find(category => category.name === "Hamburguesas");
        hamburgers.products.forEach(product => {
            const card = document.createElement('div');
            card.classList.add('box');
            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="price">${product.price} </div>
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <button onclick="addToCart(${product.id})">Añadir al carrito</button>
            `;
            productContainerHambur.appendChild(card);
        });
    })
    .catch(error => console.error('Error fetching products:', error));

const productContainerBebidas = document.getElementById('product-containerBebidas');
fetch('../productos.json')
    .then(res => res.json())
    .then(data => {
        const bebidas = data.categories.find(category => category.name === "Bebidas");
        bebidas.products.forEach(product => {
            const card = document.createElement('div');
            card.classList.add('box');
            card.id = `bebida-${product.id}`;
            card.innerHTML = `
                <span class="price"> $${product.price}  </span>
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <a href="#" class="btn">Pídela ahora</a>
                <div class="container">
                    <button class="decrement" onclick="stepper(document.getElementById('my-input-${product.id}'), false)"> - </button>
                    <input type="number" value="0" min="0" max="20" step="1" id="my-input-${product.id}" readonly>
                    <button class="increment" onclick="stepper(document.getElementById('my-input-${product.id}'), true)"> + </button>
                </div>
            `;
            productContainerBebidas.appendChild(card);
        });
    })
    .catch(error => console.error('Error fetching products:', error));

const productContainerEmpa = document.getElementById('product-containerEmpa');
fetch('../productos.json')
    .then(res => res.json())
    .then(data => {
        const empanadas = data.categories.find(category => category.name === "Empanadas");
        empanadas.products.forEach(product => {
            const card = document.createElement('div');
            card.classList.add('box');
            card.id = `empanada-${product.id}`;
            card.innerHTML = `
                <span class="price"> $${product.price}  </span>
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <a href="#" class="btn">Pídela ahora</a>
                <div class="container">
                    <button class="decrement" onclick="stepper(document.getElementById('my-input-${product.id}'), false)"> - </button>
                    <input type="number" value="0" min="0" max="20" step="1" id="my-input-${product.id}" readonly>
                    <button class="increment" onclick="stepper(document.getElementById('my-input-${product.id}'), true)"> + </button>
                </div>
            `;
            productContainerEmpa.appendChild(card);
        });
    })
    .catch(error => console.error('Error fetching products:', error));




function addToCart(productId) {
    // Lógica para agregar productos al carrito
}