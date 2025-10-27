# 🛒 Backend E-commerce - Proyecto Final

## Descripción
Backend de e-commerce desarrollado con **Node.js**, **Express** y **MongoDB**, que permite:

- Gestión de productos y carritos.
- Consultas profesionales con filtros, paginación y ordenamiento.
- Visualización de productos en tiempo real con **Socket.IO**.
- Vistas renderizadas con **Handlebars**.

---

## Tecnologías
- Node.js, Express
- MongoDB + Mongoose
- Handlebars
- Socket.IO
- dotenv

---

## Instalación
1. Clonar el repositorio:
```bash
git clone https://github.com/ezexgonzalez/CoderHouse-Backend-Entrega-1.git
cd CoderHouse-Backend-Entrega-1
Instalar dependencias:

bash
Copiar código
npm install
Configurar .env:

ini
Copiar código
MONGO_URL=<tu_mongo_atlas_uri>
PORT=8080
Ejecutar el servidor:

bash
Copiar código
npm start
Servidor: http://localhost:8080

Endpoints principales
Productos
Método	Ruta	Descripción
GET	/api/products	Listar productos con paginación, filtros y ordenamiento (limit, page, sort, query)
GET	/api/products/:pid	Obtener producto por ID
POST	/api/products	Crear producto
PUT	/api/products/:pid	Actualizar producto
DELETE	/api/products/:pid	Eliminar producto

Carritos
Método	Ruta	Descripción
POST	/api/carts	Crear nuevo carrito
GET	/api/carts/:cid	Obtener carrito con productos (populate)
POST	/api/carts/:cid/products/:pid	Agregar producto al carrito
PUT	/api/carts/:cid/products/:pid	Actualizar cantidad de un producto
PUT	/api/carts/:cid	Actualizar todo el carrito
DELETE	/api/carts/:cid/products/:pid	Eliminar un producto
DELETE	/api/carts/:cid	Vaciar carrito

Vistas
/ → Lista de productos.

/realtimeproducts → Productos en tiempo real.

/products/:pid → Detalle de producto y agregar al carrito.

/carts/:cid → Visualización del carrito.

Socket.IO
Eventos:

newProduct → Agregar producto

deleteProduct → Eliminar producto

Todos los clientes reciben products para actualizar la vista automáticamente.

## 👨‍💻 Autor
Desarrollado por **Ezequiel Gonzalez**  