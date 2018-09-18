import React, { Component } from "react";
import moment from "moment";
import appClient from "./appClient";

class Campers extends Component {
  state = {
    campers: []
  };

  calculateAge(date) {
    let age = moment().diff(moment(date), "years", false);
    return `${age} year${age === 1 ? "" : "s"} old`;
  }

  formatBirthday(date) {
    return moment(date).format("MMMM Do, YYYY");
  }

  componentDidMount() {
    appClient.currentUser().then(res => {
      appClient.getCampers(res.data.user._id).then(campers => {
        this.setState({ campers: campers.data });
      });
    });
  }

  render() {
    let campers = this.state.campers.map(camper => {
      return {
        firstName: camper.firstName,
        lastName: camper.lastName,
        gender: camper.gender,
        dateOfBirth: camper.dateOfBirth,
        notes: camper.notes
      };
    });
    return (
      <div>
        <h1>Campers</h1>
        <div className="row">
          {campers.map((camper, i) => (
            <div className="col-12 col-sm-3" key={i}>
              <div className="card">
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
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Campers;
