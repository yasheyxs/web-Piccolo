function handleLogin(event) {
    event.preventDefault();
    window.location.href = '../html/privatehome.html';
}

function handleRegistration(event) {
    event.preventDefault();
    window.location.href = '../html/privatehome.html';
}

document.addEventListener('DOMContentLoaded', () => {
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
});

/*     // Código del carrito
let carrito = [];
function addToCart(productId, quantity) {
    const product = getProductById(productId);
    if (product) {
        const item = {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: quantity || 1,
        };
        const existingItemIndex = carrito.findIndex((item) => item.id === productId);

        if (existingItemIndex !== -1) {
            carrito[existingItemIndex].quantity += quantity || 1;
        } else {
            carrito.push(item);
        }
        updateCartView();
    }
}

function removeFromCart(productId) {
    carrito = carrito.filter((item) => item.id !== productId);
    updateCartView();
}

function getProductById(productId) {
    let product = null;

    data.categories.forEach((category) => {
        const foundProduct = category.products.find((prod) => prod.id === productId);
        if (foundProduct) {
            product = foundProduct;
        }
    });

    return product;
}

function updateCartView() {
    const carritoContainer = document.getElementById('carrito-container');
    carritoContainer.innerHTML = '';

    carrito.forEach((item) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <div>${item.name}</div>
            <div>${item.quantity} x $${item.price}</div>
            <div>Total: $${item.quantity * item.price}</div>
            <button onclick="removeFromCart(${item.id})">Eliminar</button>
        `;
        carritoContainer.appendChild(cartItem);
    });
}

function realizarCompra() {
    console.log('Compra realizada');
    carrito = [];
    updateCartView();
} */