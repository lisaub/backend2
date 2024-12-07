const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Path to the products JSON file
const productsFilePath = path.join(__dirname, '../data/products.json');

// Helper function to load products from the JSON file
const loadProducts = () => {
  const data = fs.readFileSync(productsFilePath);
  return JSON.parse(data);
};

// Route for the home page
router.get('/', (req, res) => {
  const products = loadProducts();
  res.render('home', { products }); // Pass products to the view
});

// Route for real-time products page
router.get('/realtimeproducts', (req, res) => {
  const products = loadProducts();
  res.render('realTimeProducts', { products }); // Pass products to the real-time view
});

module.exports = router;
