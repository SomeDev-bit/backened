import { User } from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";

export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {

    const isExist = await User.findOne({ email: email });

    if (!isExist) {
      return res.status(401).json({
        message: 'invalid credential'
      });
    }

    const passCom = bcrypt.compareSync(password, isExist.password);

    if (!passCom) return res.status(401).json({
      message: 'invalid credential'
    });

    const token = jwt.sign({
      userId: isExist._id,
      role: isExist.role
    }, 'secret');

    res.cookie('token', 'mytoken', {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 24 * 60 * 60 * 1000
    });

    return res.status(200).json({
      message: 'user succesfully login',
      data: {
        token,
        role: isExist.role,
        userId: isExist._id
      }
    });
  } catch (err) {
    return res.status(400).json({
      message: `${err}`
    });
  }
}



export const userRegister = async (req, res) => {
  const { username, email, password } = req.body;
  try {

    const isExist = await User.findOne({ email: email });

    if (isExist) {
      return res.status(409).json({
        message: 'user already exist'
      });
    }

    const hashPass = bcrypt.hashSync(password, 10);
    await User.create({
      username,
      email,
      password: hashPass
    });
    return res.status(200).json({
      message: 'user succesfully registered'
    });
  } catch (err) {
    return res.status(400).json({
      message: `${err}`
    });
  }

}



export const getUserProfile = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: 'please provide valid id' });

    const user = await User.findById(id).select('-password');
    if (!user) return res.status(404).json({ message: 'user not found' });
    return res.status(200).json(user);
  } catch (err) {
    return res.status(400).json({
      message: `${err}`
    });
  }

}

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email } = req.body;

  try {
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: 'please provide valid id' });

    const isExist = await User.findById(id);
    if (!isExist) return res.status(404).json({ message: 'user not found' });

    isExist.username = username || isExist.username;
    isExist.email = email || isExist.email;

    await isExist.save();

    return res.status(200).json({
      message: 'user updated successfully'
    });
  } catch (err) {
    return res.status(400).json({
      message: `${err}`
    });
  }

}