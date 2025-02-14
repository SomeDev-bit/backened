import { v4 as uuidv4 } from 'uuid';


export const checkFile = (req, res, next) => {
  const file = req.files?.image;

  if (file) {
    const fileName = `${uuidv4()}-${file.name}`;
    file.mv(`./uploads/${fileName}`, (err) => {
      if (err) return res.status(400).json({ message: `${err}` });
      req.image = fileName;
      return next();
    });
  } else {
    return res.status(400).json({ message: 'please provide valid image' });
  }
}

