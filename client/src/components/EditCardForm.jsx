import { useRef } from "react";
import "./EditCardForm.css";

export const EditCardForm = (props) => {
  const inputProductName = useRef(null);
  const inputProductOwner = useRef(null);
  const inputProductMaxTemp = useRef(null);
  const inputProductMaxHumid = useRef(null);
  const inputProductPhoto = useRef(null);
  const onUpdateClickHandle = () => {};

  return (
    <div className="row" id="cover_layout">
      <form id="addFromContainer" className="col-xxl-6 col-md-8 col-11">
        <div className="row header-addingCardForm">Update Product</div>
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
          <button type="button" className="col-4" onClick={onUpdateClickHandle}>
            {/* <i className="fas fa-plus"> Update</i> */}
            <i class="fas fa-edit">update</i>
          </button>
          <button type="button" className="col-5" onClick={null}>
            <i className="fas fa-window-close"> Cancel</i>
          </button>
        </div>
      </form>
    </div>
  );
};
