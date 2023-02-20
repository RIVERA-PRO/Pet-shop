
import { createCards, filterProducts, writeSponsors, createCarru, createShopping, fillHeart } from "../module/functions.js";

const container = document.getElementById("productos")
const searchBar = document.getElementById("search-bar")
const shopping = document.getElementById("cart")
const carrito = document.getElementById("btn-car")
const modalCarrito = document.getElementById("modal-content")
const btnHeart = document.getElementsByClassName("btn-heart")

let products = JSON.parse(localStorage.getItem("products")) || [] 
let favoritos = JSON.parse(localStorage.getItem("favoritos")) || []

localStorage.setItem("products", JSON.stringify(products))

let precioTotal = 0
createShopping(products, shopping)

let toys = JSON.parse(localStorage.getItem("toys")) || [] 
let pharmacyProducts = JSON.parse(localStorage.getItem("pharmacyProducts")) || []
let cartProducts = toys.concat(pharmacyProducts)

createCards(pharmacyProducts, container, "")

fillHeart(pharmacyProducts, favoritos, btnHeart)

searchBar.addEventListener("keyup", (e) => {
    let filteredpharmacyProducts = filterProducts(pharmacyProducts, e.target.value.toLowerCase())
    createCards(filteredpharmacyProducts, container, e.target.value.toLowerCase())
})

container.addEventListener("click", (e) => {
    if (e.target.localName === "button") {
        let pressPharmacyProduct = pharmacyProducts.find(pharmacyProduct => pharmacyProduct._id == e.target.id)
        if (pressPharmacyProduct.disponibles > 0) {
            for (let pharmacyProduct of pharmacyProducts) {
                if (pharmacyProduct == pressPharmacyProduct) {
                    let i = pharmacyProducts.indexOf(pharmacyProduct)
                    pressPharmacyProduct.disponibles--

                    pharmacyProducts[i] = pressPharmacyProduct
                    localStorage.setItem("pharmacyProducts", JSON.stringify(pharmacyProducts)) 
                    let unidades = document.getElementById(`unidades-${pressPharmacyProduct._id}`)
                    unidades.textContent = `${pressPharmacyProduct.disponibles} unidades` 
                }
            }

            products.push(pressPharmacyProduct)
            localStorage.setItem("products", JSON.stringify(products)) 
        } else {
            Swal.fire({
                icon: 'error',
                title: '',
                text: 'Lo siento nos quedamos sin disponibles',
            })
        }
    }
    else if (e.target.offsetParent && e.target.offsetParent.className == "card producto") { 
        let modal = e.target.offsetParent.nextElementSibling 
        modal.addEventListener("click", (e) => {
            if (e.target.className.includes("modal-container")) {
                createCards(pharmacyProducts, container, "") 

                fillHeart(pharmacyProducts, favoritos, btnHeart)

            }
        })
    }
    else if (e.target.localName == "path") {
        if (favoritos.some(fav => fav.producto == e.target.id)) {
            favoritos = favoritos.filter(fav => fav.producto != e.target.id)
            e.target.classList.replace("redPath", "black")
            localStorage.setItem('favoritos', JSON.stringify(favoritos))
        } else {
            favoritos.push(pharmacyProducts.find(producto => producto.producto == e.target.id))
            e.target.classList.replace("black", "redPath")
            localStorage.setItem('favoritos', JSON.stringify(favoritos))
        }
    }
})

carrito.addEventListener("click", (e) => {
    precioTotal = 0
    products.forEach(product => precioTotal += product.precio)
    createShopping(products, shopping, precioTotal) 

    modalCarrito.addEventListener("click", (e) => {
        if (e.target.className.includes("garbage")) {
            let id = e.target.id
            cartProducts.forEach(cartProduct => {
                if (cartProduct._id == id) {
                    let finalProduct = products.find(product => product._id == cartProduct._id)
                    let position = products.findIndex(product => product == finalProduct)
                    products.splice(position, 1)
                    localStorage.setItem("products", JSON.stringify(products))

                    cartProduct.disponibles++

                }
            })
            localStorage.setItem("toys", JSON.stringify(cartProducts.filter(product => product.categoria == "jugueteria")))
            localStorage.setItem("pharmacyProducts", JSON.stringify(cartProducts.filter(product => product.categoria == "farmacia")))

            precioTotal = 0
            products.forEach(product => precioTotal += product.precio)
            createShopping(products, shopping, precioTotal)

        } else if (e.target.id == "eliminar") {
            cartProducts.forEach(cartProduct => {
                products.forEach(product => {
                    if (product._id == cartProduct._id) {
                        cartProduct.disponibles++
                    }
                })
            })
            localStorage.setItem("toys", JSON.stringify(cartProducts.filter(product => product.categoria == "jugueteria")))
            localStorage.setItem("pharmacyProducts", JSON.stringify(cartProducts.filter(product => product.categoria == "farmacia")))
            products = []
            localStorage.setItem("products", JSON.stringify(products))
            precioTotal = 0
            createShopping(products, shopping, precioTotal)

        } else if (e.target.id == "comprar") {
            products = []
            localStorage.setItem("products", JSON.stringify(products))
            precioTotal = 0
            createShopping(products, shopping, precioTotal)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Compra realizada con exito',
                showConfirmButton: false,
                timer: 1500
            })
        }
    })

    let modal = document.getElementById("staticBackdrop") 
    modal.addEventListener("click", (e) => {
        if (e.target.className.includes("modal-container")) {
            createCards(pharmacyProducts, container, "") 
            fillHeart(pharmacyProducts, favoritos, btnHeart)
        }

    })
})


let slideTrack = document.getElementById("slide-track")

let array = ["dog-chow.png", "dog-selection.png", "dogui.png", "kongo.jpg", "pedigree.png", "proplan.png", "royal-canin.png", "sabrocitos.png", "whiscas.png", "dog-chow.png", "dog-selection.png", "dogui.png", "kongo.jpg", "pedigree.png", "proplan.png", "royal-canin.png", "sabrocitos.png", "whiscas.png"]

writeSponsors(array, slideTrack)

let slide = document.getElementById("slide")

let array2 = ["dog.jpg", "pexels-adam-kontor-333083.jpg", "pexels-kat-smith-551628.jpg", "dog-ball.jpg", "carpincho.jpg"]

createCarru(array2, slide)


