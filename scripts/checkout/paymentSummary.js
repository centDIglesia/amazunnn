import { cart,updateCArtItemQuantity } from "../../data/cart";
import { getDeliveryOptions } from "../../data/deliveryOptions";
import { getProducts } from "../../data/products";
import formatcurrency from "../utils/money";


export function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;
  cart.forEach((cartItem) => {
    const matchingProduct = getProducts(cartItem.id);

    productPriceCents += matchingProduct.priceCents * cartItem.quantity;

    const deliveryOption = getDeliveryOptions(cartItem.deliveryOptionsId);
    shippingPriceCents += deliveryOption.priceCents;
  });

  const totaBeforeTax = productPriceCents + shippingPriceCents;
  const taxCents = totaBeforeTax * 0.1;

  const totalcents = totaBeforeTax + taxCents;

  const paymentSmmaryHTML = `
          <div class="payment-summary-title">
                Order Summary
          </div>

          <div class="payment-summary-row">
                <div>Items (${updateCArtItemQuantity()}):</div>
                <div class="payment-summary-money">$${formatcurrency(
                  productPriceCents
                )}</div>
          </div>

          <div class="payment-summary-row">
                <div>Shipping &amp; handling:</div>
                <div class="payment-summary-money">$${formatcurrency(
                  shippingPriceCents
                )}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
                <div>Total before tax:</div>
                <div class="payment-summary-money">$${formatcurrency(
                  totaBeforeTax
                )}</div>
          </div>

          <div class="payment-summary-row">
                <div>Estimated tax (10%):</div>
                <div class="payment-summary-money">$${formatcurrency(
                  taxCents
                )}</div>
          </div>

          <div class="payment-summary-row total-row">
                <div>Order total:</div>
                <div class="payment-summary-money">$${formatcurrency(
                  totalcents
                )}</div>
          </div>

          <button class="place-order-button button-primary">
                Place your order
          </button>`;


          document.querySelector('.js-payment-summary').innerHTML = paymentSmmaryHTML;
}
