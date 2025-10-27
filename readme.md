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

## Instalación y ejecución

1. Clonar el repositorio:
- bash
git clone https://github.com/ezexgonzalez/CoderHouse-Backend-Entrega-1.git
cd CoderHouse-Backend-Entrega-1

## Endpoints principales
- Productos

GET	/api/products	Listar productos con paginación, filtros (query) y ordenamiento (sort)
GET	/api/products/:pid	Obtener producto por ID
POST	/api/products	Crear un nuevo producto
PUT	/api/products/:pid	Actualizar producto existente
DELETE	/api/products/:pid	Eliminar producto

- Query params para GET /api/products

limit (opcional, default 10) → cantidad de productos por página.

page (opcional, default 1) → número de página.

sort (opcional, asc o desc) → ordenamiento por precio.

query (opcional) → filtro por categoría (category:Electrónica) o disponibilidad (status:true).

## 👨‍💻 Autor
Desarrollado por **Ezequiel Gonzalez**   