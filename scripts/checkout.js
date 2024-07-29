import { cart, deleteCartItem, updateDeliveryOptions } from "../data/cart";
import { products } from "../data/products";
import formatcurrency from "./utils/money";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOptions } from "../data/deliveryOptions";

let cartsummaryHtml = "";
const today = dayjs();

cart.forEach((cartItem) => {
 

  const productsId = cartItem.id;

  const matchingProducts = products.find(
    (product) => product.id === productsId
  );

  const delivOptionId = cartItem.deliveryOptionsId;

  const matchingDeliveryID = deliveryOptions.find(
    (deliveryOption) => deliveryOption.id === delivOptionId
  );

  if (matchingDeliveryID === undefined) {
    console.log("jj");
  }

  const deliveryDate = today.add(matchingDeliveryID.deliveryDays, "days");
  const dateString = deliveryDate.format("dddd, MMMM D");

  cartsummaryHtml += `
     <div class="cart-item-container js-cart-item-container-${
       matchingProducts.id
     }">
            <div class="delivery-date">
              Delivery date: ${dateString}
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
                  
                ${deliveryOptionsHTML(matchingProducts, cartItem)}
               
              
              </div>
            </div>
          </div>

  
  `;
});

document.querySelector(".order-summary").innerHTML = cartsummaryHtml;

function deliveryOptionsHTML(matchingProducts, cartItem) {
  let deliveryOptionhtml = "";

  deliveryOptions.forEach((deliveryoptions) => {
    const deliveryDate = today.add(deliveryoptions.deliveryDays, "days");

    const dateString = deliveryDate.format("dddd, MMMM D");

    const deliveryPrice =
      deliveryoptions.deliveryPrice === 0
        ? "FREE"
        : `$${formatcurrency(deliveryoptions.priceCents)} -`;

    const isChecked = deliveryoptions.id === cartItem.deliveryOptionsId;
   

    deliveryOptionhtml += ` <div class="delivery-option js-delivery-option"
      data-product-id ="${matchingProducts.id}"
     data-delivery-option-id ="${deliveryoptions.id}">
                  <input type="radio"
                    ${isChecked ? "checked" : ""}
                    class="delivery-option-input"
                    name="${matchingProducts.id}">

                  
                  <div>
                    <div class="delivery-option-date">
                    ${dateString}
                    </div>
                    <div class="delivery-option-price">
                     ${deliveryPrice} Shipping
                    </div>
                  </div>
       </div>`;
  });

  return deliveryOptionhtml;
}

document.querySelectorAll(".js-delete-cartItem").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;

    deleteCartItem(productId);

    const containerToremove = document.querySelector(
      `.js-cart-item-container-${productId}`
    );

    containerToremove.remove();
  });
});

document.querySelectorAll(".js-delivery-option").forEach((element) => {
  element.addEventListener("click", () => {
    const { productId, deliveryOptionId } = element.dataset;
    updateDeliveryOptions(productId, deliveryOptionId);
  });
});
