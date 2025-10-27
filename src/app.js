import express from "express";
import productRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import http from "http";
import connectDB from './config/db.js';
import { Server } from "socket.io";
import { engine } from "express-handlebars";
import viewsRouter from "./routes/views.router.js";
import ProductManager from "./managers/productManager.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 8080;

//Conexión a MongoDB
connectDB();

const server = http.createServer(app);
const io = new Server(server);

const productManager = new ProductManager("./data/products.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use( express.static("public"));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

// Routes

app.use("/api/products", productRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);


// API/PRODUCTS

io.on("connection", async (socket) => {
  console.log("🟢 Nuevo cliente conectado");

  // Enviar productos iniciales
  const products = await productManager.getProducts();
  socket.emit("products", products);

  // Agregar producto
  socket.on("newProduct", async (data) => {
    await productManager.addProduct(data);
    const updatedProducts = await productManager.getProducts();
    io.emit("products", updatedProducts); // actualizar todos los clientes
  });

  // Eliminar producto
  socket.on("deleteProduct", async (id) => {
    await productManager.deleteProductById(id);
    const updatedProducts = await productManager.getProducts();
    io.emit("products", updatedProducts); // actualizar todos los clientes
  });
});

server.listen(PORT,() =>{
    console.log("Servidor inciado correctamente");
});