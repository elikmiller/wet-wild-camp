import React, { Component } from "react";
import validator from "validator";
import Input from "../forms/Input";
import PhoneInput from "../forms/PhoneInput";
import appClient from "../appClient";
import Spinner from "../Spinner/Spinner";

class EmergencyContactInformationForm extends Component {
  state = {
    firstName: this.props.firstName,
    lastName: this.props.lastName,
    phoneNumber: this.props.phoneNumber,
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
          emergencyContact: {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phoneNumber: this.state.phoneNumber
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
      <div className="emergency-contact-information-form contact-information-form">
        {this.state.isLoading && <Spinner />}
        <p>
          <strong>Emergency Contact Information</strong>
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
        </form>
      </div>
    );
  }
}

EmergencyContactInformationForm.defaultProps = {
  firstName: "",
  lastName: "",
  phoneNumber: ""
};

export default EmergencyContactInformationForm;
