import React, { useState, useEffect } from "react";
import { Product } from "../components/Product";
import { NavBar } from "../layout/NavBar";
import { Loader } from "../components/Loader";
import "./Products.css";
import { socket } from "../socketIo/socketIO.jsx";
import { AddingCardForm } from "../components/AddingCardForm";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/products.js";
import { useParams } from "react-router-dom";

export const Products = (props) => {
  const products = useSelector((state) => state.products);

  const { wareHoseIndex } = useParams();

  console.log(wareHoseIndex);

  const dispatch = useDispatch();
  const [state, setState] = useState({
    isLoading: true,
    isScanning: false,
    isCardFound: false,
    inforFoundCard: {},
    inforToSubmit: {},
  });

  // FETCH ALL DATA FROM DATABASE
  useEffect(() => {
    dispatch(getProducts(setState, wareHoseIndex));
  }, [state.isLoading]);

  // ADD EVENT LISTENER TO SOCKET
  useEffect(() => {
    socket.on("ProductId", (data) => {
      console.log("A card found! Card ID:", data["productId"]);
      setState((prevState) => {
        return {
          ...prevState,
          isScanning: false,
          isCardFound: true,
          inforFoundCard: { id: data["productId"] },
        };
      });
    });
  }, []);

  /*---------------------------------------- */
  const onCancelHandle = () => {
    setState((prevState) => {
      return { ...prevState, isCardFound: false };
    });
  };

  const onCloseHandle = async () => {
    setState((prevState) => {
      return {
        ...prevState,
        isLoading: true,
        isCardFound: false,
        // products: [],
      };
    });
  };

  function onScanClickHandle() {
    socket.emit("CMDfromClient_scanCardId", "hello");
    setState((prevState) => {
      return { ...prevState, isScanning: true };
    });
  }

  /*---------------------------------------- */

  return (
    <div>
      <NavBar></NavBar>
      <div className="container" id="productsId-container">
        <h3 id="productsHeader">Stored Products/Warehouse-{wareHoseIndex}</h3>
        {state.isLoading && <Loader></Loader>}

        {!state.isLoading && (
          <div className="row">
            {!state.isLoading &&
              products.map((product) => {
                return (
                  <div key={product._id} className="col-12 col-xl-6">
                    <Product data={product} />
                  </div>
                );
              })}
          </div>
        )}
        {state.isScanning && (
          <div
            className="row"
            style={{ justifyContent: "space-around", alignItems: "center" }}
          >
            <Loader></Loader>
          </div>
        )}

        {!state.isScanning && (
          <button id="scanCardButton" onClick={onScanClickHandle}>
            <i className="fas fa-search"> Scan Product</i>
          </button>
        )}

        {state.isCardFound && (
          <div>
            <AddingCardForm
              onClose={onCloseHandle}
              onCancel={onCancelHandle}
              productId={state.inforFoundCard.id}
              currWarehouse={1}
            ></AddingCardForm>
          </div>
        )}
      </div>
    </div>
  );
};
