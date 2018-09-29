import React, { Component } from "react";
import moment from "moment";

class CamperCard extends Component {
  calculateAge(date) {
    let age = moment().diff(moment(date), "years", false);
    return `${age} year${age === 1 ? "" : "s"} old`;
  }

  formatBirthday(date) {
    return moment.utc(date).format("MMMM Do, YYYY");
  }

  render() {
    let camper = this.props.data;
    return (
      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">{`${camper.firstName} ${
            camper.lastName
          }`}</h5>
          <p className="card-text">
            {camper.gender}
            <br />
            {this.formatBirthday(camper.dateOfBirth)} (
            {this.calculateAge(camper.dateOfBirth)})<br />
            {camper.notes}
          </p>
          <button className="btn btn-primary" onClick={this.props.openForm}>
            Edit
          </button>
        </div>
      </div>
    );
  }
}

export default CamperCard;
