import React, { useEffect, useState, useRef } from "react";
import { numbers, operations } from "../../shared/data/data";

import "./calc.css";
import Button from "../../shared/UIElements/Button";
import Input from "../../shared/UIElements/Input";

const log = console.log;
const Calc = (props) => {
  const numStyle = {
    width: "7vw",
    height: "7vw",
    borderRadius: "20px",
    margin: "10px",
  };

  const operationStyles = {
    operationStyle: {
      width: "7vw",
      height: "10vw",
      borderRadius: "10px",
    },
    default: {
      width: "80%",
      height: "5.5vw",
    },
  };

  const [allNums, setAllNum] = useState([]);
  const [allOperations, setAllOperations] = useState([]);
  const [selectedBtns, setSelectedBtns] = useState([]);

  const selectedValue = useRef();

  const checkBackSelection = (back) => {
    let newSelectBtns = selectedBtns;

    if (back === "←") {
      if (newSelectBtns.length === 1) {
        setSelectedBtns([]);
      } else {
        newSelectBtns = newSelectBtns.filter((val) => val !== "←");

        newSelectBtns = newSelectBtns.splice(0, newSelectBtns.length - 1);
        setSelectedBtns(newSelectBtns);
      }

      // setSelectedBtns(newSelectBtns.pop());
      log(`BACK SELECTED:: ${back}`);
      log("newSelectBtns:: ", newSelectBtns);

      // setSelectedBtns()
    }
  };
  const updateSelectedBtn = (btnVal) => {
    if (btnVal !== "←") {
      setSelectedBtns([...selectedBtns, btnVal]);
    } else {
      // back btn selected
      checkBackSelection(btnVal);
    }
  };

  const handleChange = (e) => {};

  useEffect(() => {
    setAllNum(numbers());
    setAllOperations(operations());

    console.log(selectedBtns);
  }, [selectedBtns]);

  return (
    <div className="calc__container">
      <div className="calc__wrapper">
        <div className="calc__input-wrap">
          {/* STATIC INPUT */}

          {/* <h3>Input</h3> */}
          {/* <input type="text" value={selectedBtns.join(" ")} name="selection" ref={selectedValue} onChange={handleChange} disabled/> */}

          <Input
            // value={selectedBtns.filter((val) => val !== "←").join(" ")}
            value={selectedBtns.join(" ")}
            onChange={handleChange}
            refSelectedValue={selectedValue}
            disabled
          />
        </div>
        <div className="calc__buttons-wrap">
          <div className="calc__col calc__col-one">
            {/* numbers */}
            {allNums.map((num) => {
              return (
                <Button
                  key={num}
                  styles={numStyle}
                  value={num}
                  updateSelectedBtn={updateSelectedBtn}
                />
              );
            })}
          </div>

          <div className="calc__col calc__col-two">
            {/* operations */}
            {allOperations.map((op, idx) => {
              let btn;
              if (op !== "=") {
                btn = (
                  <Button
                    key={idx}
                    styles={operationStyles.operationStyle}
                    value={op}
                    updateSelectedBtn={updateSelectedBtn}
                  />
                );
              } else {
                btn = (
                  <Button
                    key={idx}
                    styles={operationStyles.default}
                    value={op}
                    updateSelectedBtn={updateSelectedBtn}
                  />
                );
              }
              return btn;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calc;
