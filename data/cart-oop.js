const cart = {
  cartItems: undefined,
  loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem("cart-oop")) || [];
  },
  saveToStorage() {
    localStorage.setItem("cart-oop", JSON.stringify(this.cartItems));
  },

  addToCart(selectedProductID) {
    const existingProduct = this.cartItems.find(
      (cartItem) => cartItem.id === selectedProductID.id
    );

    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      this.cartItems.push({
        id: selectedProductID.id,
        quantity: 1,
        deliveryOptionsId: "1",
      });
    }

    this.saveToStorage();
  },

  deleteCartItem(productId) {
    this.cartItems = this.cartItems.filter(
      (cartItem) => cartItem.id !== productId
    );
    this.saveToStorage();
  },
  updateDeliveryOptions(selectedProductID, deliveryOptionsId) {
    const existingProduct = this.cartItems.find(
      (cartItem) => cartItem.id === selectedProductID
    );

    existingProduct.deliveryOptionsId = deliveryOptionsId;

    this.saveToStorage();
  },
  updateQuantity(productId, newQuantity) {
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.id) {
        matchingItem = cartItem;
      }
    });

    matchingItem.quantity = newQuantity;

    this.saveToStorage();
  },
  updateCArtItemQuantity() {
    let cartQuantity = this.cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );

    return cartQuantity;
  },
};

cart.loadFromStorage();
