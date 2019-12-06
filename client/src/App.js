import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import { Provider } from "react-redux";
import store from "./store";

import { Landing, NotFound, MainApp } from "./components/layout";

import { Register, Login } from "./components";

import whyDidYouRender from "@welldone-software/why-did-you-render";

import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";

if (process.env.NODE_ENV !== "production") {
  whyDidYouRender(React);
}

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and expiration
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout the user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className='app'>
          <Router>
            <Route exact path='/' component={Landing} />
            <Switch>
              <Route exact path='/login' component={Login} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/app' component={MainApp} />
              <Route component={NotFound} />
            </Switch>
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
