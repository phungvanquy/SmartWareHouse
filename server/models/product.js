import mongoose from "mongoose";

const storageInfo = new mongoose.Schema({
  storingPlace: String,
  time: { type: Date, default: new Date() },
});

const productSchema = new mongoose.Schema({
  nfc_id: String,
  name: String,
  owner: String,
  maxTemp: Number,
  maxHumid: Number,
  photo: {
    type: String,
    contentType: String,
  },
  storingPlacesInfo: [storageInfo],
  numberOfOverTemp: { type: Number, default: 0 },
  numberOfOverHumid: { type: Number, default: 0 },
  currWarehouse: Number,
});

const Product = mongoose.model("Product", productSchema);

export default Product;
