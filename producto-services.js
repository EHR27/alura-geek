const productList = () => {
    return fetch("http://localhost:3000/productos")
    .then((res) => res.json())
    .catch((err) => console.log(err))
};

//Agregar productos
const createProduct = (name, price, image, link) => {
    return fetch("http://localhost:3000/productos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            price,
            image,
            link,
        })
    }).then((res) => res.json())
    .catch((err) => console.log(err));
}

// Eliminar productos
const deleteProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/productos/${id}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      return response.json();
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  };
  
export const servicesProducts = {
    productList,
    createProduct,
    deleteProduct,
};