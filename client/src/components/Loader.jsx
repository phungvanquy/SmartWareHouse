import { DoubleBubble } from "react-spinner-animated";
import "react-spinner-animated/dist/index.css";

import "./Loader.css";

export const Loader = (props) => {
  return (
    <div className="cover-layer">
      <div id="container">
        <DoubleBubble center={false} width={"150px"}></DoubleBubble>
        <p style={{ textAlign: "center", color: "white", fontSize: "1rem" }}>
          {props.children}
        </p>
      </div>
    </div>
  );
};
