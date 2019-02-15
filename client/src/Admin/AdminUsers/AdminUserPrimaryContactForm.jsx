import React, { Component } from "react";
import Input from "../../forms/Input";
import PhoneInput from "../../forms/PhoneInput";

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
    zipCode: this.props.zipCode || ""
  };

  handleOnChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Input
          name="firstName"
          label="First Name"
          type="input"
          onChange={this.handleOnChange}
          wasValidated={this.state.wasValidated}
          error={this.props.errors.firstName}
          value={this.state.firstName}
        />
        <Input
          name="lastName"
          label="Last Name"
          type="input"
          onChange={this.handleOnChange}
          wasValidated={this.state.wasValidated}
          error={this.props.errors.lastName}
          value={this.state.lastName}
        />
        <Input
          name="email"
          label="Email Address"
          type="email"
          onChange={this.handleOnChange}
          wasValidated={this.state.wasValidated}
          error={this.props.errors.email}
          value={this.state.email}
        />
        <PhoneInput
          name="phoneNumber"
          label="Phone Number"
          onChange={this.handleOnChange}
          wasValidated={this.state.wasValidated}
          error={this.props.errors.phoneNumber}
          value={this.state.phoneNumber}
        />
        <Input
          name="streetAddress"
          label="Street Address"
          type="input"
          onChange={this.handleOnChange}
          wasValidated={this.state.wasValidated}
          error={this.props.errors.streetAddress}
          value={this.state.streetAddress}
        />
        <Input
          name="streetAddress2"
          label="Street Address Line Two (optional)"
          type="input"
          onChange={this.handleOnChange}
          wasValidated={this.state.wasValidated}
          error={this.props.errors.streetAddress2}
          value={this.state.streetAddress2}
        />
        <Input
          name="city"
          label="City"
          type="input"
          onChange={this.handleOnChange}
          wasValidated={this.state.wasValidated}
          error={this.props.errors.city}
          value={this.state.city}
        />
        <Input
          name="state"
          label="State"
          type="input"
          onChange={this.handleOnChange}
          wasValidated={this.state.wasValidated}
          error={this.props.errors.state}
          value={this.state.state}
        />
        <Input
          name="zipCode"
          label="Zip Code"
          type="input"
          onChange={this.handleOnChange}
          wasValidated={this.state.wasValidated}
          error={this.props.errors.zipCode}
          value={this.state.zipCode}
        />
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
      </form>
    );
  }
}

export default AdminUserPrimaryContactForm;
