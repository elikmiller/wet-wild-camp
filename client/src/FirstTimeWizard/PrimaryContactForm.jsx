import React, { Component } from "react";
import validator from "validator";
import Input from "../forms/Input";
import PhoneInput from "../forms/PhoneInput";
import appClient from "../appClient";
import Spinner from "../Spinner/Spinner";

class PrimaryContactInformationForm extends Component {
  state = {
    firstName: this.props.firstName,
    lastName: this.props.lastName,
    phoneNumber: this.props.phoneNumber,
    email: this.props.email,
    streetAddress: this.props.streetAddress,
    streetAddress2: this.props.streetAddress2,
    city: this.props.city,
    state: this.props.state,
    zipCode: this.props.zipCode,
    isLoading: false,
    errors: {},
    wasValidated: false
  };

  isValidated = () => {
    const errors = this.validate();
    this.setState({
      errors,
      wasValidated: true
    });

    if (Object.keys(errors).length === 0) {
      this.setState({
        isLoading: true
      });
      return appClient
        .updateUser({
          id: this.props.userId,
          data: {
            primaryContact: {
              firstName: this.state.firstName,
              lastName: this.state.lastName,
              phoneNumber: this.state.phoneNumber,
              email: this.state.email,
              streetAddress: this.state.streetAddress,
              streetAddress2: this.state.streetAddress2,
              city: this.state.city,
              state: this.state.state,
              zipCode: this.state.zipCode
            }
          }
        })
        .then(res => {
          this.setState({
            isLoading: false
          });
          return res;
        });
    } else {
      return false;
    }
  };

  validate = () => {
    let errors = {};
    if (validator.isEmpty(this.state.firstName + ""))
      errors.firstName = "First name is required.";
    if (validator.isEmpty(this.state.lastName + ""))
      errors.lastName = "Last name is required.";
    if (!validator.isMobilePhone(this.state.phoneNumber + ""))
      errors.phoneNumber = "Please enter a valid phone number.";
    if (validator.isEmpty(this.state.phoneNumber + ""))
      errors.phoneNumber = "Phone number is required.";
    if (!validator.isEmail(this.state.email + ""))
      errors.email = "Please enter a valid email address.";
    if (validator.isEmpty(this.state.email + ""))
      errors.email = "Email address is required.";
    if (validator.isEmpty(this.state.streetAddress + ""))
      errors.streetAddress = "Address is required.";
    if (validator.isEmpty(this.state.city + ""))
      errors.city = "City is required.";
    if (validator.isEmpty(this.state.state + ""))
      errors.state = "State is required.";
    if (validator.isEmpty(this.state.zipCode + ""))
      errors.zipCode = "Zip code is required.";
    return errors;
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <div className="primary-contact-information-form contact-information-form">
        {this.state.isLoading && <Spinner />}
        <div className="alert alert-dark" role="alert">
          <p>Welcome to Wet and Wild Adventure Camp!</p>
          <hr />
          <p className="mb-0">
            Let's get started by filling out your contact information.
          </p>
        </div>
        <p>
          <strong>Primary Contact Information</strong>
        </p>
        <form>
          <Input
            name="firstName"
            label="First Name"
            type="input"
            onChange={this.handleChange}
            wasValidated={this.state.wasValidated}
            error={this.state.errors.firstName}
            value={this.state["firstName"]}
            disabled={true}
          />
          <Input
            name="lastName"
            label="Last Name"
            type="input"
            onChange={this.handleChange}
            wasValidated={this.state.wasValidated}
            error={this.state.errors.lastName}
            value={this.state["lastName"]}
            disabled={true}
          />
          <PhoneInput
            name="phoneNumber"
            label="Phone Number"
            type="input"
            onChange={this.handleChange}
            wasValidated={this.state.wasValidated}
            error={this.state.errors.phoneNumber}
            value={this.state["phoneNumber"]}
            disabled={this.state.isLoading}
          />
          <Input
            name="email"
            label="Email"
            type="email"
            onChange={this.handleChange}
            wasValidated={this.state.wasValidated}
            error={this.state.errors.email}
            value={this.state["email"]}
            disabled={true}
          />
          <Input
            name="streetAddress"
            label="Address"
            type="text"
            onChange={this.handleChange}
            wasValidated={this.state.wasValidated}
            error={this.state.errors.streetAddress}
            value={this.state["streetAddress"]}
            disabled={this.state.isLoading}
          />
          <Input
            name="streetAddress2"
            label="Address (Line 2)"
            type="text"
            onChange={this.handleChange}
            wasValidated={this.state.wasValidated}
            error={this.state.errors.streetAddress2}
            value={this.state["streetAddress2"]}
            disabled={this.state.isLoading}
          />
          <Input
            name="city"
            label="City"
            type="text"
            onChange={this.handleChange}
            wasValidated={this.state.wasValidated}
            error={this.state.errors.city}
            value={this.state["city"]}
            disabled={this.state.isLoading}
          />
          <Input
            name="state"
            label="State"
            type="text"
            onChange={this.handleChange}
            wasValidated={this.state.wasValidated}
            error={this.state.errors.state}
            value={this.state["state"]}
            disabled={this.state.isLoading}
          />
          <Input
            name="zipCode"
            label="Zip Code"
            type="text"
            onChange={this.handleChange}
            wasValidated={this.state.wasValidated}
            error={this.state.errors.zipCode}
            value={this.state["zipCode"]}
            disabled={this.state.isLoading}
          />
        </form>
      </div>
    );
  }
}

PrimaryContactInformationForm.defaultProps = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  email: "",
  streetAddress: "",
  streetAddress2: "",
  city: "",
  state: "",
  zipCode: ""
};

export default PrimaryContactInformationForm;
