import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { TextFieldGroup } from "../../";
import { AuthContext, ErrorContext } from "../../../contexts";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: ``,
      fname: ``,
      lname: ``,
      email: ``,
      password: ``,
      password2: ``,
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

  onChange(e) {
    e.preventDefault();

    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(setError) {
    return event => {
      event.preventDefault();

      const { registerUser } = this.context;

      const newUser = {
        username: this.state.username,
        fname: this.state.fname,
        lname: this.state.lname,
        email: this.state.email,
        password: this.state.password,
        password2: this.state.password2
      };

      registerUser(newUser, setError);
    };
  }

  render() {
    return (
      <ErrorContext.Consumer>
        {errors => (
          <div className='register content-wrapper'>
            <div className='container'>
              <div className='row'>
                <div className='col-md-8 m-auto'>
                  <h1 className='display-4 text-center'>Sign Up</h1>
                  <p className='lead text-center'>
                    Create your Synergy account
                  </p>
                  <form noValidate onSubmit={this.onSubmit(errors.setError)}>
                    <TextFieldGroup
                      placeholder='Username'
                      name='username'
                      type='text'
                      value={this.state.username}
                      onChange={this.onChange}
                      error={errors.error.username}
                    />

                    <TextFieldGroup
                      placeholder='First Name'
                      name='fname'
                      type='text'
                      value={this.state.fname}
                      onChange={this.onChange}
                      error={errors.error.fname}
                    />

                    <TextFieldGroup
                      placeholder='Last Name'
                      name='lname'
                      type='text'
                      value={this.state.lname}
                      onChange={this.onChange}
                      error={errors.error.lname}
                    />

                    <TextFieldGroup
                      placeholder='Email Address'
                      name='email'
                      type='email'
                      value={this.state.email}
                      onChange={this.onChange}
                      error={errors.error.email}
                      info='This site uses Gravatar so if you want a
                                        profile image, use a Gravatar email'
                    />

                    <TextFieldGroup
                      placeholder='Password'
                      name='password'
                      type='password'
                      value={this.state.password}
                      onChange={this.onChange}
                      error={errors.error.password}
                    />

                    <TextFieldGroup
                      placeholder='Confirm Password'
                      name='password2'
                      type='password'
                      value={this.state.password2}
                      onChange={this.onChange}
                      error={errors.error.password2}
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

Register.contextType = AuthContext;

export default withRouter(Register);
