import React, { Component } from "react";
import Cleave from "cleave.js/react";
import CleavePhone from "cleave.js/dist/addons/cleave-phone.us"; // eslint-disable-line no-unused-vars

class PrimaryContactInformationForm extends Component {
  state = {
    formValues: {
      firstName: this.props.data.firstName || "",
      lastName: this.props.data.lastName || "",
      phoneNumber: this.props.data.phoneNumber || "",
      email: this.props.data.email || "",
      streetAddress: this.props.data.streetAddress || "",
      addressLineTwo: this.props.data.addressLineTwo || "",
      city: this.props.data.city || "",
      usState: this.props.data.state || "",
      zipCode: this.props.data.zipCode || ""
    }
  };

  handleChange = e => {
    e.preventDefault();
    let formValues = this.state.formValues;
    let id = e.target.id;
    let value = e.target.value;

    formValues[id] = value;
    this.setState({
      formValues: formValues
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    let data = this.state.formValues;
    this.props.onSubmit({
      primaryContact: {
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        email: data.email,
        streetAddress: data.streetAddress,
        addressLineTwo: data.addressLineTwo,
        city: data.city,
        state: data.usState,
        zipCode: data.zipCode
      }
    });
  };

  handleClose = e => {
    e.preventDefault();
    this.props.closeForm();
  };

  render() {
    return (
      <div className="primary-contact-information-form">
        <form onSubmit={this.props.onSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              type="input"
              className="form-control"
              onChange={this.handleChange}
              value={this.state.formValues["firstName"]}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              type="input"
              className="form-control"
              onChange={this.handleChange}
              value={this.state.formValues["lastName"]}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <Cleave
              id="phoneNumber"
              options={{ phone: true, phoneRegionCode: "US" }}
              type="input"
              className="form-control"
              onChange={this.handleChange}
              value={this.state.formValues["phoneNumber"]}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              className="form-control"
              onChange={this.handleChange}
              value={this.state.formValues["email"]}
            />
          </div>
          <div className="form-group">
            <label htmlFor="streetAddress">Address</label>
            <input
              id="streetAddress"
              type="input"
              className="form-control"
              onChange={this.handleChange}
              value={this.state.formValues["streetAddress"]}
            />
          </div>
          <div className="form-group">
            <label htmlFor="addressLineTwo">Address (Line 2)</label>
            <input
              id="addressLineTwo"
              type="input"
              className="form-control"
              onChange={this.handleChange}
              value={this.state.formValues["addressLineTwo"]}
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              id="city"
              type="input"
              className="form-control"
              onChange={this.handleChange}
              value={this.state.formValues["city"]}
            />
          </div>
          <div className="form-group">
            <label htmlFor="usState">State</label>
            <input
              id="usState"
              type="input"
              className="form-control"
              onChange={this.handleChange}
              value={this.state.formValues["usState"]}
            />
          </div>
          <div className="form-group">
            <label htmlFor="zipCode">Zip Code</label>
            <input
              id="zipCode"
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
            <button className="btn btn-secondary" onClick={this.handleClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default PrimaryContactInformationForm;
