import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Home from "./application/page/home";

import './App.css';
const App = () => {
  const routes = (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>

      <Redirect to="/" />
    </Switch>
  );
  return  <Router>{routes}</Router>;
};

export default App;
