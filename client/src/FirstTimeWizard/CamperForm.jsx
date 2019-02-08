import React, { Component } from "react";
import validator from "validator";
import Input from "../forms/Input";
import InputDropdown from "../forms/InputDropdown";
import Textarea from "../forms/Textarea";
import appClient from "../appClient";
import Spinner from "../Spinner/Spinner";

class CamperForm extends Component {
  state = {
    firstName: this.props.firstName,
    lastName: this.props.lastName,
    gender: this.props.gender,
    dateOfBirth: this.props.dateOfBirth,
    notes: this.props.notes,
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
        .createCamper({
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          gender: this.state.gender,
          dateOfBirth: this.state.dateOfBirth,
          notes: this.state.notes
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
    if (!validator.isISO8601(this.state.dateOfBirth + ""))
      errors.dateOfBirth = "Please enter a valid date.";
    if (validator.isEmpty(this.state.dateOfBirth + ""))
      errors.dateOfBirth = "Birthdate is required.";
    if (validator.isEmpty(this.state.gender + ""))
      errors.gender = "Gender is required.";
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
      <div className="camper-form">
        {this.state.isLoading && <Spinner />}
        <p>
          <strong>Camper Information</strong>
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
          />
          <Input
            name="lastName"
            label="Last Name"
            type="input"
            onChange={this.handleChange}
            wasValidated={this.state.wasValidated}
            error={this.state.errors.lastName}
            value={this.state["lastName"]}
          />
          <InputDropdown
            name="gender"
            label="Gender"
            onChange={this.handleChange}
            wasValidated={this.state.wasValidated}
            error={this.state.errors.gender}
            value={this.state["gender"]}
            placeholder={"Please Select"}
            options={[
              { value: "male", name: "Male" },
              { value: "female", name: "Female" },
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
            value={this.state["dateOfBirth"]}
          />
          <Textarea
            name="notes"
            label="Notes"
            onChange={this.handleChange}
            wasValidated={this.state.wasValidated}
            error={this.state.errors.dateOfBirth}
            value={this.state.notes}
          />
        </form>
      </div>
    );
  }
}

CamperForm.defaultProps = {
  firstName: "",
  lastName: "",
  gender: "",
  dateOfBirth: new Date().toISOString(),
  notes: ""
};

export default CamperForm;
