// const http = require("http");
// const express = require("express");
// const socketio = require("socket.io");

import http from "http";
import express from "express";
import { Server as socketIoServer } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";
import onConnectionHandle from "./socketIO/index.js";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import productRoutes from "./routes/products.js";
import sendMessWhatsApp from "./utilities/sendMessWhatsApp.js";

dotenv.config();
const PORT = process.env.PORT;

const app = express();
const httpServer = http.createServer(app);

/* -----------------------SOCKET----------------------------- */
/* Create and config SocketIo Server */
const io = new socketIoServer(httpServer, {
  cors: {
    origin: "*",
  },
});
io.on("connection", onConnectionHandle);

/* -------------------------HTTP--------------------------- */
/* Config cors allowing every ip for express Server  + HTTP server*/
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));

// app.use("/warehouses", warehouseRoutes);
app.use("/products", productRoutes);

/* -------------------------MONGOOSE--------------------------- */

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    httpServer.listen(PORT, () => {
      console.log(`Server is listening on Port ${PORT}`);
    })
  )
  .catch((error) => console.log(error.message));
