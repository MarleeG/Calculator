import React, { useEffect, useState, useCallback } from "react";
import { numbers, operations } from "../../shared/data/data";

import "./calc.css";
import Button from "../../shared/UIElements/Button";
import Input from "../../shared/UIElements/Input";

const Calc = (props) => {
  const [allNums, setAllNum] = useState([]);
  const [allOperations, setAllOperations] = useState([]);
  const [selectedBtns, setSelectedBtns] = useState([]);
  const [disableOperations, setDisableOperations] = useState(true);
  const [disableDot, setDisableDot] = useState(false);
  const [answer, setAnswer] = useState([]);

  // this will disable all operation buttons if that was the last selection
  const disableOperationBtns = useCallback(() => {
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
    // Keep in mind PE| MDAS
    let allEntries = selectedBtns;
    let entries = combineNumberEntries(allEntries);
    let objectifiedEntries = [];

    for (let i = 0; i < entries.length; i++) {
      objectifiedEntries.push({ num: entries[i], used: false });
    }

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
          break;

        case "Divide":
          num1Index = divideIndex - 1;
          num2Index = divideIndex + 1;
          num1 = parseFloat(entries[num1Index]);
          num2 = parseFloat(entries[num2Index]);
          value = num1 / num2;
          break;
        case "Add":
          num1Index = addIndex - 1;
          num2Index = addIndex + 1;
          num1 = parseFloat(entries[num1Index]);
          num2 = parseFloat(entries[num2Index]);
          value = num1 + num2;
          break;
        case "Subtract":
          num1Index = subtractIndex - 1;
          num2Index = subtractIndex + 1;
          num1 = parseFloat(entries[num1Index]);
          num2 = parseFloat(entries[num2Index]);
          value = num1 - num2;
          break;
        default:
          props.handleErrorMsg(
            "This entry is not valid. Please try another entry",
            true
          );
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

      // this updates the entries array with unused numbers
      let newEntries = [];
      for (let x = 0; x < objectifiedEntries.length; x++) {
        if (objectifiedEntries[x].used === false) {
          newEntries.push(objectifiedEntries[x].num);
        }
      }

      entries = newEntries;

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

      // updates operation indices
      multiplyIndex = entries.indexOf("*");
      divideIndex = entries.indexOf("/");
      addIndex = entries.indexOf("+");
      subtractIndex = entries.indexOf("-");

      // in case of inifinite loop
      counter++;
      if (counter === allEntries.length + 5) {
        entries = ["0"];
        props.handleErrorMsg("An error has occured. Please try again.", true);
      }
    }

    setAnswer(entries);
    setSelectedBtns([...entries[0].toString().split("")]);
  };

  const checkOtherSelections = (btn) => {
    let newSelectBtns = selectedBtns;

    if (btn === "←") {
      // disableDotHandler(selectedBtns);
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

  const disableDotHandler = (currentVal) => {
    setDisableDot(true);
    let allValues = currentVal.filter(val => val !== "←");
    allValues = allValues.filter(val => val !== '=');


    let lastIndexMultiply = allValues.lastIndexOf("*");
    let lastIndexDivide = allValues.lastIndexOf("/");
    let lastIndexAdd = allValues.lastIndexOf("+");
    let lastIndexSubtract = allValues.lastIndexOf("-");

    let operationIndices = [
      lastIndexMultiply,
      lastIndexDivide,
      lastIndexAdd,
      lastIndexSubtract,
    ];

    let lastOperationIndex = Math.max(...operationIndices);
    let isPositive = Math.sign(lastOperationIndex);

    // if operation has been selected the following is executed 
    // example:  [2,4,3, "+",1,2,4,]
    if (isPositive === 1) {

      // all numbers after the operation
      // [1,2,4] or []
      let lastNumberSet = allValues.splice(lastOperationIndex + 1);

      // if array look like this [1,2,4]
      if(lastNumberSet.length > 0){
        if(lastNumberSet.indexOf('.') >= 0){
          setDisableDot(true);

          // else if it lastNumberSet array looks like this []
        }else{
          setDisableDot(false);
        }

        // if no operation has been selected but numbers have not been selected []
      }else if(lastNumberSet.length === 0){
        setDisableDot(false);
      }
      
      // if no operation has been selected but numbers have been selected and decimal has been selected
      // EX: [2,4,3]
    } else if(allValues.indexOf(".") >= 0) {
      setDisableDot(true);
    }else{
      setDisableDot(false);
    }
  };

  const updateSelectedBtn = (btnVal) => {
    // this removes answer array if any values
    // resets answer array in useState
    if (answer.length > 0) {
      setAnswer([]);
      setDisableDot(false);
    }

    // This conditions what values are displayed in the input. Back BTN && Equal sign will not be displayed is not registered
    const condition = btnVal !== "←" && btnVal !== "=";

    let values = [...selectedBtns, btnVal];
    if (condition) {
      setSelectedBtns(values);
    } else {
      // back btn selected
      checkOtherSelections(btnVal);
     
    }
  };

  const handleChange = (e) => {};

  // This combines the number entries to make them into one ['1', '2', '+' ,'3'] would then equal ['12', '+', '3']
  const combineNumberEntries = useCallback((arrayOfEntries) => {
    let currentEntries = arrayOfEntries;

    let selection = currentEntries;

    let wholeNum = "";
    let updatedSelection = [];
    for (let i = 0; i < selection.length; i++) {
      let entry = selection[i];

      let entryIsNumber = Number.isInteger(parseInt(entry));

      if (entryIsNumber || entry === ".") {
        wholeNum += entry;

        if (i === selection.length - 1) {
          updatedSelection.push(wholeNum);
        }
      } else {
        // entry is an operation
        updatedSelection.push(wholeNum);
        updatedSelection.push(entry);
        wholeNum = "";
      }
    }

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

    disableDotHandler(selectedBtns);
  }, [selectedBtns, disableOperationBtns]);

  return (
    <div className="calc__container custom-box-shadow">
      <div className="calc__wrapper">
        <div className="calc__input-wrap">
          {/* STATIC INPUT */}
          <Input
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
                  classes="btn-num"
                  value={num}
                  updateSelectedBtn={updateSelectedBtn}
                  disabled={(selectedBtns.length === 0 && num === "←") || (num === "." && disableDot)}
                  // (disableDot && num === ".")
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
                    value={op}
                    classes="btn-operation"
                    updateSelectedBtn={updateSelectedBtn}
                    disabled={disableOperations}
                  />
                );
              } else {
                btn = (
                  <Button
                    key={idx}
                    value={op}
                    classes="btn-equal"
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