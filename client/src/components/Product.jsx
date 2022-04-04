import React from "react";
import "./Product.css";

export const Product = (props) => {
  return (
    <div className="storedProduct">
      <div className="product-parameter">ID: {props.data.nfc_id}</div>
      <div className="product-parameter">Name: {props.data.name}</div>
      <div className="product-parameter">Owner: {props.data.owner}</div>
      <div className="product-parameter">MaxTemp: {props.data.maxTemp}</div>
      <div className="product-parameter">Maxhumid: {props.data.maxHumid}</div>
    </div>
  );
};
