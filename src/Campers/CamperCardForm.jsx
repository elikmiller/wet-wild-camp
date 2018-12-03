import React, { Component } from "react";
import validator from "validator";
import Input from "../forms/Input";

class CamperCardForm extends Component {
  state = {
    formValues: {
      firstName: this.props.data ? this.props.data.firstName : "",
      lastName: this.props.data ? this.props.data.lastName : "",
      gender: this.props.data ? this.props.data.gender : "",
      dateOfBirth: this.props.data
        ? this.props.data.dateOfBirth.slice(0, 10)
        : "",
      notes: this.props.data ? this.props.data.notes : ""
    },
    errors: {},
    wasValidated: true
  };

  validate = () => {
    let { formValues } = this.state;
    let errors = {};
    if (validator.isEmpty(formValues.firstName + ""))
      errors.firstName = "First name is required.";
    if (validator.isEmpty(formValues.lastName + ""))
      errors.lastName = "Last name is required.";
    if (!validator.isISO8601(formValues.dateOfBirth + ""))
      errors.dateOfBirth = "Please enter a valid date.";
    if (validator.isEmpty(formValues.dateOfBirth + ""))
      errors.dateOfBirth = "Birthdate is required.";
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
      this.props.onSubmit(data);
    }
  };

  handleClose = e => {
    e.preventDefault();
    this.props.closeForm();
  };

  render() {
    return (
      <div className="camper-card-form">
        <div className="card mb-3">
          <div className="card-body">
            <form onSubmit={this.handleSubmit}>
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
              <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <select
                  id="gender"
                  className="custom-select"
                  onChange={this.handleChange}
                  value={this.state.formValues["gender"]}
                >
                  <option defaultValue>Choose a gender...</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="unspecified">Unspecified</option>
                </select>
              </div>
              <Input
                name="dateOfBirth"
                label="Birthdate"
                type="input"
                onChange={this.handleChange}
                wasValidated={this.state.wasValidated}
                error={this.state.errors.dateOfBirth}
                value={this.state.formValues["dateOfBirth"]}
              />
              <div className="form-group">
                <label htmlFor="notes">Notes</label>
                <textarea
                  id="notes"
                  className="form-control form-control-sm"
                  onChange={this.handleChange}
                  value={this.state.formValues["notes"]}
                />
              </div>
              <div className="form-group text-right">
                <button
                  className="btn btn-secondary mr-1"
                  onClick={this.handleClose}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  type="submit"
                  onClick={this.handleSubmit}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CamperCardForm;
