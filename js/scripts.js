// Get products category list
fetch('json/categories.json')
.then(res => res.json())
.then(iconMap => {
    fetch('https://dummyjson.com/products/categories')
    .then(res => res.json())
    .then(data => {
        const categoryList=document.querySelector(".category-filter");

        data.forEach(category => {
            const iconClass= iconMap[category.slug].icon || "fa-question";
            categoryList.innerHTML += `
                <li><a href="${category.url}" class="category-link d-flex align-items-center justify-content-between"><span>${category.name}</span><i class="fa-solid ${iconClass} icon-link"></i></a></li>
            `;
        });

        const categoryLinks = document.querySelectorAll('.category-link');
        categoryLinks.forEach(link => {
            link.addEventListener('click',function(event) {
                event.preventDefault();

                fetch(link.href)
                .then(res => res.json())
                .then(data => {
                    displayData(data);
                    displayPagination(Math.ceil(data.total / limit));
                    seeQuantity();
                })
            })
        })
    });
})

function updateData(currentPage) {
    // Get products
    const from= limit * (currentPage-1);
    fetch(`https://dummyjson.com/products?limit=${limit}&skip=${from}&select=title,price,rating,images,category`)
    .then(res => res.json())
    .then(data => {
        displayData(data);
        seeQuantity();
    });
}

// ----- cart
function getItems() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    return cart;
}
function updateCartCount() {
    let cart = getItems();
    document.querySelector(".cart-count").innerText = cart.length < 10 ? `${cart.length}` : "+9";
}

function addCart(product) {
    console.log("agregar el producto");
    console.log(product);
    let cart = getItems();

    // modifications to the json to not add repeats and only add the quantity that is in the cart
    let existingProduct = cart.length>0 ? cart.find(item => item.id === product.id) : false;
    if (existingProduct && existingProduct.stock>existingProduct.inTheCart) existingProduct.inTheCart +=1
    else {
        product.inTheCart = 1;
        cart.push(product);
    }
    // save
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.title} ha sido agregado al carrito!`);
    updateCartCount();
    updateQuantity();
}

function seeProduct(product) {
    localStorage.setItem("selectedProduct", JSON.stringify(product));
    window.location.href = "product.html";
}

function seeQuantity() {
    const cart = getItems();
    var addCartBtn =  document.querySelectorAll('.add-cart');
    cart.forEach(item => {
        let btn = Array.from(addCartBtn).find(button => Number(button.id) === item.id); 
        btn && (btn.innerHTML = `<i class="fa-solid fa-cart-plus fa-xl "></i>${item.inTheCart}`);
    })
}
function updateQuantity() {
    var addCartBtn =  document.querySelectorAll('.add-cart');
    let cart = getItems();
    cart.forEach(item => {
        let btn = Array.from(addCartBtn).find(button => Number(button.id) === item.id);
        if (btn){
            btn.innerHTML = `<i class="fa-solid fa-cart-plus fa-xl "></i>${item.inTheCart}`;
        }     
    })
}

function displayData(data) {
    const container = document.querySelector('.container-cards');
    container.innerHTML = '';
    if (data.total > 0) {
        data.products.forEach(product => {
            container.innerHTML += `
                <li class="my-card product-card">
                    <a href="product.html" class="product-${product.id}" id="${product.id}">
                        <div class="image-container imageh-75">
                            <div class="icons-product-card">
                                <div class="star-icon">${product.rating}<i class="fa-solid fa-star"></i></div>
                                <div class="price-tag">${product.price}</div>
                            </div>
                            <img src=${product.images[0]} alt=${product.title} class="card-image product-image">
                        </div>
                        <div class="info-product-card">
                            <div class="info-card">
                                <p class="white">${product.category}</p>
                                <h6 class="product-card-title">${product.title}</h6>
                            </div>
                        </div>
                    </a> 
                    <div class="card-btn">
                        <button class="add-cart" id=${product.id}><i class="fa-solid fa-cart-plus fa-xl "></i></button>   
                    </div>
                </li>
            `;

            // add cart buttons
            var addCartBtn =  document.querySelectorAll('.add-cart');
            addCartBtn.forEach(btn => {
                btn.addEventListener('click', function(event) {
                    event.preventDefault();
                    //let index = (((btn.id-1) % data.products.length) + data.products.length) % data.products.length;
                    let index = data.products.findIndex(item => item.id === Number(btn.id));
                    addCart(data.products[index]);
                })
            })
            // see product
            var links = document.querySelectorAll('[class^="product-"]');
            links.forEach((link) => {
                link.addEventListener('click', function(event) {
                    event.preventDefault();
                    seeProduct(data.products[(link.id % limit)-1]);
                })          
            })
        })
    } else {
        container.innerHTML = `
            <div class="no-results">
                <h3>No se encontraron resultados</h3>
                <img src="./images/undraw_searching.svg" alt="No se encontraron resultados"> 
            </div>
        `;
    }
}

var pageItems;
var currentPage = 1;
function displayPagination(pages) {
    var pagination = document.querySelector(".pagination");
    pagination.innerHTML = ``;
    const disabled = pages === 1 ? "disabled" : "";
    pagination.innerHTML +=  `
        <li class="page-item arrow-item ${disabled}" >
            <a class="page-link" href="#" aria-label="Previous" id="prevPage">
                <span aria-hidden="true">&laquo;</span>
            </a>
        </li>
    `;

    for (i= 1; i<=pages; i++) {
        let activeClass = (i === 1) ? 'active' : '';
        pagination.innerHTML +=  `
            <li class="page-item ${activeClass} ${disabled}" data-page="${i}"><a class="page-link" href="#">${i}</a></li>
        `;
    }

    pagination.innerHTML += `
        <li class="page-item arrow-item ${disabled}" >
            <a class="page-link" href="#" aria-label="Next" id="nextPage">
                <span aria-hidden="true">&raquo;</span>
            </a>
        </li>
    `;

    pageItems = document.querySelectorAll('.page-item');
    currentPage = 1;

    pageItems.forEach(item => {
        item.addEventListener('click', function(event) {
            event.preventDefault();

            if (!item.classList.contains('arrow-item')) {
                pageItems.forEach( i => i.classList.remove('active'));
                item.classList.add('active');

                currentPage = parseInt(item.getAttribute('data-page'));
            }
            updateArrows();
            updateData(currentPage);
        })
    })

    document.getElementById('prevPage').addEventListener('click', function(event) {
        event.preventDefault();
        
        if (currentPage > 1) {
            currentPage--;
            updatePagination();
        }
    });
    
    document.getElementById('nextPage').addEventListener('click', function(event) {
        event.preventDefault();
        if (currentPage < pages) { 
            currentPage++;
            updatePagination();
        }
    });
    
}

/* --- first data load ----*/
const limit = 30;
let pages = 0;
window.addEventListener("load", () => {
    var search = localStorage.getItem("search");
    var url = 'https://dummyjson.com/products';
    if(search){
        url =  `https://dummyjson.com/products/search?q=${search} `
        localStorage.removeItem("search");
    }

    fetch(url)
    .then(res => res.json())
    .then(data => {
        displayData(data);
        if (data.total > 0) {
            pages = Math.ceil(data.total / limit);
            displayPagination(pages);
            updateArrows();
        }
        seeQuantity();
    });
})

function updateArrows() {
    var arrows = document.querySelectorAll(".arrow-item");
    arrows.forEach(arrow => {
        arrow.classList.remove('disabled');
    });

    (currentPage === 1 ) && arrows[0].classList.add('disabled');
    (currentPage === pages) && arrows[1].classList.add('disabled');
}
function updatePagination() {
    pageItems.forEach(item => {
        item.classList.remove('active');
        var page = parseInt(item.getAttribute('data-page'));
        if (page === currentPage) {
            item.classList.add('active');
        }
    });
    updateArrows();
    updateData(currentPage);
}