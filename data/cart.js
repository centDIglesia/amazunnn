export let cart = [
  {
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 19,
  },
  {
    id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 19,
  },
];

export function addTocart(selectedProduct) {
  const existingProduct = cart.find(
    (cartItem) => cartItem.id === selectedProduct.id
  );

  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cart.push({
      id: selectedProduct.id,
      quantity: 1,
    });
  }
}


export function deleteCartItem(productId) {
  cart = cart.filter(cartItem => cartItem.id !== productId);

  /*
   const newCart = [];

  cart.forEach((cartItem) => {
    if(cartItem.id !==  productId)
    {
      newCart.push(cartItem);
    }
  });

  cart = newCart;
 */
}
