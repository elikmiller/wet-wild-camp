import React, { Component } from "react";
import moment from "moment";
import _ from "lodash";

class AdminCamp extends Component {
  formatDate(date) {
    return moment.utc(date).format("MM/DD/YYYY");
  }

  render() {
    let camp = this.props.data;
    return (
      <div className="admin-session">
        <p>Name: {camp.name}</p>
        <p>Type: {_.capitalize(camp.type)}</p>
        <p>Description: {camp.description}</p>
        <p>Fee: ${camp.fee && camp.fee.toFixed(2)}</p>
        <p>Capacity: {camp.capacity}</p>
        <p>Registrations: {camp.campers ? camp.campers.length : 0}</p>
        <p>
          Waitlisted Registrations: {camp.waitlist ? camp.waitlist.length : 0}
        </p>
        <p>Registration Open: {this.formatDate(camp.openDate)}</p>
        <p>Registration Close: {this.formatDate(camp.closeDate)}</p>
        <p>Camp Start: {this.formatDate(camp.startDate)}</p>
        <p>Camp End: {this.formatDate(camp.endDate)}</p>
        <button
          className="btn btn-primary btn-block"
          onClick={this.props.openForm}
        >
          <i className="fas fa-edit" /> Edit Camp
        </button>
      </div>
    );
  }
}

export default AdminCamp;
