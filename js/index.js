// top categories
var topCat = ["groceries","home-decoration","laptops","smartphones","sports-accessories"];
fetch('json/categories.json')
.then(res => res.json())
.then(category => {
    var container = document.querySelector(".top");
    topCat.forEach(element => {
        container.innerHTML += `
            <li class="my-card category-card">
                <a href="https://dummyjson.com/products/category/${element}" class="">
                    <h6 class="white">${element}</h6>
                    <div class="image-container">
                        <img src=${category[element].imageUrl} alt=${element} class="card-image category-image">
                    </div>    
                </a>  
            </li>
        `;
    });

    // view - top categories
    var categoryCards = document.querySelectorAll(".category-card");
    categoryCards.forEach(card => {
        card.addEventListener('click', function(event) {
            event.preventDefault();
            let urlParts = card.firstElementChild.href.split("/");
            const lastPart = urlParts[urlParts.length - 1];
            localStorage.setItem(`category`, lastPart);
            window.location.href = "/products.html"
        })
    })
})

