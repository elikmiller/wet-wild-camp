import React, { Component } from "react";
import Input from "./Input";
import validator from "validator";

class SignUpForm extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    validationErrors: {},
    wasValidated: false
  };

  validate = () => {
    let validationErrors = {};
    if (validator.isEmpty(this.state.firstName))
      validationErrors.firstName = "First Name is required.";
    if (validator.isEmpty(this.state.lastName))
      validationErrors.lastName = "Last Name is required.";
    if (!validator.isEmail(this.state.email))
      validationErrors.email = "Please enter a valid Email Address.";
    if (validator.isEmpty(this.state.email))
      validationErrors.email = "Email Address is required.";
    if (!validator.isLength(this.state.password, { min: 8, max: 64 }))
      validationErrors.password =
        "Password must be between 8 and 64 characters.";
    if (validator.isEmpty(this.state.password))
      validationErrors.password = "Password is required.";
    if (!validator.equals(this.state.password, this.state.confirmPassword))
      validationErrors.confirmPassword = "Confirmation Password must match.";
    if (validator.isEmpty(this.state.confirmPassword))
      validationErrors.confirmPassword = "Confirmation Password is required.";
    return validationErrors;
  };

  handleSubmit = e => {
    e.preventDefault();

    const validationErrors = this.validate();
    this.setState({
      validationErrors,
      wasValidated: true
    });

    if (Object.keys(validationErrors).length === 0) {
      const data = {
        email: this.state.email,
        password: this.state.password
      };
      this.props.onSubmit(data);
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const validationErrors = this.validate();
    this.setState({
      validationErrors,
      wasValidated: true
    });

    if (Object.keys(validationErrors).length === 0) {
      let data = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password
      };
      this.props.onSubmit(data);
    }
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <div className="sign-up-form">
        <form onSubmit={this.handleSubmit}>
          <Input
            label="First Name"
            name="firstName"
            type="text"
            value={this.state.firstName}
            onChange={this.handleChange}
            wasValidated={this.state.wasValidated}
            error={this.state.validationErrors.firstName}
          />
          <Input
            label="Last Name"
            name="lastName"
            type="text"
            value={this.state.lastName}
            onChange={this.handleChange}
            wasValidated={this.state.wasValidated}
            error={this.state.validationErrors.lastName}
          />
          <Input
            label="Email Address"
            name="email"
            type="text"
            value={this.state.email}
            onChange={this.handleChange}
            wasValidated={this.state.wasValidated}
            error={this.state.validationErrors.email}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
            wasValidated={this.state.wasValidated}
            error={this.state.validationErrors.password}
          />
          <Input
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={this.state.confirmPassword}
            onChange={this.handleChange}
            wasValidated={this.state.wasValidated}
            error={this.state.validationErrors.confirmPassword}
          />
          <div className="form-group">
            <button className="btn btn-primary btn-block" type="submit">
              Sign Up
            </button>
            {this.props.error && (
              <small className="text-danger">{this.props.error.message}</small>
            )}
            {/* <small className="form-text text-muted">
              By clicking Register, you agree to our{" "}
              <a href="/terms">Terms and Conditions</a> &amp;{" "}
              <a href="/privacy">Privacy Policy</a>.
            </small> */}
          </div>
        </form>
      </div>
    );
  }
}

export default SignUpForm;
