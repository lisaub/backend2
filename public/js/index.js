const socket = io();

// Listen for product updates
socket.on('updateProducts', (data) => {
  const productList = document.getElementById('productList');
  productList.innerHTML = '';
  data.products.forEach((product) => {
    const productItem = document.createElement('li');
    productItem.classList.add('product-item');
    productItem.innerHTML = `
      <h2>${product.title}</h2>
      <p>Price: $${product.price}</p>
      <p>Description: ${product.description}</p>
      <p>Stock: ${product.stock}</p>
      <p>Status: ${product.status ? 'Available' : 'Out of Stock'}</p>
    `;
    productList.appendChild(productItem);
  });
});

// Handle product addition form submission
document.getElementById('productForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('productName').value;
  const price = document.getElementById('productPrice').value;

  socket.emit('addProduct', { title, price });

  // Clear the form
  document.getElementById('productName').value = '';
  document.getElementById('productPrice').value = '';
});
