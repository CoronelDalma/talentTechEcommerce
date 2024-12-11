document.addEventListener("DOMContentLoaded", () => {
    var product = JSON.parse(localStorage.getItem("selectedProduct"));
    console.log(product);

    document.title =product.title;

    const viewProduct = document.querySelector(".product-container");
    viewProduct.innerHTML = "";
    viewProduct.innerHTML += `
        <div class="product-images">
            <img src=${product.images[0]} alt="${product.title}" class="card-image">
        </div>
        <div class="product-info">
            <h1>${product.title}</h1>
            <div class="price-info">
                <p class="price-tag">$${product.price}</p>
                <p class="product-stock">${product.stock} En stock</p>
            </div>
            <p class="product-description">${product.description}</p>
            <div class="quantity">
                <input type="number" value="1" min="1">
            </div>
            <button class="btn-clear" style="margin-top: 1rem;">Agregar al carrito</button>
        </div>
    `;

    const reviews = document.querySelector(".reviews-container");
    reviews.innerHTML = "";
    product.reviews.forEach(review => {
        reviews.innerHTML += `
            <div class="review-card reviewer-name">
                <h3>${review.reviewerName}</h3>
                <div class="star-icon star-review">${review.rating}<i class="fa-solid fa-star"></i></div>
                <p>${review.comment}</p>
            </div>
        `
    })

})