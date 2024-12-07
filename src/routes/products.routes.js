const express = require('express');
const router = express.Router();
const ProductManager = require('../managers/productsManager');

const productManager = new ProductManager();

router.get('/', async (req, res) => {
  console.log("GET /products request received");
  const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
  try {
    const products = await productManager.getProducts(limit);
    console.log("Products retrieved:", products);
    res.json(products);
  } catch (error) {
    console.error("Error retrieving products:", error);
    res.status(500).send({ message: "Error retrieving products" });
  }
});



router.get('/:pid', async (req, res) => {
  try {
    const product = await productManager.getProductById(req.params.pid);
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error retrieving product" });
  }
});

router.post('/', async (req, res) => {
  try {
    const newProduct = await productManager.addProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
});

router.put('/:pid', async (req, res) => {
  try {
    const updatedProduct = await productManager.updateProduct(req.params.pid, req.body);
    if (!updatedProduct) {
      return res.status(404).send({ message: "Product not found" });
    }
    res.json(updatedProduct);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
});

router.delete('/:pid', async (req, res) => {
  try {
    const deletedProduct = await productManager.deleteProduct(req.params.pid);
    if (!deletedProduct) {
      return res.status(404).send({ message: "Product not found" });
    }
    res.send({ message: "Product deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error deleting product" });
  }
});

module.exports = router;