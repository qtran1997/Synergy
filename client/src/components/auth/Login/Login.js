import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { TextFieldGroup } from "../../";
import { AuthContext, ErrorContext } from "../../../contexts";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: ``,
      password: ``,
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const { isAuthenticated } = this.context;
    if (isAuthenticated) {
      this.props.history.push("/app");
    }
  }

  componentDidUpdate() {
    const { isAuthenticated } = this.context;

    if (isAuthenticated) {
      this.props.history.push("/app");
    }
  }

  onChange(e) {
    e.preventDefault();

    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(setError) {
    return event => {
      event.preventDefault();

      const { loginUser } = this.context;

      const userData = {
        username: this.state.username,
        password: this.state.password
      };

      loginUser(userData, setError);
    };
  }

  render() {
    return (
      <ErrorContext.Consumer>
        {errors => (
          <div className='login content-wrapper'>
            <div className='container'>
              <div className='row'>
                <div className='col-md-8 m-auto'>
                  <h1 className='display-4 text-center'>Log In</h1>
                  <p className='lead text-center'>
                    Sign in to your Synergy account
                  </p>
                  <form onSubmit={this.onSubmit(errors.setError)}>
                    <TextFieldGroup
                      placeholder='Username'
                      name='username'
                      type='text'
                      value={this.state.username}
                      onChange={this.onChange}
                      error={errors.error.username}
                    />

                    <TextFieldGroup
                      placeholder='Password'
                      name='password'
                      type='password'
                      value={this.state.password}
                      onChange={this.onChange}
                      error={errors.error.password}
                    />
                    <input
                      type='submit'
                      className='btn btn-info btn-block mt-4'
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </ErrorContext.Consumer>
    );
  }
}

Login.contextType = AuthContext;

export default withRouter(Login);
