import React, { Component } from "react";
import validator from "validator";
import Input from "../forms/Input";
import PhoneInput from "../forms/PhoneInput";

class PrimaryContactInformationForm extends Component {
  state = {
    formValues: {
      firstName: this.props.data.firstName || "",
      lastName: this.props.data.lastName || "",
      phoneNumber: this.props.data.phoneNumber || "",
      email: this.props.data.email || "",
      streetAddress: this.props.data.streetAddress || "",
      streetAddress2: this.props.data.streetAddress2 || "",
      city: this.props.data.city || "",
      usState: this.props.data.state || "",
      zipCode: this.props.data.zipCode || ""
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
    if (!validator.isEmail(formValues.email + ""))
      errors.email = "Please enter a valid email address.";
    if (validator.isEmpty(formValues.email + ""))
      errors.email = "Email address is required.";
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
        phoneNumber: data.phoneNumber,
        email: data.email,
        streetAddress: data.streetAddress,
        streetAddress2: data.streetAddress2,
        city: data.city,
        state: data.usState,
        zipCode: data.zipCode
      });
    }
  };

  handleClose = e => {
    e.preventDefault();
    this.props.closeForm();
  };

  render() {
    return (
      <div className="primary-contact-information-form">
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
          <Input
            name="email"
            label="Email"
            type="email"
            onChange={this.handleChange}
            wasValidated={this.state.wasValidated}
            error={this.state.errors.email}
            value={this.state.formValues["email"]}
          />
          <div className="form-group">
            <label htmlFor="streetAddress">Address</label>
            <input
              name="streetAddress"
              type="input"
              className="form-control"
              onChange={this.handleChange}
              value={this.state.formValues["streetAddress"]}
            />
          </div>
          <div className="form-group">
            <label htmlFor="streetAddress2">Address (Line 2)</label>
            <input
              name="streetAddress2"
              type="input"
              className="form-control"
              onChange={this.handleChange}
              value={this.state.formValues["streetAddress2"]}
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              name="city"
              type="input"
              className="form-control"
              onChange={this.handleChange}
              value={this.state.formValues["city"]}
            />
          </div>
          <div className="form-group">
            <label htmlFor="usState">State</label>
            <input
              name="usState"
              type="input"
              className="form-control"
              onChange={this.handleChange}
              value={this.state.formValues["usState"]}
            />
          </div>
          <div className="form-group">
            <label htmlFor="zipCode">Zip Code</label>
            <input
              name="zipCode"
              type="input"
              className="form-control"
              onChange={this.handleChange}
              value={this.state.formValues["zipCode"]}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-primary" onClick={this.handleSubmit}>
              Save
            </button>
            <button
              className="btn btn-secondary"
              style={{ marginLeft: "20px" }}
              onClick={this.handleClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default PrimaryContactInformationForm;
