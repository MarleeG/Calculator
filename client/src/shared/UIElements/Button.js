import React from "react";

import "./Button.css";

const Button = (props) => {
  return <button style={props.styles}>{props.value}</button>;
};

export default Button;
