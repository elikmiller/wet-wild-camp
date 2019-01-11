import React, { Component } from "react";
import Input from "./Input";
import validator from "validator";

class ResetPasswordForm extends Component {
  state = {
    password: "",
    confirmPassword: "",
    errors: {},
    wasValidated: false
  };

  validate = () => {
    let errors = {};
    if (!validator.isLength(this.state.password, { min: 8, max: 64 }))
      errors.password = "Password must be between 8 and 64 characters.";
    if (validator.isEmpty(this.state.password))
      errors.password = "Password is required.";
    if (!validator.equals(this.state.password, this.state.confirmPassword))
      errors.confirmPassword = "Confirmation Password must match.";
    if (validator.isEmpty(this.state.confirmPassword))
      errors.confirmPassword = "Confirmation Password is required.";
    return errors;
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
        password: this.state.password
      };
      this.props.onSubmit(data);
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({
      errors,
      wasValidated: true
    });

    if (Object.keys(errors).length === 0) {
      let data = {
        token: this.props.token,
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
      <div className="reset-password-form">
        <form onSubmit={this.handleSubmit}>
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
            type="password"
            value={this.state.confirmPassword}
            onChange={this.handleChange}
            wasValidated={this.state.wasValidated}
            error={this.state.errors.confirmPassword}
          />
          <div className="form-group">
            <button className="btn btn-primary btn-block" type="submit">
              Reset Password
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default ResetPasswordForm;
