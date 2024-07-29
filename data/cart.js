export let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(selectedProductID) {
  const existingProduct = cart.find(
    (cartItem) => cartItem.id === selectedProductID.id
  );

  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cart.push({
      id: selectedProductID.id,
      quantity: 1,
      deliveryOptionsId: "2",
    });
  }

  saveToStorage();

}

export function deleteCartItem(productId) {
  cart = cart.filter((cartItem) => cartItem.id !== productId);
  saveToStorage();
}

export function updateDeliveryOptions(selectedProductID, deliveryOptionsId) {
  const existingProduct = cart.find(
    (cartItem) => cartItem.id === selectedProductID
  );

 
  existingProduct.deliveryOptionsId = deliveryOptionsId;

  saveToStorage();
  
}


