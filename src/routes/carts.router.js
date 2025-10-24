import { Router } from "express";
import CartModel from "../models/cart.model.js";

const router = Router();

// Crear nuevo carrito
router.post("/", async (req, res) => {
  try {
    const newCart = await cartModel.create({ products: [] });
    res.status(201).json({ status: "success", payload: newCart });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// Obtener carrito con populate
router.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartModel.findById(cid).populate("products.product");
    if (!cart) return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
    res.json({ status: "success", payload: cart });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// Agregar producto al carrito
router.post("/:cid/products/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cart = await cartModel.findById(cid);
    if (!cart) return res.status(404).json({ status: "error", message: "Carrito no encontrado" });

    const index = cart.products.findIndex(p => p.product.toString() === pid);
    if (index !== -1) {
      cart.products[index].quantity += 1;
    } else {
      cart.products.push({ product: pid, quantity: 1 });
    }

    await cart.save();
    res.json({ status: "success", payload: cart });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// Actualizar cantidad de un producto específico
router.put("/:cid/products/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    const cart = await cartModel.findById(cid);
    if (!cart) return res.status(404).json({ status: "error", message: "Carrito no encontrado" });

    const index = cart.products.findIndex(p => p.product.toString() === pid);
    if (index === -1) return res.status(404).json({ status: "error", message: "Producto no encontrado en carrito" });

    cart.products[index].quantity = quantity;
    await cart.save();
    res.json({ status: "success", payload: cart });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// Actualizar todos los productos del carrito
router.put("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const { products } = req.body; // [{product: id, quantity: n}, ...]
    const cart = await cartModel.findById(cid);
    if (!cart) return res.status(404).json({ status: "error", message: "Carrito no encontrado" });

    cart.products = products;
    await cart.save();
    res.json({ status: "success", payload: cart });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// Eliminar un producto del carrito
router.delete("/:cid/products/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cart = await cartModel.findById(cid);
    if (!cart) return res.status(404).json({ status: "error", message: "Carrito no encontrado" });

    cart.products = cart.products.filter(p => p.product.toString() !== pid);
    await cart.save();
    res.json({ status: "success", payload: cart });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// Vaciar carrito
router.delete("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartModel.findById(cid);
    if (!cart) return res.status(404).json({ status: "error", message: "Carrito no encontrado" });

    cart.products = [];
    await cart.save();
    res.json({ status: "success", payload: cart });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

export default router;
