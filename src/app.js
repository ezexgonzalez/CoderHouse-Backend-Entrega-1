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

io.on("connection", (socket) =>{
      console.log("Nuevo cliente conectado");

  // Enviar lista de productos inicial al conectarse
  socket.emit("products", productManager.getProducts());

  // Escuchar producto nuevo desde cliente
  socket.on("newProduct", async (data) => {
    await productManager.addProduct(data);
    io.emit("products", productManager.getProducts()); // actualizar todos los clientes
  });

  // Escuchar eliminación de producto desde cliente
  socket.on("deleteProduct", async (id) => {
    await productManager.deleteProduct(id);
    io.emit("products", productManager.getProducts());
  });
});


server.listen(8080,() =>{
    console.log("Servidor inciado correctamente");
});