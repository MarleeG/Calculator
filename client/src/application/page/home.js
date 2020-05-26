import React from "react";
import Calc from "../components/calc";

import "./home.css";
const Home = () => {
  return (
    <div className="home__container center odd-radius">
      <div className="home__wrapper">
        <div className="home__head-wrap row row-one">
          <h1>Calculator</h1>
        </div>
        <div className="home__main-wrap row row-two">
          <div className="calc__wrapper center">
            <Calc />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
