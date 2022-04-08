import React from "react";
import { NavBar } from "../layout/NavBar";
import { socket } from "../socketIo/socketIO";
import "./Author.css";

export const Author = () => {
  socket.emit("configParamsWareHouse", { maxTemp: 24, maxHumid: 96 });
  return (
    <div>
      <NavBar></NavBar>
      <div className="container" id="authorInfo-container">
        Author: Phung Van Quy
        <br />
        Phone: 89680434764
        <br />
        Gmail: phungvanquy97@gmail.com
        <br />
      </div>
    </div>
  );
};
