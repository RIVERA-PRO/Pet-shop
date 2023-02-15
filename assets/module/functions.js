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


  export function allCards(events) {
    return `<div class="card p-3 m-1 bg-dark" style="width: 18rem">
      <img
        src= ${events.imagen}
        class="card-img-top"
        style="height: 10rem"
        alt="cine"
      />
      <div class="card-body d-flex flex-column justify-content-around">
              <h5 class="card-title text-white fs-4">${events.name}</h5>
              <p class="card-text text-white fs-5"> ${events.date} </p>
              <p class="card-text text-white fs-5">
                ${events.descripcion}
              </p>
              <p class="card-text text-white fs-5">
                ${events.disponible}
              </p>
              <p class="card-text text-white fs-5"> Price: $${events.price} </p>
              <a href="../assets/details.html?id=${events._id}&name=${events.name}" class="btn bg-dark-subtle d-flex justify-content-end " style="width: 4.5rem;"
                >Details</a
              >
            </div>
      </div>`;
  }