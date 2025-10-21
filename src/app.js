import express from "express";
import productRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import http from "http";
import { Server } from "socket.io";
import { engine } from "express-handlebars";
import viewsRouter from "./routes/views.router.js";
import ProductManager from "./managers/productManager.js";


const app = express();
const server = http.createServer(app);
const io = new Server(server);

const productManager = new ProductManager("./data/products.json");

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

// Routes

app.use("/api/products", productRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);


// API/PRODUCTS

io.on("connection", async (socket) => {
  console.log("Nuevo cliente conectado");

  // Enviar productos iniciales
    const products = await productManager.getProducts()
    socket.emit("products", products);
  

  // Agregar producto desde cliente
  socket.on("newProduct", async (data) => {
    await productManager.addProduct(data);
    const products = await productManager.getProducts();
    io.emit("products", products); // actualizar todos los clientes
  });

  // Eliminar producto desde cliente
  socket.on("deleteProduct", async (id) => {
    await productManager.deleteProductById(id);
    const products = await productManager.getProducts();
    io.emit("products", products);
  });
});

server.listen(8080,() =>{
    console.log("Servidor inciado correctamente");
});