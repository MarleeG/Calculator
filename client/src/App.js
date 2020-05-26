import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Calc from "./application/page/calc";

const App = () => {
  const routes = (
    <Switch>
      <Route path="/" exact>
        <Calc />
      </Route>

      <Redirect to="/" />
    </Switch>
  );
  return <Router>{routes}</Router>;
};

export default App;
