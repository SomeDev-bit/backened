import mongoose from "mongoose";


export const idValid = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: 'please provide valid id' });
  return next();
}