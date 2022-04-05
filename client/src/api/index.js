import axios from "axios";

const HOST_IP = "192.168.0.107";
const API = axios.create({ baseURL: `http://${HOST_IP}:8080` });

export const fetchProducts = () => API.get("/products");
export const fetchProduct = (id) => API.get(`/products/${id}`);
export const createProduct = (newProduct) => API.post("/products", newProduct);
export const deleteProduct = (id) => API.delete(`/products/${id}`);
