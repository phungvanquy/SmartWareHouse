import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProduct } from "../api";
import { Loader } from "../components/Loader";
import "./Product.css";
export default function Product() {
  const { productId } = useParams();
  const [state, setState] = useState({ isLoading: true, product: {} });

  useEffect(async () => {
    // Fetch product from list returned by server
    const product = (await fetchProduct(productId)).data[0];
    setState((prev) => {
      return { ...prev, isLoading: false, product: product };
    });
  }, []);

  return (
    <React.Fragment>
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-custom"
        style={{ textAlign: "center" }}
      >
        <div className="container-fluid" style={{ paddingLeft: "50%" }}>
          <span
            className="navbar-brand mb-0 h1"
            id="brand"
            style={{
              transform: "translateX(-50%)",
              textShadow: "1px 1px 5px black",
            }}
          >
            <i class="fas fa-info-circle"></i> Product Infomation
          </span>
        </div>
      </nav>

      {/* ----------------------Storage Information-------------------------- */}

      {state.isLoading && <Loader></Loader>}

      {!state.isLoading && (
        <div className="container product_container">
          <div className="row" style={{ paddingTop: "10px" }}>
            <div className="col-12 col-lg-6">
              <img
                // src={`${state.product.photo}`}
                src={state.product.photo}
                width="100%"
                height="auto"
                style={{ boxShadow: "1px 1px 5px black" }}
              ></img>
            </div>
            <div className="col-12 col-lg-6">
              <h3 style={{ textAlign: "center", paddingTop: "20px" }}>
                #id:{state.product.nfc_id}
              </h3>
              <ul Name="list-group list-group-flush">
                <li className="list-group-item">
                  <span>Name:</span> {state.product.name}
                </li>
                <li className="list-group-item">
                  <span>Owner:</span> {state.product.owner}
                </li>
                <li className="list-group-item">
                  <span>Maximun Storage Temperature:</span>{" "}
                  {state.product.maxTemp}
                  <span>&#8451;</span>
                </li>
                <li className="list-group-item">
                  <span>Maximun Storage Humidity:</span>{" "}
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
                }}
              >
                Storage Information
              </h5>
              <ul
                className="list-storing-places"
                style={{ listStyleType: "none" }}
              >
                <li>
                  <i class="fas fa-warehouse"></i>
                  &nbsp; 11:15 am, 1/1/2022: Warehouse1
                </li>
                <li>
                  <i class="fas fa-warehouse"></i>
                  &nbsp; 11:15 am, 2/1/2022: Warehouse2
                </li>
                <li>
                  <i class="fas fa-warehouse"></i>
                  &nbsp; 11:15 am, 3/1/2022: Warehouse3
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
