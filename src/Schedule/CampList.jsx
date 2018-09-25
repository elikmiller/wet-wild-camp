import React, { Component } from "react";

class CampList extends Component {
  render() {
    let { type } = this.props;
    let title = type.charAt(0).toUpperCase() + type.substr(1);
    return (
      <div>
        <h2>{title} Camps (Ages 8 - 15)</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Week</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Fee</th>
            </tr>
          </thead>
          <tbody>
            {this.props.camps.map((camp, i) => (
              <tr key={i}>
                <td>{camp.name}</td>
                <td>{camp.startDate.slice(0, 10)}</td>
                <td>{camp.endDate.slice(0, 10)}</td>
                <td>${camp.fee}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default CampList;
