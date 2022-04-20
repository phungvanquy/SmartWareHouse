import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProduct } from "../api";
import { Loader } from "../components/Loader";
import "./Product.css";
export default function Product() {
  const { productId } = useParams();
  const [state, setState] = useState({ isLoading: true, product: {} });

  useEffect(() => {
    async function fetchData() {
      // Fetch product from list returned by server
      const product = (await fetchProduct(productId)).data[0];
      console.log(product);

      setState((prev) => {
        return { ...prev, isLoading: false, product: product };
      });
    }

    fetchData();
  }, [productId]);

  return (
    <React.Fragment>
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-custom"
        style={{ textAlign: "center" }}
      >
        <div className="container-fluid" style={{ paddingLeft: "50%" }}>
          <span
            className="navbar-brand mb-0 h1 product_infor_title"
            id="brand"
            style={{
              transform: "translateX(-50%)",
              textShadow: "1px 1px 5px black",
            }}
          >
            <i className="fas fa-info-circle"></i> Product Infomation
          </span>
        </div>
      </nav>

      {/* ----------------------Storage Information-------------------------- */}

      {state.isLoading && <Loader></Loader>}

      {!state.isLoading && (
        <div className="container product_container">
          <div className="row" style={{ paddingTop: "10px", padding: "10px" }}>
            <div
              className="col-12 col-lg-6"
              style={{
                height: "305px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "inset 1px 1px 16px black",
                padding: "10px",
                backgroundImage: `url(${state.product.photo})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            >
              {/* <img
                id="product_img"
                src={state.product.photo}
                width="100%"
                height="auto"
                style={{ boxShadow: "inset 1px 1px 5px black", height: "100%" }}
              ></img> */}
            </div>
            <div className="col-12 col-lg-6">
              <h3 style={{ textAlign: "center", paddingTop: "20px" }}>
                #id:{state.product.nfc_id}
              </h3>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <span>Name:</span> {state.product.name}
                </li>
                <li className="list-group-item">
                  <span>Owner:</span> {state.product.owner}
                </li>
                <li className="list-group-item">
                  <span>Maximum Storing Temperature:</span>{" "}
                  {state.product.maxTemp}
                  <span>&#8451;</span>
                </li>
                <li className="list-group-item">
                  <span>Maximum Storing Humidity:</span>{" "}
                  {state.product.maxHumid}%
                </li>
                <li className="list-group-item">
                  <span>Condition:</span> Good
                </li>
                <li className="list-group-item">
                  <span>Rating: </span>
                  <i className="far fa-star"></i>
                  <i className="far fa-star"></i>
                  <i className="far fa-star"></i>
                </li>
              </ul>
            </div>
          </div>

          {/* ----------------------Storage Information-------------------------- */}
          <div className="row" style={{ paddingTop: "25px" }}>
            <div className="col">
              <h5
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Storage Information
              </h5>

              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Time/Date</th>
                    <th scope="col">Storing Place</th>
                  </tr>
                </thead>
                <tbody>
                  {state.product.storingPlacesInfo.map((storingPlaceInfo) => {
                    return (
                      <tr key={storingPlaceInfo.time}>
                        <th scope="row">1</th>
                        <td>{`${storingPlaceInfo.time}`}</td>
                        <td>
                          <i className="fas fa-warehouse"></i>
                          {` ${storingPlaceInfo.storingPlace}`}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {/* <ul
                className="list-storing-places"
                style={{ listStyleType: "none" }}
              >
                {state.product.storingPlacesInfo.map((storingPlaceInfo) => {
                  return (
                    <li key={storingPlaceInfo.time}>
                      <i className="fas fa-warehouse"></i>
                      &nbsp;{" "}
                      {`${storingPlaceInfo.time}: ${storingPlaceInfo.storingPlace}`}
                    </li>
                  );
                })}
              </ul> */}
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
