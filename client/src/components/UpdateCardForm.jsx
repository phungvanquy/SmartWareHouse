import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { updateProduct } from "../actions/products";
import convertBase64 from "../api/convertBase64";
import "./UpdateCardForm.css";
import { Loader } from "./Loader";

export const UpdateCardForm = (props) => {
  const title_ProductFound = "Update Product";
  const title_SuccessUpdata = "Update Product successfully!";

  const inputProductName = useRef(null);
  const inputProductOwner = useRef(null);
  const inputProductMaxTemp = useRef(null);
  const inputProductMaxHumid = useRef(null);
  const inputProductPhoto = useRef(null);

  const dispatch = useDispatch();

  const [state, setstate] = useState({
    isPostDataDone: false,
    isPostingData: false,
    title: title_ProductFound,
    existingProduct: {},
  });

  const onUpdateClickHandle = async () => {
    const photoBase64 = await convertBase64(inputProductPhoto.current.files[0]);
    const productData = {
      nfc_id: props.productId,
      name: inputProductName.current.value,
      owner: inputProductOwner.current.value,
      maxTemp: inputProductMaxTemp.current.value,
      maxHumid: inputProductMaxHumid.current.value,
      photo: photoBase64,
      currWarehouse: props.currWarehouse,
      storingPlacesInfo: {
        storingPlace: `warehouse ${props.currWarehouse}`,
        time: new Date(),
      },
    };
    setstate((prevState) => {
      return { ...prevState, isPostingData: true };
    });
    await dispatch(updateProduct(props.productId, productData));
    setstate((prevState) => {
      return {
        ...prevState,
        isPostingData: false,
        isPostDataDone: true,
        title: title_SuccessUpdata,
      };
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
    <div className="row" id="cover_layout_update">
      <form id="updateFromContainer" className="col-xxl-6 col-md-8 col-11">
        <div className="row header-addingCardForm">{state.title}</div>
        <div className="form-group row">
          <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
            NFC_ID
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="productId_update"
              readOnly
              placeholder="ID"
              value={props.productId}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
            Name
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="inputProductName_update"
              ref={inputProductName}
              placeholder="Name"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
            Owner
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="inputProductOwner_update"
              ref={inputProductOwner}
              placeholder="Owner"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
            MaxTemp
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="inputProductMaxTemp_update"
              ref={inputProductMaxTemp}
              placeholder="maxTemperature"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
            MaxHumid
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="inputProductMaxHumid_update"
              ref={inputProductMaxHumid}
              placeholder="maxHumidity"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
            Photo
          </label>
          <div className="col-sm-10">
            <input
              type="file"
              className="form-control"
              id="inputProductPhoto_update"
              ref={inputProductPhoto}
              placeholder="ProductPhoto"
            />
          </div>
        </div>
        <div className="row group-button-products">
          {!state.isPostingData && !state.isPostDataDone && (
            <button
              type="button"
              className="col-4"
              onClick={onUpdateClickHandle}
            >
              <i className="fas fa-plus"> Update</i>
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
