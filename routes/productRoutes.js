import express from 'express';
import { createProduct, getAllProducts, getSingleProduct, removeProduct, updateProduct } from '../controller/productController.js';
import { checkAdmin, checkUser } from '../middlewares/checkAuth.js';
import { checkFile } from '../middlewares/checkFile.js';
import Joi from 'joi';
import validate from 'express-joi-validation';
import { idValid } from '../middlewares/idValid.js';
const validator = validate.createValidator({});

const router = express.Router();


const prodSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  category: Joi.string().required(),
  brand: Joi.string().required(),
});


/*
products / post get- price page
products/:id  update, single , remove
*/



router.route('/').get(getAllProducts).post(checkUser, checkAdmin, validator.body(prodSchema), checkFile, createProduct);

router.route('/:id').get(idValid, getSingleProduct).patch(idValid, checkUser, checkAdmin, updateProduct).delete(idValid, checkUser, checkAdmin, removeProduct);



export default router;