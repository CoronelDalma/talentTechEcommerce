// Get products category list
fetch('json/categories.json')
.then(res => res.json())
.then(iconMap => {
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

function updateData(currentPage) {
    // Get products
    const from= limit * (currentPage-1);
    fetch(`https://dummyjson.com/products?limit=${limit}&skip=${from}&select=title,price,rating,images,category`)
    .then(res => res.json())
    .then(data => {
        displayData(data);
    });
}

function displayData(data) {
    const container = document.querySelector('.container-cards');
    container.innerHTML = '';
    data.products.forEach(product => {
        container.innerHTML += `
            <li class="my-card product-card">
                <a href="product.html">
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
                        <div class="card-btn">
                            <button><i class="fa-solid fa-cart-plus fa-xl "></i></button>   
                        </div>
                    </div>
                </a> 
            </li>
        `;
    })
}

// function displayPagination(pages) {
//     var pagination = document.querySelector(".pagination");

//     pagination.innerHTML +=  `
//         <li class="page-item arrow-item" >
//             <a class="page-link" href="#" aria-label="Previous" id="prevPage">
//                 <span aria-hidden="true">&laquo;</span>
//             </a>
//         </li>
//     `;

//     for (i= 1; i<=pages; i++) {
//         let activeClass = (i === 1) ? 'active' : '';
//         pagination.innerHTML +=  `
//             <li class="page-item ${activeClass}" data-page="${i}"><a class="page-link" href="#">${i}</a></li>
//         `;
//     }

//     pagination.innerHTML += `
//         <li class="page-item arrow-item" >
//             <a class="page-link" href="#" aria-label="Next" id="nextPage">
//                 <span aria-hidden="true">&raquo;</span>
//             </a>
//         </li>
//     `;
// }

const limit = 30;
let pages = 0;
window.addEventListener("load", () => {
    fetch('https://dummyjson.com/products')
    .then(res => res.json())
    .then(data => {
        displayData(data);
        pages = Math.ceil(data.total / limit);
        // displayPagination(pages);
    });
})

// Pagination
const pageItems = document.querySelectorAll('.page-item');
let currentPage = 1;

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

function updateArrows() {
    var arrows = document.querySelectorAll(".arrow-item");
    arrows.forEach(arrow => {
        arrow.classList.remove('disabled');
    });

    currentPage === 1 && arrows[0].classList.add('disabled');
    currentPage === pages && arrows[1].classList.add('disabled');
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





