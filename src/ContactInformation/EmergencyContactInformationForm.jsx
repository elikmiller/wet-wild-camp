import React, { Component } from "react";

class EmergencyContactInformationForm extends Component {
  state = {
    formValues: {
      firstName: this.props.data.firstName || "",
      lastName: this.props.data.lastName || "",
      phoneNumber: this.props.data.phoneNumber || ""
    }
  };

  componentDidMount() {}

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
      emergencyContact: {
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber
      }
    });
  };

  handleClose = e => {
    e.preventDefault();
    this.props.closeForm();
  };

  render() {
    return (
      <div className="emergency-contact-information-form">
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
            <input
              id="phoneNumber"
              type="input"
              className="form-control"
              onChange={this.handleChange}
              value={this.state.formValues["phoneNumber"]}
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

export default EmergencyContactInformationForm;
