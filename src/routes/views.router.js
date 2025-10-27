import { Router } from "express";
import ProductManager from "../managers/productManager.js";
import CartModel from "../models/cart.model.js";
import ProductModel from "../models/product.model.js";

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
  res.render("realTimeProducts",  {products});
});

viewsRouter.get('/products', async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;

    const filter = query
      ? { $or: [{ category: query }, { status: query === 'true' }] }
      : {};

    const sortOption = sort === 'asc' ? { price: 1 } : sort === 'desc' ? { price: -1 } : {};

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: sortOption,
      lean: true
    };

    const result = await ProductModel.paginate(filter, options);

    res.render('products', {
      products: result.docs,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      totalPages: result.totalPages
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al cargar la vista de productos');
  }
});

// Vista de carrito con populate
viewsRouter.get("/carts/:cid", async (req, res) => {
  try {
    const cart = await CartModel.findById(req.params.cid).populate("products.product").lean();

    if (!cart) return res.status(404).send("Carrito no encontrado");

    res.render("cart", { cart });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al mostrar el carrito");
  }
});

viewsRouter.get("/products/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await ProductModel.findById(pid).lean();

    if (!product)
      return res.status(404).send("Producto no encontrado");

    res.render("productDetail", { product });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al cargar detalle de producto");
  }
});


export default viewsRouter;
