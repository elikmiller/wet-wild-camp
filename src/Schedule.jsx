import React, { Component } from "react";
import appClient from "./appClient";

class Schedule extends Component {
  state = {
    camps: []
  };

  refreshSchedule = () => {
    appClient.getCamps().then(res => {
      this.setState({
        camps: res.data
      });
    });
  };

  componentDidMount() {
    this.refreshSchedule();
  }

  render() {
    return (
      <div>
        <h1>Camp Schedule</h1>
        <h2>Adventure Camps (Ages 8 - 15)</h2>
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
            {this.state.camps
              .filter(camp => camp.type === "adventure")
              .map((camp, i) => (
                <tr key={i}>
                  <td>{camp.name}</td>
                  <td>{camp.startDate.slice(0, 10)}</td>
                  <td>{camp.endDate.slice(0, 10)}</td>
                  <td>${camp.fee}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <h2>Junior Camps (Ages 5 - 8)</h2>
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
            {this.state.camps
              .filter(camp => camp.type === "junior")
              .map((camp, i) => (
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

export default Schedule;
