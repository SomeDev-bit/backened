import express from 'express';
import { getUserProfile, updateUser, userLogin, userRegister } from '../controller/userController.js';
import Joi from 'joi';
import validate from 'express-joi-validation';
import { checkUser } from '../middlewares/checkAuth.js';
const validator = validate.createValidator({});



const router = express.Router();


const common = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
}
const loginSchema = Joi.object({ ...common });

const registerSchema = Joi.object({
  username: Joi.string().min(5).max(20).required(),
  ...common
})
router.route('/login').post(validator.body(loginSchema), userLogin);
router.route('/register').post(validator.body(registerSchema), userRegister);
router.route('/:id').get(checkUser, getUserProfile).patch(checkUser, updateUser);





export default router;