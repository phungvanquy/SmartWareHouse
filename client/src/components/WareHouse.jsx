import React, { useEffect, useState } from "react";
import { ToggleSwitch } from "./ToggleSwitch";
import "./WareHouse.css";
import { Link } from "react-router-dom";
import { socket } from "../socketIo/socketIO.jsx";
import Chart from "../components/Chart";

export const WareHouse = (props) => {
  const [state, setstate] = useState({
    temperature: props.data.sensorData.temperature,
    humidity: props.data.sensorData.humidity,
    bulbState_1: props.data.sensorData.bulbState_1,
    bulbState_2: props.data.sensorData.bulbState_2,
    bulbState_3: props.data.sensorData.bulbState_3,
  });

  const onClickHandle = (idOfLed, bulbState) => {
    socket.emit("CMDfromClient_toggleLED", {
      warehouseId: props.data.index,
      ledId: idOfLed,
      state: bulbState,
    });
  };

  useEffect(() => {
    setstate((prevState) => {
      return {
        ...prevState,
        temperature: props.data.sensorData.temperature,
        humidity: props.data.sensorData.humidity,
        bulbState_1: props.data.sensorData.bulbState_1,
        bulbState_2: props.data.sensorData.bulbState_2,
        bulbState_3: props.data.sensorData.bulbState_3,
      };
    });
  }, [props]);

  return (
    <div className="col-11 col-sm-8 col-md-7 col-lg-5 wareHouse">
      <div className="container">
        <h1 className="wareHouse_header">WareHouse-{props.data.index}</h1>
        <div className="row sensorIndicator">
          <div className="col">
            <i className="fas fa-temperature-low temperatureIcon">
              {"\u00A0"} Temperature: {state.temperature}
              <span>&#8451;</span>
            </i>
          </div>
          <div className="col">
            <i className="fas fa-tint humidityIcon">
              {"\u00A0"} Humidity: {state.humidity}%
            </i>
          </div>
        </div>

        <div className="row bulbIndicator">
          <div className="col">
            <i className="fas fa-lightbulb"> LED 1</i>
            <ToggleSwitch
              onChange={onClickHandle}
              id={1}
              bulbState={state.bulbState_1}
            ></ToggleSwitch>
          </div>
          <div className="col">
            <i className="fas fa-lightbulb"> LED 2</i>
            <ToggleSwitch
              onChange={onClickHandle}
              id={2}
              bulbState={state.bulbState_2}
            ></ToggleSwitch>
          </div>
          <div className="col">
            <i className="fas fa-lightbulb"> LED 3</i>
            <ToggleSwitch
              onChange={onClickHandle}
              id={3}
              bulbState={state.bulbState_3}
            ></ToggleSwitch>
          </div>
        </div>

        <div className="row chart-container">
          <Chart
            data={{
              temperature: state.temperature,
              humidity: state.humidity,
              time: new Date().toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                hour12: false,
              }),
            }}
          ></Chart>
        </div>
        <div className="row">
          <button className="btnProducts">
            <Link
              className="btnProducts-Link"
              to={`/warehouse-${props.data.index}/products`}
            >
              STORED PRODUCTS
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};
