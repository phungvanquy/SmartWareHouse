import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../actions/products";
import { fetchProduct } from "../api";
import convertBase64 from "../api/convertBase64";
import "./AddingCardForm.css";
import { Loader } from "./Loader";

export const AddingCardForm = (props) => {
  const title_ProductFound = "A Product was Found!";
  const title_SuccessUpload = "Upload Product successfully!";
  const title_ExistingProduct = "Product had already existed in the warehouse!";

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

  const onAddClickHandle = async () => {
    setstate((prevState) => {
      return { ...prevState, isPostingData: true };
    });

    const fetchedProduct = (await fetchProduct(props.productId)).data;

    console.log(props.currWarehouse);
    // check if fetched Product is existed in curr warehose
    if (
      fetchedProduct.length !== 0 &&
      fetchedProduct[0]?.currWarehouse == props.currWarehouse
    ) {
      // if fetched Product is existed in curr warehose
      inputProductName.current.value = fetchedProduct[0].name;
      inputProductOwner.current.value = fetchedProduct[0].owner;
      inputProductMaxTemp.current.value = fetchedProduct[0].maxTemp;
      inputProductMaxHumid.current.value = fetchedProduct[0].maxHumid;
      setstate((prevState) => {
        return {
          ...prevState,
          existingProduct: fetchedProduct[0],
          title: title_ExistingProduct,
          isPostingData: false,
          isPostDataDone: true,
        };
      });
    } else {
      // if fetched Product is NOT existed in curr warehose
      const photoBase64 = await convertBase64(
        inputProductPhoto.current.files[0]
      );
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
          time:
            new Date().toLocaleTimeString() +
            ", " +
            new Date().toLocaleDateString(),
        },
      };
      await dispatch(createProduct(productData));
      setstate((prevState) => {
        return {
          ...prevState,
          isPostingData: false,
          isPostDataDone: true,
          title: title_SuccessUpload,
        };
      });
    }
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
        <div className="row header-addingCardForm">{state.title}</div>
        <div className="form-group row">
          <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
            NFC_ID
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
            Name
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
            Owner
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
            MaxTemp
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="inputProductMaxTemp"
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
              id="inputProductMaxHumid"
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
              id="inputProductPhoto"
              ref={inputProductPhoto}
              placeholder="ProductPhoto"
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
