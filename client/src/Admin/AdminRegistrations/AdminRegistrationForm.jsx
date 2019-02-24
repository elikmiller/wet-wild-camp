import React, { Component } from "react";
import validator from "validator";
import Input from "../../forms/Input";
import InputDropdown from "../../forms/InputDropdown";
import Textarea from "../../forms/Textarea";
import Checkbox from "../../forms/Checkbox";

class AdminRegistrationForm extends Component {
  state = {
    morningDropoff: this.props.morningDropoff,
    afternoonPickup: this.props.afternoonPickup,
    deposit: this.props.deposit,
    paid: this.props.paid,
    waitlist: this.props.waitlist,
    created: this.props.created,
    user: this.props.user,
    camper: this.props.camper,
    camp: this.props.camp,
    errors: {},
    wasValidated: false
  };

  validate = () => {
    let errors = {};
    //
    return errors;
  };

  handleOnChange = e => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
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
        morningDropoff: this.state.morningDropoff,
        afternoonPickup: this.state.afternoonPickup,
        deposit: this.state.deposit,
        paid: this.state.paid,
        waitlist: this.state.waitlist,
        camp: this.state.camp
      });
    }
  };

  render() {
    console.log(this.state.user);
    return (
      <div className="admin-registration-form">
        <form onSubmit={this.handleSubmit}>
          <Input
            name="user"
            label="User"
            type="input"
            value={this.state.user.fullName}
            disabled
          />
          <Input
            name="camper"
            label="Camper"
            type="input"
            value={this.state.camper.fullName}
            disabled
          />
          <Input
            name="camp"
            label="Camp"
            type="input"
            value={this.state.camp.fullName}
            disabled
          />
          <InputDropdown
            name="morningDropoff"
            label="Morning Dropoff"
            value={this.state.morningDropoff}
            placeholder="Please Select"
            options={[
              {
                name: "North",
                value: "north"
              },
              {
                name: "Central",
                value: "central"
              },
              {
                name: "South",
                value: "south"
              }
            ]}
            onChange={this.handleOnChange}
            wasValidated={this.state.wasValidated}
            error={this.state.errors.morningDropoff}
          />
          <InputDropdown
            name="afternoonPickup"
            label="Afternoon Pickup"
            value={this.state.afternoonPickup}
            placeholder="Please Select"
            options={[
              {
                name: "North",
                value: "north"
              },
              {
                name: "Central",
                value: "central"
              },
              {
                name: "South",
                value: "south"
              }
            ]}
            onChange={this.handleOnChange}
            wasValidated={this.state.wasValidated}
            error={this.state.errors.afternoonPickup}
          />
          <Checkbox
            name="deposit"
            label="Deposit Paid"
            onChange={this.handleOnChange}
            wasValidated={this.state.wasValidated}
            error={this.state.errors.deposit}
            checked={!!this.state.deposit}
          />
          <Checkbox
            name="paid"
            label="Full Amount Paid"
            onChange={this.handleOnChange}
            wasValidated={this.state.wasValidated}
            error={this.state.errors.paid}
            checked={!!this.state.paid}
          />
          <Checkbox
            name="waitlist"
            label="Waitlisted"
            onChange={this.handleOnChange}
            wasValidated={this.state.wasValidated}
            error={this.state.errors.waitlist}
            checked={!!this.state.waitlist}
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

AdminRegistrationForm.defaultProps = {
  morningDropoff: "",
  afternoonPickup: "",
  deposit: false,
  paid: false,
  waitlist: false,
  user: {},
  camper: {},
  camp: {}
};

export default AdminRegistrationForm;
