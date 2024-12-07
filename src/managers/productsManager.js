const fs = require('fs');
const path = require('path');

class ProductManager {
  constructor() {
    this.filePath = path.join(__dirname, 'data', 'products.json');
  }

  getProducts(limit) {
    const products = JSON.parse(fs.readFileSync(this.filePath, 'utf-8'));
    return limit ? products.slice(0, limit) : products;
  }

  getProductById(id) {
    const products = JSON.parse(fs.readFileSync(this.filePath, 'utf-8'));
    return products.find(product => product.id === id);
  }

  addProduct(product) {
    const products = JSON.parse(fs.readFileSync(this.filePath, 'utf-8'));

    // Validate required fields
    const { title, description, price, code, stock, category } = product;
    if (!title || !description || !price || !code || !stock || !category) {
      throw new Error("All fields are mandatory (id, title, description, price, thumbnail, code, stock, category, status) except thumbnails.");
    }

    // Validate unique code
    const productExist = products.find(p => p.code === code);
    if (productExist) {
      throw new Error(`A product already exists with code ${code}`);
    }

    // Generate numeric ID
    const lastProduct = products.reduce((max, product) => product.id > max ? product.id : max, 0);
    let storeID=parseInt(lastProduct)+1;
    product.id = storeID;

    products.push(product);
    fs.writeFileSync(this.filePath, JSON.stringify(products, null, 2));
    return product;
  }

  updateProduct(id, updatedProduct) {
    const products = JSON.parse(fs.readFileSync(this.filePath, 'utf-8'));
    const index = products.findIndex(product => product.id === id);

    if (index !== -1) {
      // Validate fields to update
      const allowedFields = ["title", "description", "price", "thumbnail", "code", "stock", "status", "category"];
      const updateData = {};
      for (const key in updatedProduct) {
        if (allowedFields.includes(key)) {
          updateData[key] = updatedProduct[key];
        }
      }

      products[index] = { ...products[index], ...updateData };
      fs.writeFileSync(this.filePath, JSON.stringify(products, null, 2));
      return products[index];
    }
    return null;
  }

  deleteProduct(id) {
    const products = JSON.parse(fs.readFileSync(this.filePath, 'utf-8'));
    const index = products.findIndex(product => product.id === id);
    if (index !== -1) {
      const deletedProduct = products.splice(index, 1);
      fs.writeFileSync(this.filePath, JSON.stringify(products, null, 2));
      return deletedProduct;
    }
    return null;
  }
}

module.exports = ProductManager;