import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import { Provider } from "react-redux";
import store from "./store";

import Dock from "./components/layout/Dock/Dock";
import Landing from "./components/layout/Landing/Landing";
import NotFound from "./components/layout/NotFound/NotFound";

import Register from "./components/auth/Register/Register";
import Login from "./components/auth/Login/Login";

if (process.env.NODE_ENV !== "production") {
  const whyDidYouRender = require("@welldone-software/why-did-you-render");
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
        <Router>
          <div className='App'>
            <Switch>
              <Route exact path='/' component={Landing} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/register' component={Register} />
              {/* 404 */}
              <Route path='/*' component={NotFound} />
            </Switch>
            <Dock />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
