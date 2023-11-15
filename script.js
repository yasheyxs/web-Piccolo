document.addEventListener('DOMContentLoaded', () => {
    fetchProductData();
    const navbar = document.querySelector('.navbar');
    const logoutButton = document.querySelector('.navbar');

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

async function fetchProductData() {
    try {
        const response = await fetch('http://localhost:8080/PiccoloWebNew/productos.json');
        const data = await response.json();
        displayProducts(data.categories);
    } catch (error) {
        console.error('Error fetching product data:', error);
    }
}

function displayProducts(categories) {
    const boxContainer = document.querySelector('.box-container');

    categories.forEach(category => {
        category.products.forEach(product => {
            const box = document.createElement('div');
            box.classList.add('box');
            box.innerHTML = `
                <span class="price">$${product.price}</span>
                <img src="${product.image}" alt="">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <a href="#" class="btn">Pídela ahora</a>
                <div class="container">
                    <button class="decrement" onclick="stepper(document.getElementById('my-input-${product.id}'), false)"> - </button>
                    <input type="number" value="0" min="0" max="20" step="1" id="my-input-${product.id}" readonly>
                    <button class="increment" onclick="stepper(document.getElementById('my-input-${product.id}'), true)"> + </button>
                </div>
            `;
            boxContainer.appendChild(box);
        });
    });
}

function displayProducts(categories) {
    const boxContainer = document.getElementById('product-container');

    categories.forEach(category => {
        category.products.forEach(product => {
            const box = document.createElement('div');
            box.classList.add('box');
            box.innerHTML = `
                <span class="price">$${product.price}</span>
                <img src="${product.image}" alt="">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <a href="#" class="btn">Pídela ahora</a>
                <div class="container">
                    <button class="decrement" onclick="stepper(document.getElementById('my-input-${product.id}'), false)"> - </button>
                    <input type="number" value="0" min="0" max="20" step="1" id="my-input-${product.id}" readonly>
                    <button class="increment" onclick="stepper(document.getElementById('my-input-${product.id}'), true)"> + </button>
                </div>
            `;
            boxContainer.appendChild(box);
        });
    });
}
