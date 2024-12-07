const socket = io();

// Listen for real-time product updates
socket.on('updateProducts', (data) => {
  console.log('Received data:', data);
  const productList = document.querySelector('#realTimeProductList');
  
  // Clear existing list and repopulate it for simplicity
  productList.innerHTML = '';
  
  // Example logic to handle new products or deletions
  if (data.deletedId) {
    console.log('Product deleted with ID:', data.deletedId);
  } else {
    const newItem = document.createElement('li');
    newItem.textContent = `Product: ${data.product.title}, Price: ${data.product.price}`;
    productList.appendChild(newItem);
  }
});

// Add product form event listener
document.querySelector('#addProductForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const productName = document.querySelector('#productName').value;
  const productPrice = document.querySelector('#productPrice').value;

  // Send the new product to the server
  socket.emit('addProduct', { title: productName, price: productPrice });

  // Clear form fields
  document.querySelector('#productName').value = '';
  document.querySelector('#productPrice').value = '';
});
