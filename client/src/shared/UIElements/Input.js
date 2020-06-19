import React from "react";

import "./Input.css";

const Input = (props) => {

  return (
    <input
      type="text"
      className="font-calc"
      value={props.entries}
      name="selection"
      ref={props.refSelectedValue}
      onChange={props.onChange}
      disabled={props.disabled ? true : false}
    />
  );
};

export default Input;
