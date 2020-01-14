import React from "react";
import Admin from "./components/admin/Admin";
import Login from "./components/login/Login";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignUpPage from "./components/signup/SignUpPage";
import { ThemeProvider } from "@material-ui/core/styles";
import HomePage from "./components/main/homepage/HomePage";

import theme from "./AppStyles";

const App = () => {
  return (
    <>
      <Router>
        <ThemeProvider theme={theme}>
          <Route exact path="/login" render={() => <Login />} />
          <Route exact path="/signup" render={() => <SignUpPage />} />
          <Route exact path="/" render={() => <HomePage />} />
          <Route exact path="/admin" render={() => <Admin />} />
        </ThemeProvider>
      </Router>
    </>
  );
};

export default App;
