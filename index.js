function removeElements() {
  const elementsDiv = document.querySelectorAll(".result-item");
  elementsDiv.forEach((item) => item.remove());
}

function showResult(results) {
  removeElements();
  const contenedor = document.querySelector(".results");
  const template = document.querySelector("#template-card-result");
  for (const item of results) {
    //
    const titleEl = template.content.querySelector(".result-title");
    titleEl.textContent = item.title;

    const imgEl = template.content.querySelector(".result-img");
    imgEl.src = item.thumbnail;

    const conditionEl = template.content.querySelector(".result-condition");
    if (item.condition == "new") {
      item.condition = "nuevo";
      conditionEl.textContent = "Estado:" + " " + item.condition;
    } else if (item.condition == "used") {
      item.condition = "usado";
      conditionEl.textContent = "Estado:" + " " + item.condition;
    }

    const vendidosEl = template.content.querySelector(".result-vendidos");
    vendidosEl.textContent = item.sold_quantity;

    const priceEl = template.content.querySelector(".result-price");
    priceEl.textContent = "$" + item.price;

    const clone = document.importNode(template.content, true);
    contenedor.appendChild(clone);
  }
}

function main() {
  const formEl = document.querySelector(".search-form");
  formEl.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const palabraABuscar = evento.target.buscar.value;
    fetch("https://api.mercadolibre.com/sites/MLA/search?q=" + palabraABuscar)
      .then((respuesta) => respuesta.json())
      .then((data) => {
        showResult(data.results);
        evento.target.buscar.value = "";
      });
  });
}

main();

// const contenedor = document.querySelector(".results");
// // seleciona el contenedor de las cards

// const template = document.querySelector("#template-card-result");
// //selecciona el template mediante su id (tambien puede ser con class)

// for (const item of results) {
//   // forOf itera por cada item en el array "results", y cada item es nombrado en este caso como "item"

//   const priceEl = template.content.querySelector(".result-price");
//   priceEl.textContent = "$" + item.price;
//   // selecciona todos los elementos del template, para remplazarlos con el valor del nuevo item

//   const thumbnailEl = template.content.querySelector(".result-img");
//   thumbnailEl.setAttribute("src", item.thumbnail);
//   //asi con todos los elementos que tenga la card del template, title, price...

//   const clone = document.importNode(template.content, true);
//   contenedor.appendChild(clone);
//   // esto es necesario para que agrege cada item/card al contenedor (appendChild == "agregar hijo")
// }
