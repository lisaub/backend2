MobileMania
MobileMania es una tienda de e-commerce para la venta de teléfonos, relojes inteligentes, auriculares y tabletas. Este proyecto está desarrollado utilizando Node.js y Express, y proporciona endpoints para gestionar productos y carritos de compra, así como funcionalidades en tiempo real mediante WebSockets.

Descripción del Proyecto
Este proyecto incluye:

Motor de plantillas Handlebars para renderizar vistas dinámicas.
WebSockets para la actualización en tiempo real de la lista de productos cuando se agregan o eliminan.
Vistas interactivas que muestran productos en una página normal y otra que actualiza la lista automáticamente usando WebSockets.
Requisitos
Node.js (versión recomendada: >=14.0.0)
npm (gestor de paquetes de Node.js)
Instalación
Clona el repositorio:
```plaintext
git clone https://github.com/lisaub/backend2.git
```
Accede al directorio del proyecto:

```plaintext
cd MobileMania
```
Instala las dependencias:

```plaintext
npm install
```
Estructura del Proyecto
La estructura de carpetas y archivos del proyecto es la siguiente:
```plaintext
├── public/
│   ├── js/
│   │   └── index.js               // Script para manejar eventos de cliente
├── src/
│   ├── app.js                     // Archivo principal del servidor
│   ├── routes/
│   │   └── views.router.js        // Enrutador de vistas
│   ├── data/
│   │   └── products.json          // Archivo de datos JSON para productos
│   ├── views/
│   │   ├── home.handlebars        // Vista de inicio con lista de productos
│   │   ├── realTimeProducts.handlebars // Vista de productos en tiempo real
│   │   └── layouts/
│   │       └── main.handlebars    // Layout principal
├── package.json                    // Dependencias y 
```

Instrucciones para Ejecutar
Inicia el servidor:
```plaintext
node src/app.js
```
Accede a la aplicación:

Navega a http://localhost:8080 para ver la página de inicio con la lista de productos.
Accede a http://localhost:8080/realtimeproducts para ver la lista de productos en tiempo real.
Funcionalidades
Página de inicio (/): Muestra una lista de productos cargada desde un archivo JSON.

Página de productos en tiempo real (/realtimeproducts): Muestra la misma lista de productos, pero se actualiza automáticamente cada vez que se agrega o elimina un producto mediante WebSockets.

Formulario para agregar productos: En la vista realTimeProducts.handlebars, se puede agregar un nuevo producto a través de un formulario. La lista de productos se actualiza en tiempo real gracias a la conexión de WebSockets.

Implementación de WebSockets
Configuración del servidor: Se integró socket.io para permitir la comunicación en tiempo real entre el servidor y el cliente.

Eventos de socket:

addProduct: Emite un nuevo producto desde el cliente y actualiza la lista de productos en la vista de tiempo real.
Actualización automática: La lista de productos se emite y recibe en tiempo real.


Pruebas
Verifica que el servidor se inicie correctamente en el puerto 8080.
Accede a la página de inicio y confirma que la lista de productos se muestra.
Prueba la vista en tiempo real y asegúrate de que la lista se actualice automáticamente al agregar productos.