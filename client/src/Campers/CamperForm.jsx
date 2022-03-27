import React, { Component } from "react";
import validator from "validator";
import Input from "../forms/Input";
import InputDropdown from "../forms/InputDropdown";

class CamperForm extends Component {
  state = {
    camper: {
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
    let { camper } = this.state;
    let errors = {};
    if (validator.isEmpty(camper.firstName + ""))
      errors.firstName = "First name is required.";
    if (validator.isEmpty(camper.lastName + ""))
      errors.lastName = "Last name is required.";
    if (!validator.isISO8601(camper.dateOfBirth + ""))
      errors.dateOfBirth = "Please enter a valid date.";
    if (validator.isEmpty(camper.dateOfBirth + ""))
      errors.dateOfBirth = "Birthdate is required.";
    if (validator.isEmpty(camper.gender + ""))
      errors.gender = "Gender is required.";
    return errors;
  };

  handleChange = e => {
    e.preventDefault();
    let { camper } = this.state;
    let { name, value } = e.target;

    camper[name] = value;
    this.setState({
      camper: camper
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
      let camper = this.state.camper;
      this.props.onSubmit(camper);
    }
  };

  render() {
    return (
      <div className="camper-form">
        <form onSubmit={this.handleSubmit}>
          <Input
            name="firstName"
            label="First Name"
            type="input"
            onChange={this.handleChange}
            wasValidated={this.state.wasValidated}
            error={this.state.errors.firstName}
            value={this.state.camper["firstName"]}
          />
          <Input
            name="lastName"
            label="Last Name"
            type="input"
            onChange={this.handleChange}
            wasValidated={this.state.wasValidated}
            error={this.state.errors.lastName}
            value={this.state.camper["lastName"]}
          />
          <InputDropdown
            name="gender"
            label="Gender/Gender Identity"
            onChange={this.handleChange}
            wasValidated={this.state.wasValidated}
            error={this.state.errors.gender}
            value={this.state.camper["gender"]}
            placeholder={"Please Select"}
            options={[
              { value: "male", name: "Male" },
              { value: "female", name: "Female" },
              { value: "non-binary", name: "Non-binary"},
              { value: "unspecified", name: "Unspecified" }
            ]}
          />
          <Input
            name="dateOfBirth"
            label="Birthdate"
            type="date"
            onChange={this.handleChange}
            wasValidated={this.state.wasValidated}
            error={this.state.errors.dateOfBirth}
            value={this.state.camper["dateOfBirth"]}
          />
          <div className="form-group">
            <label htmlFor="notes">Notes</label>
            <textarea
              name="notes"
              className="form-control form-control-sm"
              onChange={this.handleChange}
              value={this.state.camper["notes"]}
            />
          </div>
          <div className="form-group">
            <button
              className="btn btn-outline-secondary mr-3"
              onClick={this.props.closeForm}
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
    );
  }
}

export default CamperForm;
