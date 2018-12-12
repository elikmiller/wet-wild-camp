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

  render() {
    let content = this.props.data.map((reg, i) => {
      let type =
        reg.camp.type.charAt(0).toUpperCase() + reg.camp.type.substr(1);
      return (
        <tr key={i}>
          <td>{reg.camp.name}</td>
          <td>{type}</td>
          <td>
            {reg.camper.firstName} {reg.camper.lastName}
          </td>
          <td>
            {!reg.paid && (
              <button
                type="button"
                className="btn btn-danger btn-sm"
                value={i}
                onClick={this.deleteRegistration}
              >
                Cancel
              </button>
            )}
            {reg.paid && (
              <button
                type="button"
                className="btn btn-success btn-sm"
                onClick={e => e.preventDefault()}
                disabled
              >
                Paid
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
            <th />
          </tr>
        </thead>
        <tbody>{content}</tbody>
      </table>
    );
  }
}

export default RegistrationTable;
