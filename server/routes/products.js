import express from "express";

import {
  getProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
} from "../controllers/products.js";

const router = express.Router();

router.get("/product/:id", getProduct);

router.get("/:warehouseId", getProducts);

router.post("/", createProduct);

router.delete("/:id", deleteProduct);

router.patch("/:id", updateProduct);

export default router;
