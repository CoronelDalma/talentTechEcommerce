document.addEventListener("DOMContentLoaded", () => {
    function getItems() {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        return cart;
    }
    
    let items = getItems();
    //console.log(items);
    const container = document.querySelector(".container");
    container.innerHTML += `
        <h1 class="h1-center">Carrito de Compras</h1>
    `;
    items.forEach(item => {
        if (item) {
            console.log(item);
            container.innerHTML += `
                <div class="cart-item">
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
                        <div class="total">$99.99</div>
                    </div>
                    <div class="cart-btn">
                        <button type="button" class="btn btn-danger">
                            <i class="fa-solid fa-trash"></i>Eliminar
                        </button>
                    </div>
                </div>
            `;
        }

    })

});

