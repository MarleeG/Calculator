import React from "react";

import "./Button.css";

const Button = (props) => {
  return <button style={props.styles} onClick={() => props.updateSelectedBtn(props.value)}>{props.value}</button>;
};

export default Button;
