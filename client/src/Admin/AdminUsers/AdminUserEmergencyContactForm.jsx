import React, { Component } from "react";
import Input from "../../forms/Input";
import PhoneInput from "../../forms/PhoneInput";
import validator from "validator";

class AdminUserEmergencyContactForm extends Component {
  state = {
    firstName: this.props.firstName || "",
    lastName: this.props.lastName || "",
    phoneNumber: this.props.phoneNumber || "",
    errors: {},
    wasValidated: false
  };

  validate = () => {
    let errors = {};
    if (validator.isEmpty(this.state.firstName))
      errors.firstName = "First Name is required.";
    if (validator.isEmpty(this.state.lastName))
      errors.lastName = "Last Name is required.";
    return errors;
  };

  handleOnChange = e => {
    e.preventDefault();
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
      this.props.onSubmit({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        phoneNumber: this.state.phoneNumber
      });
    }
  };

  render() {
    return (
      <div className="admin-user-emergency-contact-form">
        <form onSubmit={this.handleSubmit}>
          <Input
            name="firstName"
            label="First Name"
            type="input"
            onChange={this.handleOnChange}
            wasValidated={this.state.wasValidated}
            error={this.state.errors.firstName}
            value={this.state.firstName}
          />
          <Input
            name="lastName"
            label="Last Name"
            type="input"
            onChange={this.handleOnChange}
            wasValidated={this.state.wasValidated}
            error={this.state.errors.lastName}
            value={this.state.lastName}
          />
          <PhoneInput
            name="phoneNumber"
            label="Phone Number"
            onChange={this.handleOnChange}
            wasValidated={this.state.wasValidated}
            error={this.state.errors.phoneNumber}
            value={this.state.phoneNumber}
          />
          <div className="mb-3">
            <button
              onClick={this.props.closeForm}
              className="btn btn-outline-secondary mr-3"
              type="button"
            >
              Cancel
            </button>
            <button
              onClick={this.handleSubmit}
              className="btn btn-primary"
              type="button"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default AdminUserEmergencyContactForm;
