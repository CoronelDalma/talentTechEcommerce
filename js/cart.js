function getItems() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    return cart;
}

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.querySelector(".cart-count").innerText = cart.length < 10 ? `${cart.length}` : "+9";
}

function removeItemFromCart(id) {
    let cart = getItems();
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
}

function removeFromDOM(itemId) {
    const itemElement = document.getElementById(`cart-${itemId}`);
    if (itemElement) {
        itemElement.remove();
    }
}

function removeItem(id) {
    removeItemFromCart(id);
    removeFromDOM(id);
    updateCartCount();
    displayCart();
}

function displayCart() {
    let items = getItems();
    var total = 0;
    //console.log(items);
    const container = document.querySelector(".container");
    container.innerHTML = '';
    container.innerHTML += `
        <h1 class="h1-center">Carrito de Compras</h1>
    `;
    items.forEach(item => {
        if (item) {
            console.log(item);
            total += item.price*item.inTheCart;
            container.innerHTML += `
                <div class="cart-item" id="item-${item.id}">
                    <img src=${item.images[0]} alt=${item.title}>
                    <div class="cart-title">
                        <h2>${item.title}</h2>
                        <p>${item.description}</p>
                    </div>
                    <div class="price">$${item.price}</div>
                    <div class="quantity-total">
                        <div class="input-group">
                            <button id="decrement">-</button>
                            <input type="text" value="${item.inTheCart}" id="quantity" readonly>
                            <button id="increment">+</button>
                        </div>
                        <div class="total">$${item.price * item.inTheCart }</div>
                    </div>
                    <div class="cart-btn">
                        <button type="button" class="btn btn-danger" data-id="${item.id}">
                            <i class="fa-solid fa-trash"></i>Eliminar
                        </button>
                    </div>
                </div>
            `;
        }
    })

    container.addEventListener('click', function(event) {
        console.log("hizo click en");
        console.log(event);
        if (event.target && event.target.classList.contains('btn-danger')) {
            const productId = event.target.getAttribute('data-id');
            console.log("product id "+productId);
            removeItem(Number(productId));
        }
    });

    if (items.length>0) {
        container.innerHTML +=  `
            <div class="cart-total">
                <h2>Total: $${total}</h2>
                <a href="./checkout.html"><button>Pagar</button></a>
            </div>
        `;
    } else {
        container.innerHTML +=  `
            <div class="cart-total">
                <h2>No hay productos en el carrito</h2>    
            </div>
        `;
    }
}

document.addEventListener('DOMContentLoaded', displayCart);