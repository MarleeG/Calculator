import React, { useState } from "react";
import Calc from "../components/calc";

import "./home.css";
import Alert from "../../shared/UIElements/Alert";
const Home = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorMsg, setShowErrorMsg] = useState(false);

  const handleErrorMsg = (msg, show) => {
    setErrorMessage(msg);
    setShowErrorMsg(show);
  };

  return (
    <div className="home__container center">

      <div className="application_msg">
        <h3 className="font-calc">
        This width is not supported. Please use a wider device.
        </h3>
      </div>
      <div className="home__wrapper">
        <div className="home__head-wrap row row-one">
          <h1 className="font-calc application-header">Calculator</h1>
        </div>

        <div className="home__main-wrap row row-two">
          <div className="calc__wrapper center">
            {showErrorMsg ? (
              <Alert msg={errorMessage} handleErrorMsg={handleErrorMsg} />
            ) : (
              <Calc handleErrorMsg={handleErrorMsg} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
