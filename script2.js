// HTML elementų pasirinkimas
const productForm = document.getElementById('product-form');
const productNameInput = document.getElementById('product-name');
const productPriceInput = document.getElementById('product-price');
const productDescriptionInput = document.getElementById('product-description');
const productList = document.getElementById('product-list');
const cart = document.getElementById('cart');
const totalPriceElement = document.getElementById('total-price');

let cartItems = [];

// Įkelti prekes iš Local Storage
function loadProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    products.forEach(addProductToDOM);
}

// Išsaugoti prekę į Local Storage
function saveProduct(product) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
}

// Ištrinti prekę iš Local Storage
function deleteProductFromStorage(productName) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products = products.filter(product => product.name !== productName);
    localStorage.setItem('products', JSON.stringify(products));
}

// Pridėti prekę į DOM
function addProductToDOM(product) {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';

    productCard.innerHTML = `
        <h3>${product.name}</h3>
        <p>Kaina: €${product.price.toFixed(2)}</p>
        <p>${product.description}</p>
        <button class="add-to-cart-btn">Į krepšelį</button>
    `;

    // Pridėti į krepšelį
    productCard.querySelector('.add-to-cart-btn').addEventListener('click', () => {
        addToCart(product);
    });

    productList.appendChild(productCard);
}

// Pridėti prekę į krepšelį
function addToCart(product) {
    cartItems.push(product);
    renderCart();
}

// Atvaizduoti krepšelį
function renderCart() {
    cart.innerHTML = '';
    let totalPrice = 0;

    cartItems.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';

        cartItem.innerHTML = `
            <h3>${item.name}</h3>
            <p>Kaina: €${item.price.toFixed(2)}</p>
            <button class="remove-from-cart-btn">Pašalinti</button>
        `;

        // Pašalinti prekę iš krepšelio
        cartItem.querySelector('.remove-from-cart-btn').addEventListener('click', () => {
            cartItems.splice(index, 1);
            renderCart();
        });

        cart.appendChild(cartItem);
        totalPrice += item.price;
    });

    totalPriceElement.textContent = `Viso: €${totalPrice.toFixed(2)}`;
}

// Formos pateikimas
productForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const product = {
        name: productNameInput.value,
        price: parseFloat(productPriceInput.value),
        description: productDescriptionInput.value
    };

    addProductToDOM(product);
    saveProduct(product);

    // Formos išvalymas
    productNameInput.value = '';
    productPriceInput.value = '';
    productDescriptionInput.value = '';
});

// Puslapio užkrovimo metu
document.addEventListener('DOMContentLoaded', loadProducts);
