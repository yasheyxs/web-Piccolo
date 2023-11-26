function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    fetch('../user.json')
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

function isLoggedIn() {
    return sessionStorage.getItem('user') !== null;
}

function handleLogout() {
    sessionStorage.removeItem('user');
    window.location.href = '../html/loginregister.html';
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
        <a class="btn" onclick="addToCart(${product.id})">Pídela ahora</a>
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

    if (productContainer) {
        fetch('../productos.json')
            .then(res => res.json())
            .then(data => {
                const products = data.categories.find(cat => cat.name === category);

                if (products) {
                    products.products.forEach(product => {
                        const card = createCard({ ...product, category: category });
                        productContainer.appendChild(card);
                    });
                } else {
                    console.error(`Products not found for category: ${category}`);
                }
            })
            .catch(error => console.error('Error fetching products:', error));
    } else {
        console.error(`Product container with id '${container}' not found`);
    }
}

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

//CARRITO

async function addToCart(productId) {
    const product = await getProductById(productId);
    const quantityInput = document.getElementById(`my-input-${productId}`);
    const quantity = parseInt(quantityInput.value, 10);
    console.log('Quantity:', quantity);

    if (!isNaN(quantity) && quantity > 0 && product) {
        const cartItem = { ...product, quantity };
        addToLocalStorageCart(cartItem);
        showNotification('Tu producto ha sido agregado al carrito de compras');
        setTimeout(() => {
            closeNotification();
        }, 2000);
    } else {
        console.error('Cantidad inválida o producto no encontrado');
    }
}

function showNotification(message) {
    alert(message);
}

function closeNotification() {
    // la ventana emergente se cerrará automáticamente
}

async function getProductById(productId) {
    try {
        const response = await fetch('../productos.json');
        const data = await response.json();
        for (const category of data.categories) {
            const product = category.products.find(p => p.id === productId);
            if (product) {
                return { ...product, category: category.name };
            }
        }
        return null;
    } catch (error) {
        console.error('Error fetching products:', error);
        return null;
    }
}

function addToLocalStorageCart(cartItem) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === cartItem.id);

    if (existingItem) {
        existingItem.quantity += cartItem.quantity;
    } else {
        cart.push(cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartUI() {
    const cartContainer = document.getElementById('carrito-container');
    const realizarCompraBtn = document.getElementById('realizar-compra-btn');
    if (cartContainer && realizarCompraBtn) {
        cartContainer.innerHTML = '';
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        let total = 0;

        for (const item of cart) {
            const cartCard = createCartCard(item);
            cartContainer.appendChild(cartCard);
            total += item.price * item.quantity;
        }

        updateTotal(total);
        
        if (cart.length > 0) {
            realizarCompraBtn.style.display = 'block';
        } else {
            realizarCompraBtn.style.display = 'none';
        }
    } else {
        console.error('Elemento con ID "carrito-container" o "realizar-compra-btn" no encontrado');
    }
}

function createCartCard(cartItem) {
    const cartCard = document.createElement('div');
    cartCard.classList.add('cart-box');
    const imgContainer = document.createElement('div');
    imgContainer.classList.add('cart-img-container');
    imgContainer.innerHTML = `<img src="${cartItem.image}" alt="${cartItem.name}">`;
    const textContainer = document.createElement('div');
    textContainer.classList.add('cart-text-container');
    const totalPrice = !isNaN(cartItem.price) && !isNaN(cartItem.quantity) ? Math.abs(cartItem.price * cartItem.quantity) : 0;
    textContainer.innerHTML = `
        <h3 style="font-size: 2.5rem;">${cartItem.name}</h3>
        <p style="font-size: 2rem;">Cantidad: ${cartItem.quantity}</p>
        <span class="price" style="font-size: 2rem;"> $${totalPrice.toFixed(2)}</span>
        <button class="remove-btn" onclick="removeFromCart(${cartItem.id})">Eliminar</button>
    `;
    cartCard.appendChild(imgContainer);
    cartCard.appendChild(textContainer);

    updateTotal(totalPrice);
    return cartCard;
}

function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const removedItem = cart.find(item => item.id === productId);
    
    if (removedItem) {
        const removedItemTotal = removedItem.price * removedItem.quantity;
        cart = cart.filter(item => item.id !== productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateTotalAndUI(cart);
    }
}

function updateTotalAndUI(cart) {
    const total = cart.length > 0 ? cart.reduce((acc, item) => acc + (item.price * item.quantity), 0) : 0;
    updateTotal(total);
    updateCartUI();
}

function updateTotal(price) {
    const currentTotalElement = document.getElementById('total-price');
    if (currentTotalElement) {
        currentTotalElement.innerText = `$${price.toFixed(2)}`;
    }
}

function realizarCompra() {
    alert("Gracias por tu compra!");
    localStorage.removeItem('cart');
    updateCartUI();
    updateTotal(0);
}