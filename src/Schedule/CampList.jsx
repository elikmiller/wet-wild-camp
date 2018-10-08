import React, { Component } from "react";
import Camp from "./Camp.jsx";

class CampList extends Component {
  render() {
    let { type } = this.props;
    let ageRange = type === "junior" ? "6 - 9" : "9 - 15";
    let title = type.charAt(0).toUpperCase() + type.substr(1);
    return (
      <div>
        <h2>
          {title} Camp (Ages {ageRange})
        </h2>
        <table className="table table-sm">
          <thead>
            <tr>
              <th>Week</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Fee</th>
              <th>Openings</th>
              <th />
            </tr>
          </thead>
          {this.props.camps.map((camp, i) => (
            <Camp key={i} camp={camp} />
          ))}
        </table>
      </div>
    );
  }
}

export default CampList;
