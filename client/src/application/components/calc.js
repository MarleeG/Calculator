import React, { useEffect, useState, useRef, useCallback } from "react";
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

  const calculateEntry = () => {
    // Keep in mind PE| MDAS
    let example = ["2", "*", "1525", "/", "58586", "+", "5858", "*", "76"];
    var exampleCopy = example;
    var updateCalc = [];
    let selectedIndicies = [];

    // get the index of the multiplication
    let multiplyIndex = exampleCopy.indexOf("*");

    var counter = 0;

    let continueMultiplicationLoop = false;

    if (multiplyIndex > 0) {
      continueMultiplicationLoop = true;
    }

    while (continueMultiplicationLoop) {
      log("multiplyIndex:: ", multiplyIndex);

      log("Example Copy:: ", exampleCopy);
      const num1Index = multiplyIndex - 1;
      const num2Index = multiplyIndex + 1;

      // these are the 2 values for operation
      const num1 = parseInt(exampleCopy[num1Index]);
      const num2 = parseInt(exampleCopy[num2Index]);

      log(`${num1} * ${num2} = ${num1 * num2}`);
      // log(`num2: ${num2}`);

      const value = num1 * num2;

      // const relatedIndices = [multiplyIndex, num1Index, num2Index];

      exampleCopy = example.join(" ");

      exampleCopy = exampleCopy.replace("*", value);

      exampleCopy = exampleCopy.split(" ");

      log("AFTER SPLIT:: ", exampleCopy);

      selectedIndicies.push(num1Index);
      selectedIndicies.push(num2Index);

      for (let i = 0; i < exampleCopy.length; i++) {
        // if (i !== num1Index && i !== num2Index) {
        //   updateCalc.push(exampleCopy[i]);
        // }

        if (selectedIndicies.indexOf(i) === -1) {
          updateCalc.push(exampleCopy[i]);
        }
      }

      // log("Updated Calc: ", updateCalc);
      // log("ORIGINAL EXP:: ", example);
      // log("SELECTED INDICES:: ", selectedIndicies);

      // exampleCopy = updateCalc;
      // example = updateCalc;
      multiplyIndex = exampleCopy.indexOf("*");

      log("Updated Calc: ", updateCalc);
      log("ORIGINAL EXP:: ", example);
      log("SELECTED INDICES:: ", selectedIndicies);

      counter++;

      if (counter === 4) {
        multiplyIndex = -1;
        continueMultiplicationLoop = false;
        log("INFINITE LOOP");
      }

      if (multiplyIndex === -1) {
        continueMultiplicationLoop = false;
      }
    }
  };

  const calculateEntryTwo = () => {
    // Keep in mind PE| MDAS

    let dummyEntry = [
      "2",
      "*",
      "1525",
      "/",
      "58586",
      "+",
      "5858",
      "*",
      "76",
      "*",
      "5",
    ];
    let entries = dummyEntry;
    let objectifiedEntries = [];

    for (let i = 0; i < entries.length; i++) {
      objectifiedEntries.push({ num: entries[i], used: false });
    }

    log("ORIGINAL objectifiedEntries:: ", objectifiedEntries);

    let continueMultiplicationLoop = false;
    let multiplyIndex = entries.indexOf("*");

    if (multiplyIndex > 0) {
      continueMultiplicationLoop = true;
    }

    let counter = 0;
    // MULTIPLICATION
    while (continueMultiplicationLoop) {
      const num1Index = multiplyIndex - 1;
      const num2Index = multiplyIndex + 1;
      // these are the 2 values for the operation
      const num1 = parseInt(entries[num1Index]);
      const num2 = parseInt(entries[num2Index]);

      log(`${num1} * ${num2} = ${num1 * num2}`);
      const value = num1 * num2;

      // log("LOOP OBJECTIFIED ENTRIES:: ", objectifiedEntries);

      // this updated which values have been used
      objectifiedEntries[num1Index].used = true;
      objectifiedEntries[num2Index].used = true;
      // objectifiedEntries[multiplyIndex].used = true;
      objectifiedEntries[multiplyIndex].num = value;

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

      if (multiplyIndex === -1) {
        continueMultiplicationLoop = false;
        log("STOP LOOP");
      }

      // in case of inifinite loop
      // counter++;
      // if (counter === 7) {
      //   continueMultiplicationLoop = false;
      //   log("INFINITE LOOP");
      // }
    }

    // DIVISION
    let continueDivisionLoop = false;
    let divisionIndex = entries.indexOf("/");
    log("divisionIndex:: ", divisionIndex);

    if (divisionIndex > 0) {
      continueDivisionLoop = true;
    }

    while (continueDivisionLoop) {
      log(`DIVISION LOOP`);
      const num1Index = divisionIndex - 1;
      const num2Index = divisionIndex + 1;
      // these are the 2 values for the operation
      const num1 = parseInt(entries[num1Index]);
      const num2 = parseInt(entries[num2Index]);

      log(`${num1} / ${num2} = ${num1 / num2}`);
      const value = num1 / num2;

      // log("LOOP OBJECTIFIED ENTRIES:: ", objectifiedEntries);

      // this updated which values have been used
      objectifiedEntries[num1Index].used = true;
      objectifiedEntries[num2Index].used = true;
      // objectifiedEntries[divisionIndex].used = true;
      objectifiedEntries[divisionIndex].num = value;

      log("OBJECTIFIED ENTRIES:: ", objectifiedEntries);

      // // this updates the entries array with unused numbers
      let newEntries = [];
      for (let x = 0; x < objectifiedEntries.length; x++) {
        if (objectifiedEntries[x].used === false) {
          newEntries.push(objectifiedEntries[x].num);
        }
      }

      // entries = newEntries;
      // log('NEW ENTRIES:: ', entries);

      // // this updates objectified array
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

      // // updates multiplication index
      divisionIndex = entries.indexOf("/");

      if (divisionIndex === -1) {
        continueMultiplicationLoop = false;
        log("STOP LOOP");
      }

      counter++;

      if (counter > 3) {
        continueDivisionLoop = false;
        log("INFINITE LOOP");
      }
    }
  };

  const executeAllOperations = () => {
    // Keep in mind PE| MDAS

    // let dummyEntry = [
    //   "2",
    //   "*",
    //   "1525",
    //   "/",
    //   "58586",
    //   "+",
    //   "5858",
    //   "*",
    //   "76",
    //   "*",
    //   "5",
    // ];

    let dummyEntry = selectedBtns;
    let entries = dummyEntry;
    let objectifiedEntries = [];

    for (let i = 0; i < entries.length; i++) {
      objectifiedEntries.push({ num: entries[i], used: false });
    }

    log("ORIGINAL objectifiedEntries:: ", objectifiedEntries);

    let continueMultiplicationLoop = false;
    // let multiplyIndex = entries.indexOf("*");
    // let divideIndex = entries.indexOf("/");
    // let addIndex = entries.indexOf("+");
    // let subtractIndex = entries.indexOf("-");
    // let operationsArray = ["Multiply", "Divide", 'Add', 'Subtract'];
    // let operation = operationsArray[0];

    let multiplyIndex = entries.indexOf("*");
    let divideIndex = entries.indexOf("/");
    let addIndex = entries.indexOf("+");
    let subtractIndex = entries.indexOf("-");

    const updateOperation = () => {
      const operationsArray = ["Multiply", "Divide", "Add", "Subtract"];
      let operation = operationsArray[0];

      if (multiplyIndex > 0) {
        operation = operationsArray[0];
        // if (multiplyIndex > 0) {
        //   continueMultiplicationLoop = true;
        // }
      } else if (divideIndex > 0) {
        operation = operationsArray[1];
      } else if (addIndex > 0) {
        operation = operationsArray[2];
      } else if (subtractIndex > 0) {
        operation = operationsArray[3];
      }

      log(`OPERATION: ${operation}`);
      return operation;
    };

    updateOperation();
    let counter = 0;
    // MULTIPLICATION
    // continueMultiplicationLoop
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

          num1 = parseInt(entries[num1Index]);
          num2 = parseInt(entries[num2Index]);

          value = num1 * num2;
          log(`${num1} * ${num2} = ${num1 * num2}`);
          break;

        case "Divide":
          num1Index = divideIndex - 1;
          num2Index = divideIndex + 1;

          num1 = parseInt(entries[num1Index]);
          num2 = parseInt(entries[num2Index]);

          value = num1 / num2;
          log(`${num1} / ${num2} = ${num1 / num2}`);

          break;
        case "Add":
          num1Index = addIndex - 1;
          num2Index = addIndex + 1;

          num1 = parseInt(entries[num1Index]);
          num2 = parseInt(entries[num2Index]);

          value = num1 + num2;
          log(`${num1} + ${num2} = ${num1 + num2}`);
          break;
        case "Subtract":
          num1Index = subtractIndex - 1;
          num2Index = subtractIndex + 1;

          num1 = parseInt(entries[num1Index]);
          num2 = parseInt(entries[num2Index]);

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

      // if (multiplyIndex === -1) {
      //   continueMultiplicationLoop = false;
      //   log("STOP LOOP");
      // }

      // in case of inifinite loop
      counter++;
      if (counter === 15) {
        // continueMultiplicationLoop = false;
        entries = ["ERROR"];
        log("INFINITE LOOP");
      }
    }


    setAnswer(entries);
    setSelectedBtns([]);
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

      // log(`BACK SELECTED:: ${back}`);
      // log("newSelectBtns:: ", newSelectBtns);
    } else if (btn === "=") {
      // calculateEntry();
      // calculateEntryTwo();
      // setCalculate(true);
      executeAllOperations();
    }
  };

  const updateSelectedBtn = (btnVal) => {
    // this removes answer array if any values
    // resets answer array in useState
    if(answer.length > 0){
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
            entries={answer.length > 0 ? answer :selectedBtns.join(" ")}
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
