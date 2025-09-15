import express from "express";
import productRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";


const app = express();

// Middlewares
app.use(express.json());


// Rutas

app.use("/api/products", productRouter);
app.use("/api/carts", cartsRouter);


// API/PRODUCTS





app.listen(8080, ()=>{
    console.log("Server iniciado");
});