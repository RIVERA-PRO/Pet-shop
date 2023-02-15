
fetch("https://mindhub-xj03.onrender.com/api/petshop")
    .then(response => response.json())
    .then((data) => {
        console.log(data);
        
    })
