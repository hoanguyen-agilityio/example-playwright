const BASE_URL = '/';
const PRODUCTS_URL = 'https://www.saucedemo.com/inventory.html';
const CHECKOUT_STEP_ONE_URL = 'https://www.saucedemo.com/checkout-step-one.html'

const PATH = {
  CHECKOUT_COMPLETE: /.*checkout-complete/,
  INVENTORY: /.*inventory/,
  CART: /.*cart/,
  CHECKOUT_STEP_ONE: /.*checkout-step-one/,
  DETAILS_PAGE: /inventory-item\.html\?id=\d+/
}

export { 
  BASE_URL, 
  PRODUCTS_URL, 
  CHECKOUT_STEP_ONE_URL,
  PATH 
};