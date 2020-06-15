import React, { useEffect, useState, useRef, useCallback } from "react";
import { numbers, operations } from "../../shared/data/data";

import "./calc.css";
import Button from "../../shared/UIElements/Button";
import Input from "../../shared/UIElements/Input";

const log = console.log;

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

const Calc = (props) => {
  const [allNums, setAllNum] = useState([]);
  const [allOperations, setAllOperations] = useState([]);
  const [selectedBtns, setSelectedBtns] = useState([]);
  const [disableOperations, setDisableOperations] = useState(true);
  const [answer, setAnswer] = useState([]);

  // this will disable all operation buttons if that was the last selection
  const disableOperationBtns = useCallback(() => {
    // log(`last Value: ${selectedBtns[selectedBtns.length - 1]}`);

    switch (selectedBtns[selectedBtns.length - 1]) {
      case "+":
        setDisableOperations(true);
        break;
      case "-":
        setDisableOperations(true);
        break;
      case "*":
        setDisableOperations(true);
        break;
      case "/":
        setDisableOperations(true);
        break;
      default:
        setDisableOperations(false);
    }
  }, [selectedBtns]);

  const executeAllOperations = () => {
    log("-----------------------------------");
    log("EXECUTE ALL OPERATIONS");

    // Keep in mind PE| MDAS

    let allEntries = selectedBtns;

    let entries = combineNumberEntries(allEntries);
    let objectifiedEntries = [];

    log("SELECTED ENTRIES:: ", entries);

    for (let i = 0; i < entries.length; i++) {
      objectifiedEntries.push({ num: entries[i], used: false });
    }

    log("ORIGINAL objectifiedEntries:: ", objectifiedEntries);

    let multiplyIndex = entries.indexOf("*");
    let divideIndex = entries.indexOf("/");
    let addIndex = entries.indexOf("+");
    let subtractIndex = entries.indexOf("-");

    const updateOperation = () => {
      const operationsArray = ["Multiply", "Divide", "Add", "Subtract"];
      let operation = operationsArray[0];

      if (multiplyIndex > 0) {
        operation = operationsArray[0];
      } else if (divideIndex > 0) {
        operation = operationsArray[1];
      } else if (addIndex > 0) {
        operation = operationsArray[2];
      } else if (subtractIndex > 0) {
        operation = operationsArray[3];
      }

      return operation;
    };

    updateOperation();
    let counter = 0;

    while (entries.length > 1) {
      let operation = updateOperation();
      let num1Index;
      let num2Index;

      let num1;
      let num2;

      let value;

      switch (operation) {
        case "Multiply":
          num1Index = multiplyIndex - 1;
          num2Index = multiplyIndex + 1;

          num1 = parseFloat(entries[num1Index]);
          num2 = parseFloat(entries[num2Index]);

          value = num1 * num2;
          log(`${num1} * ${num2} = ${num1 * num2}`);
          break;

        case "Divide":
          num1Index = divideIndex - 1;
          num2Index = divideIndex + 1;

          num1 = parseFloat(entries[num1Index]);
          num2 = parseFloat(entries[num2Index]);

          value = num1 / num2;
          log(`${num1} / ${num2} = ${num1 / num2}`);

          break;
        case "Add":
          num1Index = addIndex - 1;
          num2Index = addIndex + 1;

          num1 = parseFloat(entries[num1Index]);
          num2 = parseFloat(entries[num2Index]);

          value = num1 + num2;
          log(`${num1} + ${num2} = ${num1 + num2}`);
          break;
        case "Subtract":
          num1Index = subtractIndex - 1;
          num2Index = subtractIndex + 1;

          num1 = parseFloat(entries[num1Index]);
          num2 = parseFloat(entries[num2Index]);

          value = num1 - num2;
          log(`${num1} - ${num2} = ${num1 - num2}`);

          break;

        default:
          alert("ERROR OCCURED");
      }

      // this updated which values have been used
      objectifiedEntries[num1Index].used = true;
      objectifiedEntries[num2Index].used = true;
      // objectifiedEntries[multiplyIndex].used = true;

      if ((operation = "Multiply" && multiplyIndex > 0)) {
        objectifiedEntries[multiplyIndex].num = value;
      } else if ((operation = "Divide" && divideIndex > 0)) {
        objectifiedEntries[divideIndex].num = value;
      } else if ((operation = "Add" && addIndex > 0)) {
        objectifiedEntries[addIndex].num = value;
      } else if ((operation = "Subtract" && subtractIndex > 0)) {
        objectifiedEntries[subtractIndex].num = value;
      }

      log("OBJECTIFIED ENTRIES:: ", objectifiedEntries);

      // this updates the entries array with unused numbers
      let newEntries = [];
      for (let x = 0; x < objectifiedEntries.length; x++) {
        if (objectifiedEntries[x].used === false) {
          newEntries.push(objectifiedEntries[x].num);
        }
      }

      entries = newEntries;
      log("NEW ENTRIES:: ", entries);

      // this updates objectified array
      let newObjectifiedEntries = [];
      for (let y = 0; y < objectifiedEntries.length; y++) {
        let num = objectifiedEntries[y].num;
        let entryIsUsed = objectifiedEntries[y].used;

        if (entryIsUsed === false) {
          let obj = { num: num, used: false };
          newObjectifiedEntries.push(obj);
        }
      }

      objectifiedEntries = newObjectifiedEntries;
      log("objectifiedEntries:: ", objectifiedEntries);

      // updates multiplication index
      multiplyIndex = entries.indexOf("*");
      divideIndex = entries.indexOf("/");
      addIndex = entries.indexOf("+");
      subtractIndex = entries.indexOf("-");

      // in case of inifinite loop
      counter++;
      if (counter === 200) {
        entries = ["ERROR"];
        log("INFINITE LOOP");
      }
    }

    setAnswer(entries);
    setSelectedBtns([entries[0]]);

    log("-----------------------------------");
  };

  const checkOtherSelections = (btn) => {
    let newSelectBtns = selectedBtns;

    if (btn === "←") {
      if (newSelectBtns.length === 1) {
        setSelectedBtns([]);
      } else {
        newSelectBtns = newSelectBtns.filter((val) => val !== "←");

        newSelectBtns = newSelectBtns.splice(0, newSelectBtns.length - 1);
        setSelectedBtns(newSelectBtns);
      }
    } else if (btn === "=") {
      executeAllOperations();
    }
  };

  const updateSelectedBtn = (btnVal) => {
    // this removes answer array if any values
    // resets answer array in useState
    if (answer.length > 0) {
      setAnswer([]);
    }

    log(`selection: ${btnVal}`);

    // This conditions what values are displayed in the input. Back BTN && Equal sign will not be displayed is not registered
    const condition = btnVal !== "←" && btnVal !== "=";

    if (condition) {
      setSelectedBtns([...selectedBtns, btnVal]);
    } else {
      // back btn selected
      checkOtherSelections(btnVal);
    }
  };

  const handleChange = (e) => {};

  const combineNumberEntries = useCallback((arrayOfEntries) => {
    log("-----------------------------------");
    log("COMBINE NUMBER ENTRIES");

    // let dummyEntries = ["1" , "5", "2", "+", "4", "8", "7", "-", "4", "8", "7"];
    let currentEntries = arrayOfEntries;

    let selection = currentEntries;
    log("Current Entries: ", selection);

    let wholeNum = "";
    let updatedSelection = [];
    for (let i = 0; i < selection.length; i++) {
      let entry = selection[i];

      let entryIsNumber = Number.isInteger(parseInt(entry));

      if (entryIsNumber || entry === ".") {
        wholeNum += entry;

        if(i === selection.length - 1){
          updatedSelection.push(wholeNum);
        }
      } else {
        // entry is an operation
        updatedSelection.push(wholeNum);
        updatedSelection.push(entry);
        wholeNum = "";
      }

      log("wholeNum:: "+ wholeNum);
    }

    log("updatedSelection:: ", updatedSelection);

    log("-----------------------------------");
    return updatedSelection;
  }, []);

  useEffect(() => {
    setAllNum(numbers());
    setAllOperations(operations());

    if (selectedBtns.length > 0) {
      disableOperationBtns();
    } else if (selectedBtns.length === 0) {
      setDisableOperations(true);
    }
  }, [selectedBtns, disableOperationBtns]);

  return (
    <div className="calc__container">
      <div className="calc__wrapper">
        <div className="calc__input-wrap">
          {/* STATIC INPUT */}

          {/* <h3>Input</h3> */}
          {/* <input type="text" value={selectedBtns.join(" ")} name="selection" ref={selectedValue} onChange={handleChange} disabled/> */}

          <Input
            // value={selectedBtns.filter((val) => val !== "←").join(" ")}
            entries={answer.length > 0 ? answer : selectedBtns.join(" ")}
            answer={answer}
            onChange={handleChange}
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
                  disabled={selectedBtns.length === 0 && num === "←"}
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
                    disabled={disableOperations}
                  />
                );
              } else {
                btn = (
                  <Button
                    key={idx}
                    styles={operationStyles.default}
                    value={op}
                    updateSelectedBtn={updateSelectedBtn}
                    disabled={disableOperations}
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
