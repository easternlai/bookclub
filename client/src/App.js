import React, { Fragment, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from "react-redux";
import store from './store';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';


function App() {

  return (
    <Provider store={store}>
    <Router>
    <Fragment>
        <Alert />
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path='/login' component={Login} />
        </Switch>
      </Fragment>
    </Router>
    </Provider>
  );

}

export default App;
