import React from 'react';
import AdminLayout from './components/admin/AdminLayout';
import Login from './components/login/Login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignUp from './components/signup/SignUp';
import { ThemeProvider } from '@material-ui/core/styles';
import Main from './components/main/Main';
import Counter from './components/counter/Counter';

import { useQuery } from '@apollo/react-hooks';
import { GET_LOCAL_THEME } from './queries/theme';

import { mainTheme, darkTheme } from './AppStyles';

const App = () => {
  const { data } = useQuery(GET_LOCAL_THEME);

  return (
    <>
      <Router>
        <ThemeProvider
          theme={data && data.darkTheme === true ? darkTheme : mainTheme}
        >
          <Switch>
            <Route path="/voivoi" render={() => <h1>Voi Voi</h1>} />
            <Route path="/login" render={() => <Login />} />
            <Route path="/signup" render={() => <SignUp />} />
            <Route path="/admin" render={() => <AdminLayout />} />
            <Route path="/counter" render={() => <Counter />} />
            <Route path="/" render={() => <Main />} />
          </Switch>
        </ThemeProvider>
      </Router>
    </>
  );
};

export default App;
