import React, { Component } from "react";
import InputDropdown from "../../forms/InputDropdown";
import validator from "validator";
import appClient from "../../appClient";
import Spinner from "../../Spinner/Spinner";

class AdminCamperRegistrationForm extends Component {
  state = {
    formValues: {
      camp: "",
      morningDropoff: "",
      afternoonPickup: "",
      paymentStatus: ""
    },
    camps: [],
    errors: {},
    wasValidated: false,
    loading: false
  };

  componentDidMount() {
    this.getCamps();
  }

  validate = () => {
    let { formValues } = this.state;
    let errors = {};
    if (validator.isEmpty(formValues.camp + ""))
      errors.camp = "Camp is required.";
    if (validator.isEmpty(formValues.morningDropoff + ""))
      errors.morningDropoff = "Dropoff Location is required.";
    if (validator.isEmpty(formValues.afternoonPickup + ""))
      errors.afternoonPickup = "Pickup Location is required.";
    if (validator.isEmpty(formValues.paymentStatus + ""))
      errors.paymentStatus = "Payment Status is required.";
    return errors;
  };

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({
      errors,
      wasValidated: true
    });

    if (Object.keys(errors).length === 0) {
      this.props.onSubmit(this.state.formValues);
      this.props.toggle();
    }
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

  getCamps = () => {
    this.setState({ loading: true });
    appClient.adminGetCamps().then(camps => {
      let campOptions = camps.map(camp => {
        return { value: camp._id, name: `${camp.name} ${camp.type}` };
      });
      this.setState({
        camps: campOptions,
        loading: false
      });
    });
  };

  locations = [
    { value: "north", name: "North" },
    { value: "central", name: "Central" },
    { value: "south", name: "South" }
  ];

  payments = [
    { value: "none", name: "No Payments" },
    { value: "deposit", name: "Deposit Paid" },
    { value: "full", name: "Paid in Full" }
  ];

  render() {
    if (this.state.loading) return <Spinner />;
    return (
      <div style={formStyle}>
        <h3 className="mb-4">New Registration</h3>
        <form onSubmit={this.handleSubmit}>
          <InputDropdown
            name="camp"
            label="Select a Camp Session:"
            onChange={this.handleChange}
            wasValidated={this.state.wasValidated}
            error={this.state.errors.camp}
            value={this.state.formValues.camp}
            placeholder={"Please Select"}
            options={this.state.camps}
          />
          <InputDropdown
            name="morningDropoff"
            label="Select a Morning Dropoff Location:"
            onChange={this.handleChange}
            wasValidated={this.state.wasValidated}
            error={this.state.errors.morningDropoff}
            value={this.state.formValues.morningDropoff}
            placeholder={"Please Select"}
            options={this.locations}
          />
          <InputDropdown
            name="afternoonPickup"
            label="Select an Afternoon Pickup Location:"
            onChange={this.handleChange}
            wasValidated={this.state.wasValidated}
            error={this.state.errors.afternoonPickup}
            value={this.state.formValues.afternoonPickup}
            placeholder={"Please Select"}
            options={this.locations}
          />
          <InputDropdown
            name="paymentStatus"
            label="Select a Payment Status:"
            onChange={this.handleChange}
            wasValidated={this.state.wasValidated}
            error={this.state.errors.paymentStatus}
            value={this.state.formValues.paymentStatus}
            placeholder={"Please Select"}
            options={this.payments}
          />
          <button
            onClick={this.props.toggle}
            className="btn btn-outline-secondary mr-3"
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Create Registration
          </button>
        </form>
      </div>
    );
  }
}

export default AdminCamperRegistrationForm;

const formStyle = {
  maxWidth: "30rem",
  margin: "1rem auto 3rem"
};
