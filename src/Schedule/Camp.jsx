import React, { Component } from "react";
import { AuthContext } from "../App";
import appClient from "../appClient";

class Camp extends Component {
  state = {
    registerOpen: false,
    campers: [],
    selectedCamper: ""
  };

  getCampers = () => {
    appClient
      .getCampers(this.props.userId)
      .then(campers => {
        this.setState({ campers: campers.data });
      })
      .catch(err => {
        if (err.response.status === 401) {
          this.props.logout();
        }
      });
  };

  handleChange = e => {
    this.setState({ selectedCamper: e.target.value });
  };

  registerCamper = data => {
    let id = this.props.camp._id;
    let camper = this.state.selectedCamper;
    if (camper !== "" && !this.props.camp.campers.includes(camper)) {
      this.props.camp.campers.push(camper);
      appClient
        .updateCamp(id, { campers: this.props.camp.campers })
        .then(res => {
          this.toggleRegistration();
          this.setState({ selectedCamper: "" });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  toggleRegistration = () => {
    this.setState({ registerOpen: !this.state.registerOpen });
  };

  componentDidMount() {
    this.getCampers();
  }

  render() {
    let { camp } = this.props;
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
          <select className="form-control" onChange={this.handleChange}>
            <option value="">Select a camper...</option>
            {selectCamper}
          </select>
        </td>
        <td />
        <td colSpan="2">
          <button
            className="btn btn-primary float-right"
            onClick={this.registerCamper}
          >
            Register Camper
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
          <td>
            <button
              className="btn btn-secondary float-right"
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
