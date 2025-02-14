import express from 'express';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import mongoose from 'mongoose';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();



mongoose.connect('mongodb+srv://batchdevops431:moles900@cluster0.jvc1g.mongodb.net/Shop').then((val) => {
  app.listen(5000, () => {
    console.log('server running');
  });
}).catch((err) => {
  console.log(err)
});


app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true
}));



app.use(cookieParser());

app.use(express.json());
app.use(express.static('./uploads'));
app.use(fileUpload({
  limits: { fileSize: 5 * 1024 * 1024 },
  abortOnLimit: true
}));


app.get('/', (req, res) => {

  return res.status(200).json({
    status: 'success',
    message: 'Welcome To Backened'
  });
});


app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

