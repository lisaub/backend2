const express = require('express');
const { Server } = require('socket.io');
const handlebars = require('express-handlebars');
const path = require('path');
const fs = require('fs');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = new Server(server);

// Path to the products JSON file
const productsFilePath = path.join(__dirname, 'data/products.json');

// Helper function to load products
const getUpdatedProducts = () => {
  const data = fs.readFileSync(productsFilePath, 'utf-8');
  return JSON.parse(data);
};

// Helper function to save products
const saveProducts = (products) => {
  fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
};

// Configure Handlebars
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Import routes
const viewsRouter = require('./routes/views.router');
app.use('/', viewsRouter);

// Socket.io connection
io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('addProduct', (product) => {
    console.log('Product added:', product);
    const products = getUpdatedProducts();
    products.push({ ...product, description: 'No description', stock: 10, status: true });
    saveProducts(products);

    io.emit('updateProducts', { products });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Start the server
const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
