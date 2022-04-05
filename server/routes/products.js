import express from "express";

import {
  getProducts,
  getProduct,
  createProduct,
  deleteProduct,
} from "../controllers/products.js";

const router = express.Router();

router.get("/", getProducts);

router.get("/:id", getProduct);

router.post("/", createProduct);

router.delete("/:id", deleteProduct);

export default router;
