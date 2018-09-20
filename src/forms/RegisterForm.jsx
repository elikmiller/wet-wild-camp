import React, { Component } from "react";
import Input from "./Input";

class RegisterForm extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    errors: {},
    wasValidated: false
  };

  handleSubmit = e => {
    e.preventDefault();
    let data = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password
    };

    if (this.state.password === this.state.confirmPassword) {
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
      <div className="register-form">
        <form onSubmit={this.handleSubmit}>
          <Input
            label="First Name"
            name="firstName"
            type="text"
            value={this.state.firstName}
            onChange={this.handleChange}
            wasValidated={this.state.wasValidated}
            error={this.state.errors.firstName}
          />
          <Input
            label="Last Name"
            name="lastName"
            type="text"
            value={this.state.lastName}
            onChange={this.handleChange}
            wasValidated={this.state.wasValidated}
            error={this.state.errors.lastName}
          />
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
            value={this.state.password}
            onChange={this.handleChange}
            wasValidated={this.state.wasValidated}
            error={this.state.errors.password}
          />
          <Input
            label="Confirm Password"
            name="confirmPassword"
            type="confirmPassword"
            value={this.state.confirmPassword}
            onChange={this.handleChange}
            wasValidated={this.state.wasValidated}
            error={this.state.errors.confirmPassword}
          />
          <div className="form-group">
            <button className="btn btn-primary btn-block" type="submit">
              Register
            </button>
            <small className="form-text text-muted">
              By clicking Register, you agree to our{" "}
              <a href="/terms">Terms and Conditions</a> &amp;{" "}
              <a href="/privacy">Privacy Policy</a>.
            </small>
          </div>
        </form>
      </div>
    );
  }
}

export default RegisterForm;
