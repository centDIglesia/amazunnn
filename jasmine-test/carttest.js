import { cart, addToCart } from "../data/cart.js";

describe("addToCart", function () {
  beforeEach(function () {
    let store = {};

    spyOn(localStorage, "getItem").and.callFake(function (key) {
      return store[key] || null;
    });

    spyOn(localStorage, "setItem").and.callFake(function (key, value) {
      store[key] = value + "";
    });

    spyOn(localStorage, "clear").and.callFake(function () {
      store = {};
    });

    console.log(localStorage.getItem('cart'));
    
    cart.length = 0;
  });

  it("should add a new product to the cart", function () {
    const product = { id: "1" };
    addToCart(product);
    expect(cart.length).toBe(1);
    expect(cart[0].id).toBe("1");
    expect(cart[0].quantity).toBe(1);
  });

  it("should increase the quantity of an existing product in the cart", function () {
    const product = { id: "1" };
    addToCart(product);
    addToCart(product);
    expect(cart.length).toBe(1);
    expect(cart[0].quantity).toBe(2);
  });

  it("should save the cart to localStorage", function () {
    const product = { id: "1" };
    addToCart(product);
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    expect(storedCart.length).toBe(1);
    expect(storedCart[0].id).toBe("1");
    expect(storedCart[0].quantity).toBe(1);
  });
});
