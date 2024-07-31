class Cart {
  cartItems;
  #localStorageKEy;

  constructor(localStorageKEy) {
    this.#localStorageKEy = localStorageKEy;
    this.#loadFromStorage();
  }

  #loadFromStorage() {
    this.cartItems =
      JSON.parse(localStorage.getItem(this.#localStorageKEy)) || [];
  }

  saveToStorage() {
    localStorage.setItem(this.#localStorageKEy, JSON.stringify(this.cartItems));
  }

  addToCart(selectedProductID) {
    const existingProduct = this.cartItems.find(
      (cartItem) => cartItem.id === selectedProductID
    );

    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      this.cartItems.push({
        id: selectedProductID,
        quantity: 1,
        deliveryOptionsId: "1",
      });
    }

    this.saveToStorage();
  }

  deleteCartItem(productId) {
    this.cartItems = this.cartItems.filter(
      (cartItem) => cartItem.id !== productId
    );
    this.saveToStorage();
  }

  updateDeliveryOptions(selectedProductID, deliveryOptionsId) {
    const existingProduct = this.cartItems.find(
      (cartItem) => cartItem.id === selectedProductID
    );

    existingProduct.deliveryOptionsId = deliveryOptionsId;

    this.saveToStorage();
  }

  updateQuantity(productId, newQuantity) {
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.id) {
        matchingItem = cartItem;
      }
    });

    matchingItem.quantity = newQuantity;

    this.saveToStorage();
  }

  updateCArtItemQuantity() {
    let cartQuantity = this.cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );

    return cartQuantity;
  }
}

const Cart1 = new Cart("local");
Cart1.addToCart("15b6fc6f-327a-4ec4-896f-486349e85a3d");
Cart1.addToCart("15b6fc6f-327a-4ec4-896f-486349e85a3d");
Cart1.addToCart("15b6fc6f-327a-4ec4-896f-486349e85a3d");

console.log(Cart1.cartItems);
