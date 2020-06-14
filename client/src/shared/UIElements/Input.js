import React, { useState, useEffect } from "react";

import "./Input.css";

const Input = (props) => {
  const [value, setValue] = useState();
  return (
    <input
      type="text"
      //   value={props.answer.length > 0 ? props.answer[0] : props.entries}
      value={props.entries}
      name="selection"
      ref={props.refSelectedValue}
      onChange={props.onChange}
      disabled={props.disabled ? true : false}
    />
  );
};

export default Input;
