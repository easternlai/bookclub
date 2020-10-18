import React, { Fragment, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from "react-redux";
import store from './store';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import Landing from './components/layout/Landing';
import Books from './components/books/Books';
import SuggestBook from './components/suggestBook/SuggestBook';
import Book from './components/book/Book';


import PrivateRoute from './components/routing/PrivateRoute';


function App() {

  return (
    <Provider store={store}>
    <Router>
    <Fragment>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <Alert />
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path='/login' component={Login} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/books" component={Books} />
          <PrivateRoute exact path='/books/:id' component={Book} />
          <PrivateRoute exact path="/suggestbook" component={SuggestBook} />
        </Switch>
      </Fragment>
    </Router>
    </Provider>
  );

}

export default App;
