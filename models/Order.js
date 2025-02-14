import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: [
    {
      title: { type: String, required: true },
      description: { type: String, required: true },
      price: { type: Number, required: true },
      category: { type: String, required: true },
      brand: { type: String, required: true },
      image: { type: String, required: true },
      qty: { type: Number, required: true }
    }
  ],
  totalAmount: {
    type: Number,
    required: true
  }

}, { timestamps: true });

export const Order = mongoose.model('Order', orderSchema);