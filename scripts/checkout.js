import { cart, deleteCartItem } from "../data/cart";
import { products } from "../data/products";
import formatcurrency from "./utils/money";

let cartsummaryHtml = "";

cart.forEach((cartItem) => {
  const productsId = cartItem.id;

  const matchingProducts = products.find(
    (product) => product.id === productsId
  );
  cartsummaryHtml += `
     <div class="cart-item-container js-cart-item-conatainer-${
       matchingProducts.id
     }">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProducts.image}">

              <div class="cart-item-details">
                <div class="product-name">
                ${matchingProducts.name}
                </div>
                <div class="product-price">
                  $${formatcurrency(matchingProducts.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${
                      cartItem.quantity
                    }</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-cartItem" data-product-id = "${
                    matchingProducts.id
                  }"
                  >
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="${matchingProducts.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="${matchingProducts.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="${matchingProducts.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

  
  `;
});

document.querySelector(".order-summary").innerHTML = cartsummaryHtml;

document.querySelectorAll(".js-delete-cartItem").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    console.log(cart);
    deleteCartItem(productId);

    const containerToremove = document.querySelector(
      `.js-cart-item-conatainer-${productId}`
    );

    containerToremove.remove();
    console.log("deleted");

    console.log(cart);
  });
});
