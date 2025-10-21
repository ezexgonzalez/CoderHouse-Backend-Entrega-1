import { Router } from "express";
import ProductManager from "../managers/productManager.js";

const viewsRouter = Router();
const productManager = new ProductManager("./data/products.json");

// Vista home
viewsRouter.get("/", async (req, res) => {
  const products = await productManager.getProducts();
  res.render("home", { products });
});

// Vista realtimeproducts
viewsRouter.get("/realtimeproducts", async (req, res) => {
  const products = await productManager.getProducts();
  console.log(products);
  res.render("realTimeProducts",  {products});
});

export default viewsRouter;
