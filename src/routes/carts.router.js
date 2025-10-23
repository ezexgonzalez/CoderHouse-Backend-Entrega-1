import { Router } from "express";
import CartModel from "../models/cart.model.js";

const router = Router();

// Crear un nuevo carrito
router.post("/", async (req, res) => {
  try {
    const newCart = new CartModel({ products: [] });
    await newCart.save();
    res.status(201).json({ message: "Carrito creado", cart: newCart });
  } catch (error) {
    res.status(500).json({ error: "Error al crear el carrito" });
  }
});

// Obtener un carrito por ID con productos populados
router.get("/:cid", async (req, res) => {
  try {
    const cart = await CartModel.findById(req.params.cid).populate("products.product");
    if (!cart) return res.status(404).json({ error: "Carrito no encontrado" });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el carrito" });
  }
});

// Agregar un producto al carrito
router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cart = await CartModel.findById(req.params.cid);
    if (!cart) return res.status(404).json({ error: "Carrito no encontrado" });

    const productId = req.params.pid;
    const existingProduct = cart.products.find(p => p.product.toString() === productId);

    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      cart.products.push({ product: productId, quantity: 1 });
    }

    await cart.save();
    res.json({ message: "Producto agregado al carrito", cart });
  } catch (error) {
    res.status(500).json({ error: "Error al agregar el producto" });
  }
});

export default router;
