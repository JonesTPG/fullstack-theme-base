import React from "react";
import AdminLayout from "./components/admin/AdminLayout";
import Login from "./components/login/Login";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignUpPage from "./components/signup/SignUpPage";
import { ThemeProvider } from "@material-ui/core/styles";
import HomePage from "./components/main/homepage/HomePage";
import Counter from "./components/counter/Counter";

import { mainTheme, darkTheme } from "./AppStyles";

const App = () => {
  return (
    <>
      <Router>
        <ThemeProvider theme={mainTheme}>
          <Route exact path="/voivoi" render={() => <h1>Voi Voi</h1>} />
          <Route exact path="/login" render={() => <Login />} />
          <Route exact path="/signup" render={() => <SignUpPage />} />
          <Route exact path="/" render={() => <HomePage />} />
          <Route exact path="/admin" render={() => <AdminLayout />} />
          <Route exact path="/counter" render={() => <Counter />} />
        </ThemeProvider>
      </Router>
    </>
  );
};

export default App;
