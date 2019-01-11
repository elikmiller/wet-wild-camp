import React, { Component } from "react";
import Input from "./Input";
import validator from "validator";

class ForgotPasswordForm extends Component {
  state = {
    email: "",
    errors: {},
    wasValidated: false
  };

  validate = () => {
    let errors = {};
    if (!validator.isEmail(this.state.email))
      errors.email = "Please enter a valid Email Address.";
    if (validator.isEmpty(this.state.email))
      errors.email = "Email Address is required.";
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
        email: this.state.email
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
        email: this.state.email
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
      <div className="forgot-password-form">
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
          <div className="form-group">
            <button className="btn btn-primary btn-block" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default ForgotPasswordForm;
