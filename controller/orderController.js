import { Order } from "../models/Order.js";




export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    return res.status(200).json(orders);
  } catch (err) {
    return res.status(400).json({ mesage: '$err' });
  }
}



export const orderCreate = async (req, res) => {

  const { products, totalAmount } = req.body;
  try {
    await Order.create({
      userId: req.userId,
      products,
      totalAmount
    });
    return res.status(201).json({ message: 'order successfully created' });
  } catch (err) {
    return res.status(400).json({ mesage: '$err' });
  }
}


export const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id).populate({
      path: 'userId',
      select: 'email username'
    });
    return res.status(200).json(order);
  } catch (err) {
    return res.status(400).json({ mesage: '$err' });
  }
}



export const getOrderByUser = async (req, res) => {
  const { id } = req.params;
  try {
    const orders = await Order.find({ userId: id });
    return res.status(200).json(orders);
  } catch (err) {
    return res.status(400).json({ mesage: '$err' });
  }
}