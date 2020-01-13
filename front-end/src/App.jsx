import React from "react";
import Paperbase from "./components/Paperbase";
import Login from "./components/Login";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignUp from "./components/SignUp";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Route exact path="/login" render={() => <Login />} />
        <Route exact path="/signup" render={() => <SignUp />} />
        <Route exact path="/" render={() => <Paperbase />} />
      </Router>
    </div>
  );
};

export default App;
