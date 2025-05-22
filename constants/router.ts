const BASE_URL = '/';
const PRODUCTS_URL = 'https://www.saucedemo.com/inventory.html';
const CHECKOUT_URL = /.*checkout-complete/;
const INVENTORY_URL = /.*inventory/;
const CART_URL = /.*cart/;
const CHECKOUT_STEP_ONE = /.*checkout-step-one/;
const DETAILS_PAGE_URL = /inventory-item\.html\?id=\d+/

export { 
  BASE_URL, 
  PRODUCTS_URL, 
  CHECKOUT_URL, 
  INVENTORY_URL, 
  CART_URL, 
  CHECKOUT_STEP_ONE,
  DETAILS_PAGE_URL 
};