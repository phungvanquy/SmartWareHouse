import React, { useState } from "react";
import "./ToggleSwitch.css";

export const ToggleSwitch = (props) => {
  const [bulbState, setbulbState] = useState(props.bulbState);

  var onChangeHanlde = async function (event) {
    props.onChange(props.id, !bulbState); // Send toggle state
    setbulbState((preState) => {
      return !preState;
    });
  };

  return (
    <div>
      <label className="switch">
        <input type="checkbox" checked={bulbState} onChange={onChangeHanlde} />
        <span className="slider round"></span>
      </label>
    </div>
  );
};
