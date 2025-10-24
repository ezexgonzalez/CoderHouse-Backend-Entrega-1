import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      },
      quantity: { type: Number, default: 1 }
    }
  ],
  default: []
});

const CartModel = mongoose.model('Cart', cartSchema);

export default CartModel;
