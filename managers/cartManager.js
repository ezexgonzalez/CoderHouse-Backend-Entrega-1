import { promises as fs } from "fs";

class CartManager {
    constructor(path) {
        this.path = path;
    }
    generateNewId() {
        return crypto.randomUUID();
    }

    async getDataFile() {
        const fileData = await fs.readFile(this.path, "utf-8");
        const products = JSON.parse(fileData);
        return products;
    }

    async writeFile(data) {
        await fs.writeFile(this.path, JSON.stringify(data, null, 2));
    }

    async createCart() {
        const carts = await this.getDataFile();
        const id = this.generateNewId();
        const newCart = { id, products: [] };
        carts.push(newCart);
        await this.writeFile(carts);
        return newCart;
    }

    async getCartById(id) {
        const carts = await this.getDataFile();
        return carts.find((c) => c.id === id);
    }

    async addProductToCart(cid, pid) {
        const carts = await this.getDataFile();
        const cart = carts.find((c) => c.id === cid);
        if (!cart) return null;

        const productIndex = cart.products.findIndex((p) => p.product === pid);
        if (productIndex !== -1) {
            cart.products[productIndex].quantity++;
        } else {
            cart.products.push({ product: pid, quantity: 1 });
        }

        await this.writeFile(carts);
        return cart;
    }
}

export default CartManager;