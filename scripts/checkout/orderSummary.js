import {
  cart,
  deleteCartItem,
  updateDeliveryOptions,
  updateQuantity,
} from "../../data/cart";
import { getProducts } from "../../data/products";
import formatcurrency from "../utils/money";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import {
  deliveryOptions,
  getDeliveryOptions,
} from "../../data/deliveryOptions";
import { renderPaymentSummary } from "./paymentSummary";

const today = dayjs();

export function renderOrderSummary() {
  let cartsummaryHtml = "";
  cart.forEach((cartItem) => {
    const matchingProducts = getProducts(cartItem.id);

    const matchingDeliveryID = getDeliveryOptions(cartItem.deliveryOptionsId);

    if (matchingDeliveryID) {
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
            <img class="product-image" src="${matchingProducts.image}">

            <div class="cart-item-details">
              <div class="product-name">
                ${matchingProducts.name}
              </div>
              <div class="product-price">
               ${matchingProducts.getFormatteedCurrency()}
              </div>

              <div class="product-quantity">

                Quantity: 
                
                <span class="quantity-label js-quantity-label-${
                  matchingProducts.id
                }">${cartItem.quantity}</span>
                 
                <span class="update-quantity-link link-primary js-update-link" data-product-id="${
                  matchingProducts.id
                }">
                  Update
                </span>



                <input class="quantity-input js-quantity-input-${
                  matchingProducts.id
                }">
                <span class="save-quantity-link link-primary js-save-link" data-product-id="${
                  matchingProducts.id
                }">
                  Save
                </span>
                <span class="delete-quantity-link link-primary js-delete-cartItem" data-product-id="${
                  matchingProducts.id
                }">
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
    } else {
      console.error(
        `No matching delivery option found for ID: ${cartItem.deliveryOptionsId}`
      );
    }
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
        data-product-id="${matchingProducts.id}"
        data-delivery-option-id="${deliveryoptions.id}">
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
      renderPaymentSummary();
    });
  });

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOptions(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });

  document.querySelectorAll(".js-update-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      console.log(productId);

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.classList.add("is-editing-quantity");
    });
  });

  document.querySelectorAll(".js-save-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      const quantityInput = container.querySelector(
        `.js-quantity-input-${productId}`
      );
      const newQuantity = Number(quantityInput.value);

      if (newQuantity < 0 || newQuantity >= 1000) {
        alert("Quantity must be at least 0 and less than 1000");
        return;
      }

      container.classList.remove("is-editing-quantity");
      updateQuantity(productId, newQuantity);

      const quantityLabel = document.querySelector(
        `.js-quantity-label-${productId}`
      );
      quantityLabel.innerHTML = newQuantity;

      renderPaymentSummary();
    });
  });
}

renderOrderSummary();
