import React, { Component } from "react";
import _ from "lodash";
import moment from "moment";
import { Link } from "react-router-dom";

class RegistrationTable extends Component {
  render() {
    let content = this.props.registrations.map((reg, i) => {
      return (
        <tr key={i}>
          <td>{reg.camp.name}</td>
          <td>{_.capitalize(reg.camp.type)}</td>
          <td>{moment.utc(reg.camp.startDate).format("MM/DD/YYYY")}</td>
          <td>{moment.utc(reg.camp.endDate).format("MM/DD/YYYY")}</td>
          <td>
            {reg.camper.firstName} {reg.camper.lastName}
          </td>
          <td>{_.capitalize(reg.morningDropoff || "")}</td>
          <td>{_.capitalize(reg.afternoonPickup || "")}</td>
          <td>
            {reg.waitlist && (
              <span className="badge badge-warning">Waitlisted</span>
            )}
          </td>
          <td>
            {!reg.paid && !reg.deposit && (
              <button
                type="button"
                className="btn btn-outline-danger btn-sm"
                value={reg._id}
                onClick={this.props.deleteRegistration}
              >
                <i className="fas fa-times" /> Cancel
              </button>
            )}
            {!reg.paid && reg.deposit && (
              <Link to="/payments">
                <button
                  type="button"
                  className="btn btn-outline-warning btn-sm"
                  disabled
                >
                  <i className="fas fa-hourglass-half" /> Deposit Only
                </button>
              </Link>
            )}
            {reg.paid && (
              <button type="button" className="btn btn-success btn-sm" disabled>
                <i className="fas fa-check" /> Paid in Full
              </button>
            )}
          </td>
        </tr>
      );
    });
    return (
      <div className="table-responsive">
        <table className="table table-sm">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Camper</th>
              <th>Dropoff</th>
              <th>Pickup</th>
              <th />
              <th />
            </tr>
          </thead>
          <tbody>{content}</tbody>
        </table>
      </div>
    );
  }
}

RegistrationTable.defaultProps = {
  registrations: []
};

export default RegistrationTable;
