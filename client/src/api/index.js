import axios from "axios";
import BASEIP from "../constants/baseIp";

const HOST_IP = BASEIP;
const API = axios.create({ baseURL: `http://${HOST_IP}:8080` });

export const fetchProducts = (warehouseId) =>
  API.get(`/products/${warehouseId}`);
export const fetchProduct = (id) => API.get(`/products/product/${id}`);
export const createProduct = (newProduct) => API.post("/products", newProduct);
export const deleteProduct = (id) => API.delete(`/products/${id}`);
export const updateProduct = (id, updatedProduct) =>
  API.patch(`/products/${id}`, updatedProduct);
