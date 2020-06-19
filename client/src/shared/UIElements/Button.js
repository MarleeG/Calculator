import React from "react";

import "./Button.css";

const Button = (props) => {
  console.log(`CLASSES: ${props.classes && props.classes}`);
  return <button 
    style={props.styles}
    className={`font-calc ${props.classes && props.classes}`}
    onClick={() => props.updateSelectedBtn(props.value)} disabled={props.disabled}>
      {props.value}
    </button>;
};

export default Button;
