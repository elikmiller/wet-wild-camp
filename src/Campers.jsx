import React, { Component } from "react";
import moment from "moment";

class Campers extends Component {
  calculateAge(date) {
    let age = moment().diff(moment(date), "years", false);
    return `${age} year${age === 1 ? "" : "s"} old`;
  }

  render() {
    let campers = [
      {
        firstName: "Bobby",
        lastName: "Hill",
        gender: "Male",
        dateOfBirth: "03/15/2012",
        notes: ""
      },
      {
        firstName: "Luanne",
        lastName: "Platter",
        gender: "Female",
        dateOfBirth: "11/03/2005",
        notes: ""
      }
    ];
    return (
      <div>
        <h1>Campers</h1>
        <div className="row">
          {campers.map(camper => (
            <div className="col-12 col-sm-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{`${camper.firstName} ${
                    camper.lastName
                  }`}</h5>
                  <p className="card-text">
                    {camper.gender}
                    <br />
                    {camper.dateOfBirth} ({this.calculateAge(
                      camper.dateOfBirth
                    )})
                    <br />
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
