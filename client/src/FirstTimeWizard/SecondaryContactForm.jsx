import React, { Component } from "react";
import validator from "validator";
import Input from "../forms/Input";
import PhoneInput from "../forms/PhoneInput";
import appClient from "../appClient";
import Spinner from "../Spinner/Spinner";

class SecondaryContactInformationForm extends Component {
  state = {
    firstName: this.props.firstName,
    lastName: this.props.lastName,
    phoneNumber: this.props.phoneNumber,
    email: this.props.email,
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
          secondaryContact: {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email
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
    if (
      !validator.isEmpty(this.state.email + "") &&
      !validator.isEmail(this.state.email + "")
    )
      errors.email = "Please enter a valid email address.";
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
      <div className="secondary-contact-information-form contact-information-form">
        {this.state.isLoading && <Spinner />}
        <p>
          <strong>Secondary Contact Information</strong>
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
            disabled={this.state.isLoading}
          />
          <Input
            name="lastName"
            label="Last Name"
            type="input"
            onChange={this.handleChange}
            wasValidated={this.state.wasValidated}
            error={this.state.errors.lastName}
            value={this.state["lastName"]}
            disabled={this.state.isLoading}
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
            label="Email Address (optional)"
            type="email"
            onChange={this.handleChange}
            wasValidated={this.state.wasValidated}
            error={this.state.errors.email}
            value={this.state["email"]}
            disabled={this.state.isLoading}
          />
        </form>
      </div>
    );
  }
}

SecondaryContactInformationForm.defaultProps = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  email: ""
};

export default SecondaryContactInformationForm;
