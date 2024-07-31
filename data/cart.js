export let cart;

loadFromStorage();

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
}

function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(selectedProductID) {
  const existingProduct = cart.find(
    (cartItem) => cartItem.id === selectedProductID
  );

  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cart.push({
      id: selectedProductID,
      quantity: 1,
      deliveryOptionsId: "1",
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

export function updateQuantity(productId, newQuantity) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.id) {
      matchingItem = cartItem;
    }
  });

  matchingItem.quantity = newQuantity;

  saveToStorage();
}

export function updateCArtItemQuantity() {
  let cartQuantity = cart.reduce(
    (total, cartItem) => total + cartItem.quantity,
    0
  );

  return cartQuantity;
}
