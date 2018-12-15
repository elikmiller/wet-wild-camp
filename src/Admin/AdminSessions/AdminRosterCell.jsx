import React, { Component } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import appClient from "../../appClient";

class AdminRosterCell extends Component {
  calculateAge(date) {
    return moment().diff(moment(date), "years", false);
  }

  addToCamp = e => {
    e.preventDefault();
    appClient
      .moveFromWaitlist(this.props.campId, this.props.data.registration._id)
      .then(() => {
        this.props.refresh();
      })
      .catch(err => {
        console.error(err);
      });
  };

  removeFromCamp = e => {
    e.preventDefault();
    appClient
      .deleteRegistration(this.props.data.registration._id)
      .then(() => {
        this.props.refresh();
      })
      .catch(err => {
        console.error(err);
      });
  };

  render() {
    let { data, type } = this.props;
    let badge = data.notes.length ? (
      <span className="badge badge-warning">Notes</span>
    ) : (
      <span className="badge badge-secondary">None</span>
    );
    let removeButton;
    if (data.registration.paid) {
      removeButton = (
        <button className="btn btn-success btn-sm" disabled>
          Paid in Full
        </button>
      );
    } else if (data.registration.deposit) {
      removeButton = (
        <button className="btn btn-warning btn-sm" disabled>
          Deposit Paid
        </button>
      );
    } else {
      removeButton = (
        <button className="btn btn-danger btn-sm" onClick={this.removeFromCamp}>
          Remove
        </button>
      );
    }
    return (
      <tr>
        <td>{data.firstName}</td>
        <td>{data.lastName}</td>
        <td>{this.calculateAge(data.dateOfBirth)}</td>
        <td>{badge}</td>
        <td>{data.morningDropoff}</td>
        <td>{data.afternoonPickup}</td>
        <td>
          {type === "waitlist" && (
            <button className="btn btn-primary btn-sm" onClick={this.addToCamp}>
              Add
            </button>
          )}
          {type === "roster" && removeButton}
        </td>
        <td>
          <Link to={`/admin/campers/${data._id}`}>More</Link>
        </td>
      </tr>
    );
  }
}

export default AdminRosterCell;
