import mongoose from "mongoose";
import Product from "../models/product.js";

/*------------------------GET_PRODUCTS--------------------------- */
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {}
};

export const getProduct = async (req, res) => {
  const { id: nfc_id } = req.params;

  try {
    const product = await Product.find({ nfc_id: nfc_id });
    res.status(200).send(product);
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ message: error.message });
  }
};

/*------------------------CREATE_PRODUCT--------------------------- */
export const createProduct = async (req, res) => {
  const product = req.body;

  const newProduct = new Product({ ...product });

  console.log(newProduct);
  try {
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

/*------------------------DELETE_PRODUCT--------------------------- */
export const deleteProduct = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No product with that id");
  }

  await Product.findByIdAndDelete(_id);
  res.json({ message: "Product deleted successfully!" });

  try {
  } catch (error) {}
};
