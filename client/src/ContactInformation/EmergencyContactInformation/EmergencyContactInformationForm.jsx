import React, { Component } from "react";
import validator from "validator";
import Input from "../../forms/Input";
import PhoneInput from "../../forms/PhoneInput";

class EmergencyContactInformationForm extends Component {
  state = {
    formValues: {
      firstName: this.props.firstName || "",
      lastName: this.props.lastName || "",
      phoneNumber: this.props.phoneNumber || ""
    },
    errors: {},
    wasValidated: false
  };

  validate = () => {
    let { formValues } = this.state;
    let errors = {};
    if (validator.isEmpty(formValues.firstName + ""))
      errors.firstName = "First name is required.";
    if (validator.isEmpty(formValues.lastName + ""))
      errors.lastName = "Last name is required.";
    if (!validator.isMobilePhone(formValues.phoneNumber + ""))
      errors.phoneNumber = "Please enter a valid phone number.";
    if (validator.isEmpty(formValues.phoneNumber + ""))
      errors.phoneNumber = "Phone number is required.";
    return errors;
  };

  handleChange = e => {
    e.preventDefault();
    let { formValues } = this.state;
    let { name, value } = e.target;

    formValues[name] = value;
    this.setState({
      formValues: formValues
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
      let data = this.state.formValues;
      this.props.onSubmit({
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber
      });
    }
  };

  handleClose = e => {
    e.preventDefault();
    this.props.closeForm();
  };

  render() {
    return (
      <div className="emergency-contact-information-form contact-information-form">
        <form onSubmit={this.props.onSubmit}>
          <Input
            name="firstName"
            label="First Name"
            type="input"
            onChange={this.handleChange}
            wasValidated={this.state.wasValidated}
            error={this.state.errors.firstName}
            value={this.state.formValues["firstName"]}
          />
          <Input
            name="lastName"
            label="Last Name"
            type="input"
            onChange={this.handleChange}
            wasValidated={this.state.wasValidated}
            error={this.state.errors.lastName}
            value={this.state.formValues["lastName"]}
          />
          <PhoneInput
            name="phoneNumber"
            label="Phone Number"
            type="input"
            onChange={this.handleChange}
            wasValidated={this.state.wasValidated}
            error={this.state.errors.phoneNumber}
            value={this.state.formValues["phoneNumber"]}
          />
          <div className="form-group">
            <button
              className="btn btn-outline-secondary mr-3"
              onClick={this.handleClose}
            >
              Cancel
            </button>
            <button className="btn btn-primary" onClick={this.handleSubmit}>
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default EmergencyContactInformationForm;
