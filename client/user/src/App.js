import React from "react";
import Login from "./component/User/login";
import Home from './component/home/home';
import Register from './component/User/register';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import "./App.css";
function App() {
  return (
    <>
     <Router>
    <Switch>
      <Route path="/register">
        <Register/>
      </Route>
    <Route path="/login">
        <Login/>
      </Route>
      <Route path="/">
        <Home/>
      </Route>
    </Switch>
    </Router>
    </>
  );
}

export default App;
