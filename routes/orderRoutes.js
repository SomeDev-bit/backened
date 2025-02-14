import express from 'express';
import { checkAdmin, checkUser } from '../middlewares/checkAuth.js';
import { getOrderById, getOrderByUser, getOrders, orderCreate } from '../controller/orderController.js';


const router = express.Router();



router.route('/').get(checkUser, checkAdmin, getOrders).post(checkUser, orderCreate);
router.route('/users/:id').get(getOrderByUser);
router.route('/:id').get(getOrderById);








export default router;