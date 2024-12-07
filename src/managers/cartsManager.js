const fs = require('fs');
const path = require('path');

class CartManager {
  constructor() {
    this.filePath = path.join(__dirname, 'data', 'carts.json');
  }

  getCarts() {
    const carts = JSON.parse(fs.readFileSync(this.filePath, 'utf-8'));
    return carts;
  }

  getCartById(id) {
    const carts = JSON.parse(fs.readFileSync(this.filePath, 'utf-8'));
    return carts.find(cart => cart.id === id);
  }

    createCart() {
    const carts = JSON.parse(fs.readFileSync(this.filePath, 'utf-8'));

    // Generate a unique string ID
    const lastCart = carts.reduce((max, cart) => cart.id > max ? cart.id : max, '0');
    const newId = (parseInt(lastCart, 10) + 1).toString();

    const newCart = {
      id: newId,
      products: []
    };
    carts.push(newCart);
    fs.writeFileSync(this.filePath, JSON.stringify(carts, null, 2));
    return newCart;
  }

  addProductToCart(cartId, productId) {
    const carts = JSON.parse(fs.readFileSync(this.filePath, 'utf-8'));
    const cart = carts.find(cart => cart.id === cartId);
    if (cart) {
      const productIndex = cart.products.findIndex(product => product.id === productId);
      if (productIndex !== -1) {
        cart.products[productIndex].quantity += 1;
      } else {
        cart.products.push({ id: productId, quantity: 1 });
      }
      fs.writeFileSync(this.filePath, JSON.stringify(carts, null, 2));
      return cart;
    }
    return null;
  }
}

module.exports = CartManager;