import React, { useRef, useState } from "react";
import "./AddingCardForm.css";
import { Loader } from "./Loader";

export const AddingCardForm = (props) => {
  const inputProductName = useRef(null);
  const inputProductOwner = useRef(null);
  const inputProductMaxTemp = useRef(null);

  const [state, setstate] = useState({
    isPostDataDone: false,
    isPostingData: false,
  });

  const onAddClickHandle = async () => {
    setstate((prevState) => {
      return { ...prevState, isPostingData: true };
    });

    const response = await fetch(
      "https://rfid-1b3da-default-rtdb.firebaseio.com/products.json",
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          id: props.productId,
          name: inputProductName.current.value,
          owner: inputProductOwner.current.value,
          maxTemp: inputProductMaxTemp.current.value,
        }),
      }
    );

    setstate((prevState) => {
      return { ...prevState, isPostingData: false, isPostDataDone: true };
    });
  };
  const onCancelClickHandle = () => {
    props.onCancel();
  };

  const onCloseHandle = () => {
    props.onClose();
  };
  //********************************** */
  return (
    <div className="row" id="cover_layout">
      <form id="addFromContainer" className="col-xxl-6 col-md-8 col-11">
        <div className="row header-addingCardForm">
          A Product was Found! <br />
          Do you want to add it to the current wareHouse?
        </div>
        <div className="form-group row">
          <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
            PRODUCT_ID
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="productId"
              readOnly
              placeholder="ID"
              value={props.productId}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
            Product_Name
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="inputProductName"
              ref={inputProductName}
              placeholder="Name"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
            Product_Owner
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="inputProductOwner"
              ref={inputProductOwner}
              placeholder="Owner"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
            Max_temp
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="inputProductMaxTemp"
              ref={inputProductMaxTemp}
              placeholder="maxTemp"
            />
          </div>
        </div>
        <div className="row group-button-products">
          {!state.isPostingData && !state.isPostDataDone && (
            <button type="button" className="col-4" onClick={onAddClickHandle}>
              <i className="fas fa-plus"> Add</i>
            </button>
          )}

          {!state.isPostingData && !state.isPostDataDone && (
            <button
              type="button"
              className="col-5"
              onClick={onCancelClickHandle}
            >
              <i className="fas fa-window-close"> Cancel</i>
            </button>
          )}

          {state.isPostingData && !state.isPostDataDone && <Loader></Loader>}

          {!state.isPostingData && state.isPostDataDone && (
            <button type="button" className="col-5" onClick={onCloseHandle}>
              <i className="fas fa-window-close"> Close</i>
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
