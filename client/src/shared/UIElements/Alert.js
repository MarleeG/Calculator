import React from "react";

import "./Alert.css";
const log = console.log;
const Alert = (props) => {

    log(props);
  return (
    <div className="container__alert font-calc custom-box-shadow">
      <h2>{props.msg}</h2>

      <button
      className="font-calc"
        onClick={() => {
          props.handleErrorMsg("", false);
        }}
      >
        EXIT
      </button>
    </div>
  );
};

export default Alert;
