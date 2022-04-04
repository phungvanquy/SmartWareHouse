const onConnectionHandle = (socket) => {
  console.log("user connected");

  // Scan MIFARE card when client click "scan"
  socket.on("CMDfromClient_scanCardId", (data) => {
    console.log("CMDfromClient_scanCardId");
    socket.broadcast.emit("scanCardId", { warehouseId: 1 });
  });

  socket.on("CMDfromClient_toggleLED", (data) => {
    console.log(data);
    const stateBulbToInt = data.state ? 1 : 0;
    socket.broadcast.emit("toggleLED", {
      warehouseId: 1,
      ledId: data.ledId,
      state: stateBulbToInt,
    });
  });

  socket.on("cardId", (msg) => {
    console.log("messageio: " + JSON.stringify(msg));
    socket.broadcast.emit("ProductId", {
      index: msg.index,
      productId: msg.scannnedCardId,
    });
  });

  socket.on("sensorData", (msg) => {
    console.log("messageio: " + JSON.stringify(msg));
    socket.broadcast.emit("SensorData", {
      index: msg.index, // index of warehosue
      temperature: msg.temperature,
      humidity: msg.humidity,
    });
  });

  socket.on("disconnect", function () {
    console.log("user disconnected");
  });
};

export default onConnectionHandle;
