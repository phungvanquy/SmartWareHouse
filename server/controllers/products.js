import mongoose from "mongoose";
import Product from "../models/product.js";

/*------------------------GET_PRODUCTS--------------------------- */
export const getProducts = async (req, res) => {
  console.log("getProducts");
  const { warehouseId: currWarehouse } = req.params;
  console.log(currWarehouse);
  try {
    const products = await Product.find({ currWarehouse: currWarehouse });
    res.status(200).json(products);
  } catch (error) {}
};

/*------------------------GET_PRODUCT--------------------------- */
export const getProduct = async (req, res) => {
  console.log("getProduct");

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
  console.log("create Product");
  const product = req.body;
  console.log(product.currWarehouse);

  const existingProduct = await Product.findOne({
    nfc_id: product.nfc_id,
  });

  try {
    if (existingProduct) {
      // IF PRODUCT EXISTS
      const updateProduct = await Product.findOneAndUpdate(
        { nfc_id: product.nfc_id },
        {
          ...product,
          storingPlacesInfo: [
            ...existingProduct.storingPlacesInfo,
            product.storingPlacesInfo,
          ],
        },
        { new: true }
      );
      return res.status(201).json(updateProduct);
    } else {
      // IF PRODUCT DOES NOT EXISTS
      const newProduct = new Product({
        ...product,
        storingPlacesInfo: [product.storingPlacesInfo],
      });
      await newProduct.save();
      return res.status(201).json(newProduct);
    }
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

/*------------------------DELETE_PRODUCT--------------------------- */
export const deleteProduct = async (req, res) => {
  console.log("delete Product");

  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No product with that id");
  }

  await Product.findByIdAndDelete(_id);
  res.json({ message: "Product deleted successfully!" });

  try {
  } catch (error) {}
};

/*------------------------UPDATE_PRODUCT--------------------------- */

export const updateProduct = async (req, res) => {
  const { id: nfc_id } = req.params;
  const product = req.body;

  const updateProduct = await Product.findOneAndUpdate(
    { nfc_id: nfc_id },
    product,
    {
      new: true,
    }
  );

  res.json(updateProduct);
};
