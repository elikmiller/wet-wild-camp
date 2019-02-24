import React, { Component } from "react";
import validator from "validator";
import Input from "../../forms/Input";
import InputDropdown from "../../forms/InputDropdown";
import Textarea from "../../forms/Textarea";

class AdminCamperForm extends Component {
  state = {
    firstName: this.props.firstName,
    lastName: this.props.lastName,
    gender: this.props.gender,
    dateOfBirth: this.props.dateOfBirth.slice(0, 10),
    swimmingStrength: this.props.swimmingStrength,
    notes: this.props.notes,
    errors: {},
    wasValidated: false
  };

  validate = () => {
    let errors = {};
    if (validator.isEmpty(this.state.firstName))
      errors.firstName = "First Name is required.";
    if (validator.isEmpty(this.state.lastName))
      errors.lastName = "Last Name is required.";
    if (validator.isEmpty(this.state.gender))
      errors.gender = "Gender is required.";
    if (!validator.isISO8601(this.state.dateOfBirth))
      errors.dateOfBirth = "A valid Date of Birth is required.";
    if (validator.isBefore(this.state.dateOfBirth, Date.now().toString()))
      errors.dateOfBirth = "Date of Birth must be in the past.";
    if (validator.isEmpty(this.state.swimmingStrength))
      errors.swimmingStrength = "Swimming Strength is required.";
    return errors;
  };

  handleOnChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
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
      this.props.onSubmit({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        gender: this.state.gender,
        dateOfBirth: this.state.dateOfBirth,
        notes: this.state.notes,
        swimmingStrength: this.state.swimmingStrength
      });
      this.props.closeForm();
    }
  };

  render() {
    return (
      <div className="admin-camper-form">
        <form onSubmit={this.handleSubmit}>
          <Input
            name="firstName"
            label="First Name"
            type="input"
            onChange={this.handleOnChange}
            wasValidated={this.state.wasValidated}
            error={this.state.errors.firstName}
            value={this.state.firstName}
          />
          <Input
            name="lastName"
            label="Last Name"
            type="input"
            onChange={this.handleOnChange}
            wasValidated={this.state.wasValidated}
            error={this.state.errors.lastName}
            value={this.state.lastName}
          />
          <InputDropdown
            name="gender"
            label="Gender"
            placeholder={"Please Select"}
            options={[
              { name: "Male", value: "male" },
              { name: "Female", value: "female" },
              { name: "Unspecified", value: "unspecified" }
            ]}
            onChange={this.handleOnChange}
            wasValidated={this.state.wasValidated}
            error={this.state.errors.gender}
            value={this.state.gender}
          />
          <Input
            name="dateOfBirth"
            label="Date Of Birth"
            type="date"
            onChange={this.handleOnChange}
            wasValidated={this.state.wasValidated}
            error={this.state.errors.dateOfBirth}
            value={this.state.dateOfBirth}
          />
          <InputDropdown
            name="swimmingStrength"
            label="Swimming Strength"
            placeholder={"Please Select"}
            options={[
              { name: "None", value: "none" },
              { name: "Weak", value: "weak" },
              { name: "Fair", value: "fair" },
              { name: "Strong", value: "strong" }
            ]}
            onChange={this.handleOnChange}
            wasValidated={this.state.wasValidated}
            error={this.state.errors.swimmingStrength}
            value={this.state.swimmingStrength}
          />
          <Textarea
            name="notes"
            label="Notes"
            type="input"
            onChange={this.handleOnChange}
            wasValidated={this.state.wasValidated}
            error={this.state.errors.notes}
            value={this.state.notes}
          />
          <div className="mb-3">
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
          </div>
        </form>
      </div>
    );
  }
}

AdminCamperForm.defaultProps = {
  firstName: "",
  lastName: "",
  gender: "",
  dateOfBirth: "",
  swimmingStrength: "",
  notes: ""
};

export default AdminCamperForm;
