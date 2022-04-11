import { LocalStorage } from "node-localstorage";
import sendMessWhatsApp from "../utilities/sendMessWhatsApp.js";

const localStorage = new LocalStorage("/localStorage");

const onConnectionHandle = (socket) => {
  console.log("user connected");

  // Scan MIFARE card when client click "scan"
  socket.on("CMDfromClient_scanCardId", (data) => {
    console.log("CMDfromClient_scanCardId");
    socket.broadcast.emit("scanCardId", { warehouseId: data.warehouseId });
  });

  socket.on("CMDfromClient_toggleLED", (data) => {
    console.log(data);
    const stateBulbToInt = data.state ? 1 : 0;
    socket.broadcast.emit("toggleLED", {
      warehouseId: data.warehouseId,
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

    const configParamsWarehouse = JSON.parse(
      localStorage.getItem(`warehouse${msg.index}`)
    );

    if (configParamsWarehouse?.maxTemp || configParamsWarehouse?.maxHumid) {
      const time = new Date().toLocaleTimeString();
      if (msg.temperature > configParamsWarehouse.maxTemp) {
        sendMessWhatsApp(
          `The temperature is very high in warehouse ${msg.index}! ${time}`
        );
      }

      if (msg.humidity > configParamsWarehouse.maxHumid) {
        sendMessWhatsApp(
          `The humidity is very high in warehouse ${msg.index}! ${time}`
        );
      }
    }
  });

  socket.on("configParamsWareHouse", (data) => {
    console.log("messageio: " + JSON.stringify(data));
    localStorage.setItem(`warehouse${data.index}`, JSON.stringify(data));
  });

  socket.on("CMDfromClient_sensorMeasuring", (data) => {
    console.log(data);
    socket.broadcast.emit("sensorMeasuring", {
      onOff: data.onOff,
    });
  });

  socket.on("disconnect", function () {
    console.log("user disconnected");
  });
};

export default onConnectionHandle;
