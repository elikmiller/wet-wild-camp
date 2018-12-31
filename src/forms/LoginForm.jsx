import React, { Component } from "react";
import { Link } from "react-router-dom";
import Input from "./Input";
import ServerError from "./ServerError";
import validator from "validator";

class LoginForm extends Component {
  state = {
    email: "",
    password: "",
    errors: {},
    wasValidated: false
  };

  validate = () => {
    let errors = {};
    if (!validator.isEmail(this.state.email))
      errors.email = "Please enter a valid Email Address.";
    if (validator.isEmpty(this.state.email))
      errors.email = "Email Address is required.";
    if (!validator.isLength(this.state.password, { min: 8, max: 64 }))
      errors.password = "Password must be between 8 and 64 characters.";
    if (validator.isEmpty(this.state.password))
      errors.password = "Password is required.";
    return errors;
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({
      errors,
      wasValidated: true
    });

    if (Object.keys(errors).length === 0) {
      const data = {
        email: this.state.email,
        password: this.state.password
      };
      this.props.onSubmit(data).catch(err => {
        if (
          err.response &&
          (err.response.status === 400 || err.response.status === 401)
        ) {
          this.setState({
            errors: { submit: "Invalid Email Address or Password." }
          });
        } else if (err.response && err.response.status === 500) {
          this.setState({ errors: { server: "Server error." } });
        } else {
          this.setState({
            errors: {
              submit: "An unknown error has occurred. Please try again."
            }
          });
        }
      });
    }
  };

  render() {
    return (
      <div className="login-form">
        {this.state.errors.server && <ServerError />}
        <form onSubmit={this.handleSubmit}>
          <Input
            label="Email Address"
            name="email"
            type="text"
            value={this.state.email}
            onChange={this.handleChange}
            wasValidated={this.state.wasValidated}
            error={this.state.errors.email}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            onChange={this.handleChange}
            value={this.state.password}
            help={<Link to="/forgot-password">Forgot password?</Link>}
            wasValidated={this.state.wasValidated}
            error={this.state.errors.password}
          />

          <div className="form-group">
            <button className="btn btn-primary btn-block mb-3" type="submit">
              Login
            </button>
            {this.state.errors.submit && (
              <small className="text-danger">{this.state.errors.submit}</small>
            )}
          </div>
        </form>
      </div>
    );
  }
}

export default LoginForm;
