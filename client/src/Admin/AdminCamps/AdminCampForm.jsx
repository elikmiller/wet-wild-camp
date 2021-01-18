import React, { Component } from "react";
import validator from "validator";
import Input from "../../forms/Input";
import InputDropdown from "../../forms/InputDropdown";
import Textarea from "../../forms/Textarea";
import Checkbox from "../../forms/Checkbox";

class AdminCampForm extends Component {
  state = {
    name: this.props.name,
    type: this.props.type,
    description: this.props.description,
    pickups: this.props.pickups,
    fee: this.props.fee,
    openDate: this.props.openDate.slice(0, 10),
    closeDate: this.props.closeDate.slice(0, 10),
    startDate: this.props.startDate.slice(0, 10),
    endDate: this.props.endDate.slice(0, 10),
    capacity: this.props.capacity,
    errors: {},
    wasValidated: false
  };

  validate = () => {
    let errors = {};
    if (validator.isEmpty(this.state.name + ""))
      errors.name = "Name is required";
    if (validator.isEmpty(this.state.type + ""))
      errors.type = "Type is required";
    if (validator.isEmpty(this.state.fee + "")) errors.fee = "Fee is required";
    if (validator.isEmpty(this.state.openDate + ""))
      errors.openDate = "Open Date is required";
    if (validator.isEmpty(this.state.closeDate + ""))
      errors.closeDate = "Close Date is required";
    if (validator.isEmpty(this.state.startDate + ""))
      errors.startDate = "Start Date is required";
    if (validator.isEmpty(this.state.endDate + ""))
      errors.endDate = "End Date is required";
    if (validator.isEmpty(this.state.capacity + ""))
      errors.capacity = "Capacity is required";
    return errors;
  };

  handleOnChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handlePickupChange = e => {
    let resultsArray = [];
    const checkboxes = document.querySelectorAll('#activePickups input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      if (checkbox.checked) {
        resultsArray.push(checkbox.name);
      }
    });
    this.setState({
      pickups: resultsArray
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({
      errors,
      wasValidated: true
    });
    if (Object.keys(errors).length === 0) {
      this.props.onSubmit({
        name: this.state.name,
        type: this.state.type,
        description: this.state.description,
        pickups: this.state.pickups,
        fee: this.state.fee,
        startDate: this.state.startDate,
        endDate: this.state.endDate,
        openDate: this.state.openDate,
        closeDate: this.state.closeDate,
        capacity: this.state.capacity
      });
    }
  };

  render() {
    return (
      <div className="admin-camp-form">
        <form onSubmit={this.handleSubmit}>
          <Input
            name="name"
            label="Name"
            type="input"
            onChange={this.handleOnChange}
            wasValidated={this.state.wasValidated}
            error={this.state.errors.name}
            value={this.state.name}
          />
          <InputDropdown
            name="type"
            label="Type"
            placeholder={"Please Select"}
            options={[
              { name: "All Ages", value: "all" },
              { name: "Adventure", value: "adventure" },
              { name: "Junior", value: "junior" }
            ]}
            onChange={this.handleOnChange}
            wasValidated={this.state.wasValidated}
            error={this.state.errors.type}
            value={this.state.type}
          />
          <Textarea
            name="description"
            label="Description"
            type="input"
            onChange={this.handleOnChange}
            wasValidated={this.state.wasValidated}
            error={this.state.errors.description}
            value={this.state.description}
          />
          <div id="activePickups">
            <label>Active Pickup Locations</label>
            <Checkbox 
              label="North" 
              name="north"
              checked={this.state.pickups ? this.state.pickups.includes("north") : false} 
              onChange={this.handlePickupChange}
            />
            <Checkbox 
              label="Central" 
              name="central"
              checked={this.state.pickups ? this.state.pickups.includes("central") : false}
              onChange={this.handlePickupChange}
            />
            <Checkbox 
              label="South" 
              name="south"
              checked={this.state.pickups ? this.state.pickups.includes("south") : false}
              onChange={this.handlePickupChange}
            />
          </div>
          <Input
            name="fee"
            label="Fee"
            type="number"
            onChange={this.handleOnChange}
            wasValidated={this.state.wasValidated}
            error={this.state.errors.fee}
            value={this.state.fee}
          />
          <Input
            name="openDate"
            label="Open Date"
            type="date"
            onChange={this.handleOnChange}
            wasValidated={this.state.wasValidated}
            error={this.state.errors.openDate}
            value={this.state.openDate}
          />
          <Input
            name="closeDate"
            label="Close Date"
            type="date"
            onChange={this.handleOnChange}
            wasValidated={this.state.wasValidated}
            error={this.state.errors.closeDate}
            value={this.state.closeDate}
          />
          <Input
            name="startDate"
            label="Start Date"
            type="date"
            onChange={this.handleOnChange}
            wasValidated={this.state.wasValidated}
            error={this.state.errors.startDate}
            value={this.state.startDate}
          />
          <Input
            name="endDate"
            label="End Date"
            type="date"
            onChange={this.handleOnChange}
            wasValidated={this.state.wasValidated}
            error={this.state.errors.endDate}
            value={this.state.endDate}
          />
          <Input
            name="capacity"
            label="Capacity"
            type="number"
            onChange={this.handleOnChange}
            wasValidated={this.state.wasValidated}
            error={this.state.errors.capacity}
            value={this.state.capacity}
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

AdminCampForm.defaultProps = {
  name: "",
  type: "",
  description: "",
  fee: 0,
  openDate: "",
  closeDate: "",
  startDate: "",
  endDate: "",
  capacity: 0
};

export default AdminCampForm;
