import React, { createContext, Component } from "react";

export const ErrorContext = createContext();

class ErrorContextProvider extends Component {
  constructor(props) {
    super(props);

    this.setError = this.setError.bind(this);
  }
  state = {
    error: {}
  };

  // Register User
  setError(errors) {
    this.setState({
      error: errors
    });
  }

  render() {
    return (
      <ErrorContext.Provider
        value={{
          ...this.state,
          setError: this.setError
        }}
      >
        {this.props.children}
      </ErrorContext.Provider>
    );
  }
}

export default ErrorContextProvider;
