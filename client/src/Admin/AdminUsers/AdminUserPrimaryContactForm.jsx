import React, { Component } from "react";
import Input from "../../forms/Input";
import PhoneInput from "../../forms/PhoneInput";
import validator from "validator";

class AdminUserPrimaryContactForm extends Component {
  state = {
    firstName: this.props.firstName || "",
    lastName: this.props.lastName || "",
    email: this.props.email || "",
    phoneNumber: this.props.phoneNumber || "",
    streetAddress: this.props.streetAddress || "",
    streetAddress2: this.props.streetAddress2 || "",
    city: this.props.city || "",
    state: this.props.state || "",
    zipCode: this.props.zipCode || "",
    errors: {},
    wasValidated: false
  };

  validate = () => {
    let errors = {};
    if (validator.isEmpty(this.state.firstName))
      errors.firstName = "First Name is required.";
    if (validator.isEmpty(this.state.lastName))
      errors.lastName = "Last Name is required.";
    if (validator.isEmpty(this.state.email))
      errors.email = "Email Address is required.";
    if (!validator.isEmail(this.state.email))
      errors.email = "Email Address must be a valid email address.";
    if (validator.isEmpty(this.state.phoneNumber))
      errors.phoneNumber = "Phone Number is required.";
    if (!validator.isMobilePhone(this.state.phoneNumber))
      errors.phoneNumber = "Phone Number must be a valid phone number.";
    if (validator.isEmpty(this.state.streetAddress))
      errors.streetAddress = "Street Address is required.";
    if (validator.isEmpty(this.state.city)) errors.city = "City is required.";
    if (validator.isEmpty(this.state.state))
      errors.state = "State is required.";
    if (validator.isEmpty(this.state.zipCode))
      errors.zipCode = "Zip Code is required.";
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
        email: this.state.email,
        phoneNumber: this.state.phoneNumber,
        streetAddress: this.state.streetAddress,
        streetAddress2: this.state.streetAddress2,
        city: this.state.city,
        state: this.state.state,
        zipCode: this.state.zipCode
      });
    }
  };

  render() {
    return (
      <div className="admin-user-primary-contact-form">
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
          <Input
            name="email"
            label="Email Address"
            type="email"
            onChange={this.handleOnChange}
            wasValidated={this.state.wasValidated}
            error={this.state.errors.email}
            value={this.state.email}
          />
          <PhoneInput
            name="phoneNumber"
            label="Phone Number"
            onChange={this.handleOnChange}
            wasValidated={this.state.wasValidated}
            error={this.state.errors.phoneNumber}
            value={this.state.phoneNumber}
          />
          <Input
            name="streetAddress"
            label="Street Address"
            type="input"
            onChange={this.handleOnChange}
            wasValidated={this.state.wasValidated}
            error={this.state.errors.streetAddress}
            value={this.state.streetAddress}
          />
          <Input
            name="streetAddress2"
            label="Street Address Line Two (optional)"
            type="input"
            onChange={this.handleOnChange}
            wasValidated={this.state.wasValidated}
            error={this.state.errors.streetAddress2}
            value={this.state.streetAddress2}
          />
          <Input
            name="city"
            label="City"
            type="input"
            onChange={this.handleOnChange}
            wasValidated={this.state.wasValidated}
            error={this.state.errors.city}
            value={this.state.city}
          />
          <Input
            name="state"
            label="State"
            type="input"
            onChange={this.handleOnChange}
            wasValidated={this.state.wasValidated}
            error={this.state.errors.state}
            value={this.state.state}
          />
          <Input
            name="zipCode"
            label="Zip Code"
            type="input"
            onChange={this.handleOnChange}
            wasValidated={this.state.wasValidated}
            error={this.state.errors.zipCode}
            value={this.state.zipCode}
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

export default AdminUserPrimaryContactForm;
