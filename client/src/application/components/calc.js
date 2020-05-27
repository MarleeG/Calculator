import React, {useEffect, useState} from "react";
import {numbers, operations } from '../../shared/data/data';


import "./calc.css";
import Button from "../../shared/UIElements/Button";

const Calc = (props) => {
    const numStyle = {
        width: "7vw",
        height: "7vw",
        borderRadius:"20px",
        margin: "10px"
    };

    const operationStyles= {
        width: "7vw",
        height: "12.9vw",
        borderRadius:"10px",
        
    }


    const [allNums, setAllNum] = useState([]);
    const [allOperations, setAllOperations] = useState([])

    useEffect(() => {
        setAllNum(numbers());
        setAllOperations(operations());
    }, []);
  return (
    <div className="calc__container">
      <div className="calc__wrapper">
        <div className="calc__input-wrap">{/* STATIC INPUT */} Static input</div>
        <div className="calc__buttons-wrap">
          <div className="calc__col calc__col-one">
            {/* numbers */}
            {allNums.map((num) => {
                return <Button key={num} styles={numStyle} value={num}/>
            })}

          </div>

          <div className="calc__col calc__col-two">
            {/* operations */}
            {allOperations.map((op, idx) => {
                return <Button key={idx} styles={operationStyles} value={op}/>
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calc;
