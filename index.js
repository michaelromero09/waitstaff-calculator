'use strict';

let STORE = {
  tipTotal: 0,
  mealCount: 0,
  subtotal: 0,
  tip: 0
};

function renderCustomerCharge() {
  console.log('Rendering customer charge');
  $('.customer-charges').html(`
    <h3>Customer Charges</h3>
    <p>Subtotal <span class="subtotal">${STORE.subtotal.toFixed(2)}</span></p>
    <p>Tip <span class="tip">${STORE.tip.toFixed(2)}</span></p>
    <p>Total <span class="total">${(STORE.subtotal + STORE.tip).toFixed(2)}</span></p>
  `);
}

function renderMyEarnings() {
  console.log('Rendering customer charge');
  $('.my-earnings-info').html(`
    <h3>My Earnings Info</h3>
    <p>Tip Total <span class="tip-total">${STORE.tipTotal.toFixed(2)}</span></p>
    <p>Meal count <span class="meal-count">${STORE.mealCount}</span></p>
    <p>Average Tip Per Meal <span class="avg-tip">${STORE.mealCount ? (STORE.tipTotal / STORE.mealCount).toFixed(2) : (0).toFixed(2)}</span></p>
  `);
}

function handleSubmit(price, taxRate, tipRate) {
  console.log('Calculating');
  STORE.subtotal = price + price * (taxRate / 100);
  STORE.tip = price * (tipRate / 100);
  STORE.mealCount = STORE.mealCount + 1;
  STORE.tipTotal = STORE.tipTotal + STORE.tip;
  renderCustomerCharge();
  renderMyEarnings();
}

function handleSubmitButtonClick() {
  $('form').on('click', '.submit-button', (e) => {
    e.preventDefault();
    console.log('Submitting form');
    const mealPrice = parseInt($('.meal-price').val());
    const taxRate = parseInt($('.tax-rate').val());
    const tipRate = parseInt($('.tip-rate').val());
    handleSubmit(mealPrice, taxRate, tipRate);
    clearForm();
  });
}

function handleCancelButtonClick() {
  $('form').on('click', '.cancel-button', (e) => {
    e.preventDefault();
    console.log('Clearing form');
    clearForm();
  });
}

function clearForm() {
  $('.meal-price').val('');
  $('.tax-rate').val('');
  $('.tip-rate').val('');
}

function main() {
  console.log('Page Loaded');
  renderCustomerCharge();
  renderMyEarnings();
  handleSubmitButtonClick();
  handleCancelButtonClick();
}

$(main);