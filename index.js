import { servicesProducts } from "./producto-services.js";

const productContainer = document.querySelector("[data-product]");
const form = document.querySelector("[data-form]");

function createCard(name, price, image, id, link) {
  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
    <div class="img-container">
        <img class="image" src="${image}" alt="${name}">
    </div>

    <div class="card-container--info">
        <p>${name}</p>
        <div class="card-container--value">
            <p>US$${price}</p>
            <a class="search-link" href="${link}" target="_blank" rel="noopener noreferrer">Ver Producto</a>
            <button class="delete-button" data-id="${id}">
                <img src="trash-icon.svg" alt="Eliminar">
            </button>
        </div>
    </div>
    `;

  // Agregar el event listener al botón de eliminar
  card.querySelector('.delete-button').addEventListener('click', async (event) => {
    const productId = event.currentTarget.getAttribute('data-id');
    try {
      await servicesProducts.deleteProduct(productId);
      card.remove(); // Eliminar la tarjeta de producto del DOM
      console.log(`Producto con ID ${productId} eliminado exitosamente`);
    } catch (error) {
      console.error('Error eliminando producto:', error);
    }
  });

  return card;
}

const render = async () => {
  try {
    const listProducts = await servicesProducts.productList();
    listProducts.forEach(product => {
      productContainer.appendChild(
        createCard(
          product.name,
          product.price,
          product.image,
          product.id,
          product.link
        )
      );
    });
  } catch (error) {
    console.log(error);
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = document.querySelector("[data-name]").value;
  const price = document.querySelector("[data-price]").value;
  const image = document.querySelector("[data-image]").value;
  const link = document.querySelector("[data-link]").value;

  try {
    const newProduct = await servicesProducts.createProduct(name, price, image, link);
    productContainer.appendChild(
      createCard(
        newProduct.name,
        newProduct.price,
        newProduct.image,
        newProduct.id,
        newProduct.link
      )
    );
  } catch (error) {
    console.log(error);
  }
});

render();