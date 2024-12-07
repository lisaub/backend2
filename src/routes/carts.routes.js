const express = require('express');
const router = express.Router();
const CartManager = require('../managers/cartsManager');
const ProductManager = require('../managers/productsManager');

const cartManager = new CartManager();
const productManager = new ProductManager();

router.post('/', (req, res) => {
  try {
    const newCart = cartManager.createCart();
    res.status(201).json(newCart);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error creating cart" });
  }
});

router.get('/:cid', (req, res) => {
  try {
    const cart = cartManager.getCartById(req.params.cid);
    if (!cart) {
      return res.status(404).send({ message: "Cart not found" });
    }
    res.json(cart);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error retrieving cart" });
  }
});

router.post('/:cid/product/:pid', async (req, res) => {
  try {
    const product = await productManager.getProductById(req.params.pid);
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }
    const updatedCart = await cartManager.addProductToCart(req.params.cid, req.params.pid);
    res.json(updatedCart);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error adding product to cart" });
  }
});

module.exports = router;