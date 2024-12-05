// components
/* ----- header -----*/
fetch('Components/Header.html')
.then(response => response.text())
.then(data => {
    document.getElementById('header').innerHTML = data;
   
    var btn = document.querySelector(".search-button");
    btn.addEventListener('click', function(event){
        event.preventDefault();
    
        var search = document.querySelector(".search-input").value;
        if (search) {
            localStorage.setItem("search", search);
            window.location.href = "products.html";
        }
    })
});

/* ----- footer -----*/
fetch('Components/Footer.html')
.then(response => response.text())
.then(data => {
    document.getElementById('footer').innerHTML = data;
});