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
  console.log("recv req");
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {}
};

/*------------------------CREATE_PRODUCT--------------------------- */
export const createProduct = async (req, res) => {
  const product = req.body;
  console.log(product);
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
