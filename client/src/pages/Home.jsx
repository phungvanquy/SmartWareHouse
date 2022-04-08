import React, { useState, useEffect } from "react";
import { Loader } from "../components/Loader";
import { WareHouse } from "../components/WareHouse";
import { NavBar } from "../layout/NavBar";
import { socket } from "../socketIo/socketIO.jsx";

export const Home = () => {
  const [state, setState] = useState({
    isLoading: true,
    wareHouses: [
      {
        index: 1,
        productIds: [],
        sensorData: {
          temperature: null,
          humidity: null,
          bulbState_1: false,
          bulbState_2: false,
          bulbState_3: false,
        },
      },
      {
        index: 2,
        productIds: [],
        sensorData: {
          temperature: null,
          humidity: null,
          bulbState_1: false,
          bulbState_2: false,
          bulbState_3: false,
        },
      },
    ],
  });

  useEffect(() => {
    socket.on("SensorData", (data) => {
      // console.log(JSON.stringify(data));
      setState((prevState) => {
        var wareHouse = prevState.wareHouses.find((wareHouse) => {
          return wareHouse.index === data.index;
        });
        wareHouse.sensorData = {
          temperature: data.temperature,
          humidity: data.humidity,
          bulbState_1: false,
          bulbState_2: false,
          bulbState_3: false,
        };

        var temp_state = {
          ...prevState,
          isLoading: false,
        };
        return temp_state;
      });
    });

    socket.on("ProductId", (data) => {
      setState((prevState) => {
        let temp_listProduct = [...prevState.productIds];
        temp_listProduct.push(data["ProductId"]);
        let temp_state = {
          ...prevState,
          isLoading: false,
          productIds: temp_listProduct,
        };
        return temp_state;
      });
    });

    return function cleanup() {
      socket.removeAllListeners();
    };
  }, []);

  return (
    <React.Fragment>
      <NavBar></NavBar>
      {state.isLoading && <Loader>Socket is connecting...</Loader>}
      {!state.isLoading &&
        state.wareHouses.map((wareHouse) => {
          return <WareHouse key={wareHouse.index} data={wareHouse}></WareHouse>;
        })}
    </React.Fragment>
  );
};
