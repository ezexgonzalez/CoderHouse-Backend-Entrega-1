import CartModel from '../models/cart.model.js';

class CartManager {
  async createCart() {
    try {
      const newCart = await CartModel.create({ products: [] });
      return newCart;
    } catch (error) {
      console.error('Error al crear carrito:', error);
      throw error;
    }
  }

  async getCartById(cid) {
    try {
      // populate para traer productos completos
      return await CartModel.findById(cid).populate('products.product').lean();
    } catch (error) {
      console.error('Error al obtener carrito:', error);
      throw error;
    }
  }

  async addProductToCart(cid, pid) {
    try {
      const cart = await CartModel.findById(cid);
      if (!cart) return null;

      const productIndex = cart.products.findIndex(p => p.product.toString() === pid);

      if (productIndex !== -1) {
        cart.products[productIndex].quantity++;
      } else {
        cart.products.push({ product: pid, quantity: 1 });
      }

      await cart.save();
      return cart;
    } catch (error) {
      console.error('Error al agregar producto al carrito:', error);
      throw error;
    }
  }

  async deleteProductFromCart(cid, pid) {
    try {
      const cart = await CartModel.findById(cid);
      if (!cart) return null;

      cart.products = cart.products.filter(p => p.product.toString() !== pid);
      await cart.save();
      return cart;
    } catch (error) {
      console.error('Error al eliminar producto del carrito:', error);
      throw error;
    }
  }

  async updateCart(cid, products) {
    try {
      return await CartModel.updateOne({ _id: cid }, { $set: { products } });
    } catch (error) {
      console.error('Error al actualizar carrito:', error);
      throw error;
    }
  }

  async updateProductQuantity(cid, pid, quantity) {
    try {
      const cart = await CartModel.findById(cid);
      if (!cart) return null;

      const product = cart.products.find(p => p.product.toString() === pid);
      if (!product) return null;

      product.quantity = quantity;
      await cart.save();
      return cart;
    } catch (error) {
      console.error('Error al actualizar cantidad de producto:', error);
      throw error;
    }
  }

  async clearCart(cid) {
    try {
      return await CartModel.updateOne({ _id: cid }, { $set: { products: [] } });
    } catch (error) {
      console.error('Error al vaciar carrito:', error);
      throw error;
    }
  }
}

export default CartManager;