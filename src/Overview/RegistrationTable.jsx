import React, { Component } from "react";
import appClient from "../appClient";

class RegistrationTable extends Component {
  deleteRegistration = e => {
    let registration = this.props.data[e.target.value];
    e.preventDefault();
    appClient
      .deleteRegistration(registration._id)
      .then(() => {
        this.props.update();
      })
      .catch(err => {
        this.props.error(err);
      });
  };

  capitalizeFirst = str => {
    return str.charAt(0).toUpperCase() + str.substr(1);
  };

  render() {
    let content = this.props.data.map((reg, i) => {
      let type = this.capitalizeFirst(reg.camp.type);
      return (
        <tr key={i}>
          <td>{reg.camp.name}</td>
          <td>{type}</td>
          <td>
            {reg.camper.firstName} {reg.camper.lastName}
          </td>
          <td>{this.capitalizeFirst(reg.morningDropoff || "")}</td>
          <td>{this.capitalizeFirst(reg.afternoonPickup || "")}</td>
          <td>
            {reg.waitlist && (
              <span className="badge badge-warning">Waitlisted</span>
            )}
          </td>
          <td>
            {!reg.paid && !reg.deposit && (
              <button
                type="button"
                className="btn btn-danger btn-sm"
                value={i}
                onClick={this.deleteRegistration}
              >
                Cancel
              </button>
            )}
            {!reg.paid && reg.deposit && (
              <button
                type="button"
                className="btn btn-warning btn-sm"
                onClick={e => e.preventDefault()}
                disabled
              >
                Deposit Only
              </button>
            )}
            {reg.paid && (
              <button
                type="button"
                className="btn btn-success btn-sm"
                onClick={e => e.preventDefault()}
                disabled
              >
                Paid in Full
              </button>
            )}
          </td>
        </tr>
      );
    });
    return (
      <table className="table table-sm">
        <thead>
          <tr>
            <th>Camp Session</th>
            <th>Camp</th>
            <th>Camper</th>
            <th>Dropoff</th>
            <th>Pickup</th>
            <th />
            <th />
          </tr>
        </thead>
        <tbody>{content}</tbody>
      </table>
    );
  }
}

export default RegistrationTable;
