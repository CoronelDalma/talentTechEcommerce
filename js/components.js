// components
/* ----- header -----*/
fetch('Components/Header.html')
.then(response => response.text())
.then(data => {
    document.getElementById('header').innerHTML = data;
});

/* ----- footer -----*/
fetch('Components/Footer.html')
.then(response => response.text())
.then(data => {
    document.getElementById('footer').innerHTML = data;
});