import React from "react";

import "./calc.css";

const Calc = (props) => {
  return (
    <div className="calc__container">
      <div className="calc__wrapper">
        <div className="calc__input-wrap">{/* STATIC INPUT */} Static input</div>
        <div className="calc__buttons-wrap">
          <div className="calc__col calc__col-one">
            {/* numbers */}
            numbers
          </div>

          <div className="calc__col calc__col-two">
            {/* operations */}
            operations
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calc;
