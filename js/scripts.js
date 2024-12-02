// Cargar los productos desde DummyJSON (ejemplo básico)
// fetch('https://dummyjson.com/products')
// .then(response => response.json())
// .then(data => {
//     const productCardsContainer = document.getElementById('product-cards');
//     data.products.forEach(product => {
//         productCardsContainer.innerHTML += `
//             <div class="col-md-4">
//                 <div class="card">
//                     <img src="${product.images[0]}" class="card-img-top" alt="${product.title}">
//                     <div class="card-body">
//                         <h5 class="card-title">${product.title}</h5>
//                         <p class="card-text">${product.description}</p>
//                         <a href="Product.html?id=${product.id}" class="btn btn-primary">Ver Producto</a>
//                     </div>
//                 </div>
//             </div>
//         `;
//     });
// });


fetch('json/categories.json')
.then(res => res.json())
.then(iconMap => {
    // Get products category list
    fetch('https://dummyjson.com/products/categories')
    .then(res => res.json())
    .then(data => {
        const categoryList=document.querySelector(".categorie-filter");
        data.forEach(category => {
            const iconClass= iconMap[category.slug] || "fa-question";
            categoryList.innerHTML += `
                <li><a href="#" class="d-flex align-items-center justify-content-between"><span>${category.name}</span><i class="fa-solid ${iconClass} icon-link"></i></a></li>
            `;
        });
    });
})


