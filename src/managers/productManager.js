import ProductModel from '../models/product.model.js';

class ProductManager {
  async getProducts(limit) {
    try {
      if (limit) {
        return await ProductModel.find().limit(limit).lean();
      }
      return await ProductModel.find().lean();
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      throw error;
    }
  }

  async getProductById(id) {
    try {
      return await ProductModel.findById(id).lean();
    } catch (error) {
      console.error('Error al obtener producto por ID:', error);
      throw error;
    }
  }

  async addProduct(productData) {
    try {
      const product = await ProductModel.create(productData);
      return product;
    } catch (error) {
      console.error('Error al agregar producto:', error);
      throw error;
    }
  }

  async updateProductById(id, data) {
    try {
      return await ProductModel.updateOne({ _id: id }, { $set: data });
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      throw error;
    }
  }

  async deleteProductById(id) {
    try {
      return await ProductModel.deleteOne({ _id: id });
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      throw error;
    }
  }
} 




export default ProductManager;