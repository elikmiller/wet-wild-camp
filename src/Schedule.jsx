import React, { Component } from "react";

class Schedule extends Component {
  render() {
    let schedule = [
      {
        name: "Week 1",
        level: "Adventure",
        startDate: "08/01/2019",
        endDate: "08/05/2019",
        fee: "255.00"
      },
      {
        name: "Week 2",
        level: "Adventure",
        startDate: "08/08/2019",
        endDate: "08/12/2019",
        fee: "255.00"
      },
      {
        name: "Week 3",
        level: "Adventure",
        startDate: "08/15/2019",
        endDate: "08/19/2019",
        fee: "255.00"
      },
      {
        name: "Week 1",
        level: "Junior",
        startDate: "08/01/2019",
        endDate: "08/05/2019",
        fee: "215.00"
      },
      {
        name: "Week 2",
        level: "Junior",
        startDate: "08/08/2019",
        endDate: "08/12/2019",
        fee: "215.00"
      },
      {
        name: "Week 3",
        level: "Junior",
        startDate: "08/15/2019",
        endDate: "08/19/2019",
        fee: "215.00"
      }
    ];

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
            {schedule.filter(item => item.level === "Adventure").map(item => (
              <tr>
                <td>{item.name}</td>
                <td>{item.startDate}</td>
                <td>{item.endDate}</td>
                <td>{item.fee}</td>
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
            {schedule.filter(item => item.level === "Junior").map(item => (
              <tr>
                <td>{item.name}</td>
                <td>{item.startDate}</td>
                <td>{item.endDate}</td>
                <td>{item.fee}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Schedule;
