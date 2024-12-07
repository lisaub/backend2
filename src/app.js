const express = require('express');
const { Server } = require('socket.io');
const handlebars = require('express-handlebars');
const path = require('path');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = new Server(server);

app.set('views', path.join(__dirname, 'views'));
// Set up Handlebars as the view engine
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

// Middleware to parse form submissions
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Import routes
const viewsRouter = require('./routes/views.router');
const productsRouter = require('./routes/products.routes');
const cartsRouter = require('./routes/carts.routes');

// Use routes
app.use('/', viewsRouter);
app.use('/products', productsRouter);
app.use('/carts', cartsRouter);

io.on('connection', (socket) => {
  console.log('Client connected');

  // Listen for 'addProduct' event from client and emit updates
  socket.on('addProduct', (product) => {
    console.log('Product added:', product);
    // You need to add logic to update your product data source (e.g., `products.json`)
    // For simplicity, we'll emit an 'updateProducts' event with the updated product list
    // Make sure to read and modify the products data source here
    io.emit('updateProducts', { products: getUpdatedProducts() }); // Implement `getUpdatedProducts` to return the current product list
  });

  // Example for handling 'deleteProduct' if needed
  socket.on('deleteProduct', (productId) => {
    console.log('Product deleted:', productId);
    // Implement logic to remove product from the data source
    io.emit('updateProducts', { products: getUpdatedProducts() });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});


// Start server
const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
