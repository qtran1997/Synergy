import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import { Provider } from "react-redux";
import store from "./store";

import Landing from "./components/layout/Landing/Landing";
import NotFound from "./components/layout/NotFound/NotFound";
import MainApp from "./components/layout/Main/Main";

import Register from "./components/auth/Register/Register";
import Login from "./components/auth/Login/Login";

import whyDidYouRender from "@welldone-software/why-did-you-render";

import "./index.css";

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
              <div className='main'>
                <Route exact path='/login' component={Login} />
                <Route exact path='/register' component={Register} />
                {/* 404 */}
                {/* <Route path='/*' component={NotFound} /> */}
                <Route exact path='/app' component={MainApp} />
              </div>
            </Switch>
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
