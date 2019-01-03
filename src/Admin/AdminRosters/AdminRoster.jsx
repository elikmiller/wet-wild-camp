import React, { Component } from "react";
import moment from "moment";
import _ from "lodash";

class AdminRoster extends Component {
  formatDate(date) {
    return moment.utc(date).format("MM/DD/YYYY");
  }

  render() {
    let camp = this.props.data;
    return (
      <div className="admin-camp">
        <div className="table-responsive">
          <table className="table table-sm">
            <tbody>
              <tr>
                <th>Name</th>
                <td>{camp.name}</td>
              </tr>
              <tr>
                <th>Type</th>
                <td>{_.capitalize(camp.type)}</td>
              </tr>
              <tr>
                <th>Description</th>
                <td>{camp.description}</td>
              </tr>
              <tr>
                <th>Fee</th>
                <td>${camp.fee && camp.fee.toFixed(2)}</td>
              </tr>
              <tr>
                <th>Capacity</th>
                <td>{camp.capacity}</td>
              </tr>
              <tr>
                <th>Registration Open</th>
                <td>{this.formatDate(camp.openDate)}</td>
              </tr>
              <tr>
                <th>Registration Close</th>
                <td>{this.formatDate(camp.closeDate)}</td>
              </tr>
              <tr>
                <th>Camp Start</th>
                <td>{this.formatDate(camp.startDate)}</td>
              </tr>
              <tr>
                <th>Camp End</th>
                <td>{this.formatDate(camp.endDate)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <button className="btn btn-primary" onClick={this.props.openForm}>
          <i className="fas fa-edit" /> Edit Camp
        </button>
      </div>
    );
  }
}

export default AdminRoster;
