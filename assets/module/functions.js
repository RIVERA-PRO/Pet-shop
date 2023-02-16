export function filtradoDeFarmacia( objetos,  paginas) {
    let productos = [];
    for (let objeto of objetos) {
      if (objeto.categoria === "farmacia") {
        productos.push(objeto);
      }
    }
    return productos;
  }

  export function filtradoDeJugueteria( objetos,  pagina) {
    let productos = [];
    for (let objeto of objetos) {
      if (objeto.categoria === "jugueteria") {
        productos.push(objeto);
      }
      
    }
    return productos;
   
  }

  export function addCard(events, cards) {
    let boxCards = "";
    for (let event of events) {
      boxCards += allCards(event);
    }
    cards.innerHTML = boxCards;
  }


  export function allCards(objeto) {
    return `<div class="card p-2 cover"  style="width: 20rem;">
    <img src=${objeto.imagen} alt="${objeto.producto}" class="card-img-top" style="height: 15rem;">
    <div class="card-body ">
      <h5 class="card-title h-50 title">${objeto.producto}</h5>
      <p class="m=0">Disponibles: ${objeto.disponibles}</p>
      <div class="d-flex justify-content-evenly align-items-center">         
        <p class="m-0">$${objeto.precio}</p>
        <a href="./details.html?_id=${objeto._id}&name=${objeto.name}" class="btn btn-outline-primary align-self-end">Agregar al carrito</a>
      </div>
    </div>
    </div>`
  }