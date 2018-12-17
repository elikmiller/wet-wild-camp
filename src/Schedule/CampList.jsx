import React, { Component } from "react";
import Camp from "./Camp.jsx";
import ServerError from "../forms/ServerError";

class CampList extends Component {
  state = {
    errors: {}
  };

  errorHandling = errors => {
    this.setState({
      errors: errors
    });
  };

  render() {
    let { type } = this.props;
    let ageRange = type === "junior" ? "6 - 9" : "9 - 15";
    let title = type.charAt(0).toUpperCase() + type.substr(1);
    return (
      <div>
        {this.state.errors.server && <ServerError />}
        {this.state.errors.registration && (
          <CampError text={this.state.errors.registration} />
        )}
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
            <Camp
              key={i}
              camp={camp}
              errorHandling={this.errorHandling}
              refresh={this.props.refresh}
            />
          ))}
        </table>
      </div>
    );
  }
}

export default CampList;

export const CampError = props => {
  return (
    <div className="alert alert-danger" role="alert">
      <h4 className="alert-heading">Registration Error</h4>
      <p>{props.text}</p>
      <hr />
      <p className="mb-0">
        If this is a recurring issue, please contact us at 000-000-0000.
      </p>
    </div>
  );
};
