import React, { Component } from "react";
import moment from "moment";

class Camper extends Component {
  calculateAge(date) {
    return moment().diff(moment(date), "years", false);
  }

  formatBirthday(date) {
    return moment.utc(date).format("MM/DD/YYYY");
  }

  render() {
    let camper = this.props.data;
    return (
      <div className="camper">
        <h5 className="card-title">{`${camper.firstName} ${
          camper.lastName
        }`}</h5>
        <p className="card-text">
          <span className="text-capitalize">{camper.gender}</span>
          <br />
          Born {this.formatBirthday(camper.dateOfBirth)} (
          {this.calculateAge(camper.dateOfBirth)} years old)
          <br />
          {camper.notes}
        </p>
        <button
          className="btn btn-primary btn-block"
          onClick={this.props.openForm}
        >
          <i className="fas fa-edit" /> Edit Camper
        </button>
      </div>
    );
  }
}

export default Camper;
