import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProduct } from "../actions/products";
import "./Product.css";
import { UpdateCardForm } from "./UpdateCardForm";

export const Product = (props) => {
  const [state, setState] = useState({ isUpdateCard: false });
  const dispatch = useDispatch();

  const onDeleteHandle = () => {
    dispatch(deleteProduct(props.data._id));
  };

  const onEditHandle = () => {
    setState({ isUpdateCard: true });
  };

  const onCloseHandle = () => {
    setState({ isUpdateCard: false });
  };

  const onCancelHandle = () => {
    setState({ isUpdateCard: false });
  };

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
            <i className="fas fa-times"></i>
          </button>
          <button onClick={onEditHandle}>
            <i className="fas fa-edit"></i>
          </button>
          <Link to={`/products/${props.data.nfc_id}`}>
            <button>
              <i class="fas fa-info" style={{ color: "black" }}></i>
            </button>
          </Link>
        </div>
      </div>

      {state.isUpdateCard && (
        <div>
          <UpdateCardForm
            onClose={onCloseHandle}
            onCancel={onCancelHandle}
            productId={props.data.nfc_id}
            currWarehouse={props.data.currWarehouse}
          ></UpdateCardForm>
        </div>
      )}
    </div>
  );
};
