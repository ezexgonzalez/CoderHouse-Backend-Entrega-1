# 🛒 API de Productos y Carritos

Entrega N°1 - Backend con **Node.js + Express**  
Persistencia en **File System** (`products.json` y `carts.json`).  

---

## 🚀 Instalación y uso
1. Clonar este repositorio:
   ```bash
   git clone https://github.com/TU-USUARIO/backend-ecommerce-entrega1.git
   cd backend-ecommerce-entrega1
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Ejecutar el servidor:
   ```bash
   node src/server.js
   ```
   Servidor disponible en:  
   👉 `http://localhost:8080`

---

## 📦 Endpoints disponibles

### 🔹 Productos (`/api/products`)
- **GET /** → lista todos los productos.  
- **GET /:pid** → devuelve un producto por id.  
- **POST /** → crea un producto nuevo.  
- **PUT /:pid** → actualiza un producto existente.  
- **DELETE /:pid** → elimina un producto por id.  

### 🔹 Carritos (`/api/carts`)
- **POST /** → crea un nuevo carrito.  
- **GET /:cid** → devuelve productos de un carrito.  
- **POST /:cid/product/:pid** → agrega un producto al carrito (si ya existe incrementa cantidad).  

## 👨‍💻 Autor
Desarrollado por **Ezequiel Gonzalez**  