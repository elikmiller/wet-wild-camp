import React, { Component } from "react";
import { AuthContext } from "../App";
import appClient from "../appClient";

class Camp extends Component {
  state = {
    registerOpen: false,
    campers: [],
    selectedCamper: "",
    errors: {}
  };

  getCampers = () => {
    appClient
      .getCampers(this.props.userId)
      .then(campers => {
        this.setState({ campers: campers.data });
      })
      .catch(err => {
        if (err.response) {
          if (err.response.status === 401) this.props.logout();
        } else if (err.response.status === 500) {
          this.setState({ errors: { server: "Server error." } });
        }
      });
  };

  handleChange = e => {
    this.setState({ selectedCamper: e.target.value });
  };

  registerCamper = () => {
    let { camp } = this.props;
    let camper = this.state.selectedCamper;
    if (
      camper !== "" &&
      !camp.campers.includes(camper) &&
      !camp.waitlist.includes(camper)
    ) {
      let dataObject = {
        user: this.props.userId,
        camper: camper,
        camp: camp._id
      };
      if (camp.waitlisted) {
        dataObject["waitlist"] = true;
      } else dataObject["waitlist"] = false;
      appClient
        .createRegistration(dataObject)
        .then(() => {
          this.toggleRegistration();
          this.setState({ selectedCamper: "" });
        })
        .catch(err => {
          if (err.response.status === 500) {
            this.setState({ errors: { server: "Server error." } });
          }
        });
    }
  };

  calculateSpaceRemaining = () => {
    let { camp } = this.props;
    let diff = camp.capacity - camp.campers.length;
    if (diff > 0) {
      return diff >= 10 ? "10+" : `${diff}`;
    }
    return "waitlisted";
  };

  toggleRegistration = () => {
    this.setState({ registerOpen: !this.state.registerOpen });
  };

  componentDidMount() {
    this.getCampers();
  }

  componentWillUnmount() {
    if (this.state.fetchingData) appClient.cancelRequest();
  }

  render() {
    let { camp } = this.props;
    // Calculates remaining space in camp
    let spaceRemaining = this.calculateSpaceRemaining();
    // Generates list of campers for select menu
    let selectCamper = this.state.campers.map((camper, i) => {
      return (
        <option key={i} value={camper._id}>
          {camper.firstName} {camper.lastName}
        </option>
      );
    });

    // Generates inline registration when opened
    let registerDisplay = this.state.registerOpen ? (
      <tr>
        <td colSpan="2">
          <select
            className="form-control form-control-sm"
            onChange={this.handleChange}
          >
            <option value="">Select a camper...</option>
            {selectCamper}
          </select>
        </td>
        <td />
        <td colSpan="2">
          <button
            className="btn btn-primary float-right btn-sm"
            onClick={this.registerCamper}
          >
            {camp.waitlisted ? "Join Waitlist" : "Register Camper"}
          </button>
        </td>
      </tr>
    ) : (
      <tr colSpan="5" />
    );

    return (
      <tbody>
        <tr>
          <td>{camp.name}</td>
          <td>{camp.startDate.slice(0, 10)}</td>
          <td>{camp.endDate.slice(0, 10)}</td>
          <td>${camp.fee}</td>
          <td>{spaceRemaining}</td>
          <td>
            <button
              className="btn btn-secondary float-right btn-sm"
              onClick={this.toggleRegistration}
            >
              {this.state.registerOpen ? "Cancel" : "Register"}
            </button>
          </td>
        </tr>
        {registerDisplay}
      </tbody>
    );
  }
}

export default props => (
  <AuthContext.Consumer>
    {auth => <Camp userId={auth.userId} logout={auth.logout} {...props} />}
  </AuthContext.Consumer>
);
