import React, { createContext, Component } from "react";
import { withRouter } from "react-router";
import axios from "axios";
import jwt_decode from "jwt-decode";

import setAuthToken from "../utils/setAuthToken";
import isEmpty from "../validation/isEmpty";

export const AuthContext = createContext();

class AuthContextProvider extends Component {
  constructor(props) {
    super(props);

    this.registerUser = this.registerUser.bind(this);
    this.setCurrentUser = this.setCurrentUser.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
  }

  state = {
    isAuthenticated: false,
    user: {}
  };

  componentDidMount() {
    // Check for token
    if (localStorage.jwtToken) {
      // Set auth token header auth
      setAuthToken(localStorage.jwtToken);
      // Decode token and get user info and expiration
      const decoded = jwt_decode(localStorage.jwtToken);
      // Set user and isAuthenticated
      this.setCurrentUser(decoded);

      // Check for expired token
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        // Logout the user
        this.logoutUser();
        // Redirect to login
      }
    }

    if (!this.state.isAuthenticated) {
      this.props.history.push("/login");
    }
  }

  // Set logged in user
  setCurrentUser(decoded) {
    this.setState({
      isAuthenticated: !isEmpty(decoded),
      user: decoded
    });
  }

  // Register User
  registerUser(userData, setError) {
    axios
      .post("/api/users/register", userData)
      .then(res => {
        this.props.history.push("/login");
      })
      .catch(err => setError(err.response.data));
  }

  // Login - Get User Token
  loginUser(userData, setError) {
    axios
      .post("/api/users/login", userData)
      .then(res => {
        // Save to localStorage
        const { token } = res.data;
        // Set token to ls
        localStorage.setItem("jwtToken", token);
        // Set token to Auth header
        setAuthToken(token);
        // Decode token to get user data
        const decoded = jwt_decode(token);
        // Set current user
        this.setCurrentUser(decoded);
      })
      .catch(err => setError(err.response.data));
  }

  logoutUser() {
    // Remove token from localStorage
    localStorage.removeItem("jwtToken");
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to {} which will also set isAuthenticated to false
    this.setCurrentUser({});
    this.props.history.push("/");
  }

  render() {
    return (
      <AuthContext.Provider
        value={{
          ...this.state,
          registerUser: this.registerUser,
          setCurrentUser: this.setCurrentUser,
          loginUser: this.loginUser,
          logoutUser: this.logoutUser
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default withRouter(AuthContextProvider);
