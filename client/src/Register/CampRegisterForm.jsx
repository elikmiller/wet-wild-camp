import React, { Component } from "react";
import appClient from "../appClient";
import InputDropdown from "../forms/InputDropdown";
import Input from "../forms/Input";

class CampRegisterForm extends Component {
  state = {
    campers: [],
    camper: {},
    morningDropoff: "",
    afternoonPickup: "",
    errors: {},
    wasValidated: false
  };

  componentDidMount() {
    this.getCampers();
  }

  getCampers = () => {
    appClient.getCampers().then(campers => {
      this.setState({ campers });
    });
  };

  getPickupOptions = () => {
    let pickupOptions = [];
    let campPickups = this.props.camp.pickups ? this.props.camp.pickups : [];

    if (campPickups.includes("north")) {
      pickupOptions.push({ name: "North", value: "north" });
    }
    if (campPickups.includes("central")) {
      pickupOptions.push({ name: "Central", value: "central" });
    }
    if (campPickups.includes("south")) {
      pickupOptions.push({ name: "South", value: "south" });
    }
    return pickupOptions;
  }

  handleOnChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleOnSubmit = () => {
    this.props.onSubmit({
      camp: this.props.camp._id,
      camper: this.state.camper,
      morningDropoff: this.state.morningDropoff,
      afternoonPickup: this.state.afternoonPickup
    });
  };

  render() {
    return (
      <div className="camp-register-form">
        {this.props.error.message && (
          <div className="alert alert-danger">{this.props.error.message}</div>
        )}
        <form onSubmit={this.handleOnSubmit}>
          <Input
            name="camp"
            label="Camp"
            defaultValue={this.props.camp.fullName}
            disabled
          />
          <InputDropdown
            name="camper"
            label="Camper"
            onChange={this.handleOnChange}
            wasValidated={this.state.wasValidated}
            error={this.state.errors.camper}
            value={this.state.camper}
            placeholder={"Please Select"}
            options={this.state.campers.map(camper => ({
              name: camper.fullName,
              value: camper._id
            }))}
          />
          <InputDropdown
            name="morningDropoff"
            label="Select a Morning Dropoff Location:"
            onChange={this.handleOnChange}
            wasValidated={this.state.wasValidated}
            error={this.state.errors.morningDropoff}
            value={this.state.morningDropoff}
            placeholder={"Please Select"}
            options={this.getPickupOptions()}
          />
          <InputDropdown
            name="afternoonPickup"
            label="Select an Afternoon Pickup Location:"
            onChange={this.handleOnChange}
            wasValidated={this.state.wasValidated}
            error={this.state.errors.afternoonPickup}
            value={this.state.afternoonPickup}
            placeholder={"Please Select"}
            options={this.getPickupOptions()}
          />
          <div className="form-group">
            <button
              className="btn btn-outline-secondary mr-3"
              type="button"
              onClick={this.props.closeForm}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary"
              type="button"
              onClick={this.handleOnSubmit}
            >
              {"Register"}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default CampRegisterForm;
