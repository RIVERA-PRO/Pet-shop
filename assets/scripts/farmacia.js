import { filtradoDeFarmacia, addCard } from "../module/functions.js";

const productos = document.getElementById("productos")

fetch("https://mindhub-xj03.onrender.com/api/petshop")
    .then(response => response.json())
    .then((data) => {
        console.log(data);
        const dataCategoria = data.filter(producto => producto.categoria === "farmacia");
        console.log(dataCategoria);
        const filtraDeJugueteria = filtradoDeFarmacia( data, dataCategoria)
        addCard(filtradoDeFarmacia( data, dataCategoria), productos )
    }).catch((err) => {
        console.log(err) })
