import { products } from "../data/products.js";
import { cart, addToCart } from "../data/cart.js";
import formatcurrency from "./utils/money.js";
updateCartQuantity();
let productsHTML = "";
const productGrid = document.querySelector(".products-grid");

products.forEach((product) => {
  productsHTML += `
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            Black and Gray Athletic Cotton Socks - 6 Pairs
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
            ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${formatcurrency(product.priceCents)}
          </div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
          
          <i class="ri-checkbox-circle-fill"></i>
           Added
          </div>

        
          <button class="add-to-cart-button js-add-to-cart button-primary"  data-product-id="${
            product.id
          }">
            Add to Cart
          </button>
        </div>
    `;
});

productGrid.innerHTML = productsHTML;



function updateCartQuantity() {
  let cartQuantity = cart.reduce(
    (total, cartItem) => total + cartItem.quantity,
    0
  );

  const cartQuantityHtml = document.querySelector(".cart-quantity");
  cartQuantityHtml.innerHTML = `${cartQuantity}`;
}




function displayAddedToCart(atcButton) {


  const productContainer = atcButton.closest(".product-container");

  const addedToCartElement = productContainer.querySelector(".added-to-cart");

  addedToCartElement.classList.add("added-to-cart-show");

  setTimeout(() => {
    addedToCartElement.classList.remove("added-to-cart-show");
  }, 2000);

 
}




document.querySelectorAll(".js-add-to-cart").forEach((atcButton) => {
  atcButton.addEventListener("click", () => {
    const selectedProductID = atcButton.dataset.productId;
    const selectedProduct = products.find(
      (product) => product.id === selectedProductID
    );

    addToCart(selectedProduct);
    updateCartQuantity();
    displayAddedToCart(atcButton);
    console.log(cart);
  });
});
