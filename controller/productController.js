import { Product } from "../models/Product.js";
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';


export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).json(products);
  } catch (err) {
    return res.status(400).json({ message: `${err}` });
  }
}

export const getSingleProduct = async (req, res) => {
  const { id } = req.params
  try {
    const product = await Product.findById(id);
    return res.status(200).json(product);
  } catch (err) {
    return res.status(400).json({ message: `${err}` });
  }
}



export const createProduct = async (req, res) => {
  const { title, description, price, category, brand } = req.body;
  try {
    await Product.create({
      title,
      description,
      price: Number(price),
      category,
      brand,
      image: req.image
    });
    return res.status(200).json({
      message: 'product created successfully'
    })

  } catch (err) {
    fs.unlink(`./uploads/${req.image}`, (e) => {
      return res.status(400).json({ message: `${err}` });
    });
  }
}

export const removeProduct = async (req, res) => {
  const { id } = req.params
  try {

    const isExist = await Product.findById(id);
    if (!isExist) return res.status(404).json({ message: 'product not found' });

    await Product.findByIdAndDelete(id);

    fs.unlink(`./uploads/${isExist.image}`, (e) => {
      return res.status(200).json({
        message: 'product removed successfully'
      })
    });

  } catch (err) {
    return res.status(400).json({ message: `${err}` });
  }
}



export const updateProduct = async (req, res) => {
  const { title, description, price, category, brand } = req.body;
  const { id } = req.params
  try {

    const isExist = await Product.findById(id);
    if (!isExist) return res.status(404).json({ message: 'product not found' });

    const file = req.files?.image;

    const common = {
      title: title || isExist.title,
      description: description || isExist.description,
      price: Number(price) || isExist.price,
      category: category || isExist.category,
      brand: brand || isExist.brand
    }

    if (file) {

      const fileName = `${uuidv4()}-${file.name}`;
      //new yata move garcha
      file.mv(`./uploads/${fileName}`, (err) => {
        if (err) return res.status(400).json({ message: `${err}` });

        // purano image remove
        fs.unlink(`./uploads/${isExist.image}`, async (e) => {

          await Product.findByIdAndUpdate(id, { ...common, image: fileName }, { runValidators: true });

          return res.status(200).json({
            message: 'product updated successfully'
          });

        });

      });


    } else {
      await Product.findByIdAndUpdate(id, { ...common }, { runValidators: true });

      return res.status(200).json({
        message: 'product updated successfully'
      });
    }















  } catch (err) {
    return res.status(400).json({ message: `${err}` });
  }
}
