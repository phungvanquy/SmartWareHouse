import React from "react";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../actions/products";
import "./Product.css";

export const Product = (props) => {
  const dispatch = useDispatch();

  const onDeleteHandle = () => {
    console.log(props.data._id);
    dispatch(deleteProduct(props.data._id));
  };

  const onEditHandle = () => {};

  return (
    <div className="storedProduct">
      <div className="row">
        <div className="col-12 col-md-6">
          <div className="product-parameter">ID: {props.data.nfc_id}</div>
          <div className="product-parameter">Name: {props.data.name}</div>
          <div className="product-parameter">Owner: {props.data.owner}</div>
          <div className="product-parameter">MaxTemp: {props.data.maxTemp}</div>
          <div className="product-parameter">
            Maxhumid: {props.data.maxHumid}
          </div>
        </div>

        <div className="col-12 col-md-6 list-button">
          <button onClick={onDeleteHandle}>
            <i class="fas fa-times"></i>
          </button>
          <button onClick={onEditHandle}>
            <i class="fas fa-edit"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
