import React, { useState, useEffect } from "react";
import { Loader } from "../components/Loader";
import { WareHouse } from "../components/WareHouse";
import { NavBar } from "../layout/NavBar";
import { socket } from "../socketIo/socketIO.jsx";
import { createProduct } from "../api";
import { AddingCardForm } from "../components/AddingCardForm";

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
    ],
  });

  useEffect(() => {
    socket.on("SensorData", (data) => {
      console.log(JSON.stringify(data));
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

  // CONVERT file To Base64
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const submitHandle = async (e) => {
    e.preventDefault();
    var fileInput = e.target["name"].files[0];
    console.log(fileInput);
    const fileBase64 = await convertBase64(fileInput);
    const { data } = await createProduct({ img: fileBase64 });
    console.log(data);
  };

  return (
    <React.Fragment>
      <NavBar></NavBar>
      {state.isLoading && <Loader></Loader>}
      {!state.isLoading &&
        state.wareHouses.map((wareHouse) => {
          return <WareHouse key={wareHouse.index} data={wareHouse}></WareHouse>;
        })}
    </React.Fragment>
  );
};
