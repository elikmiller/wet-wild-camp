import React, { Component } from "react";
import moment from "moment";
import _ from "lodash";

class AdminCamp extends Component {
  render() {
    return (
      <div className="admin-camp">
        <div className="table-responsive">
          <table className="table table-sm">
            <tbody>
              <tr>
                <th>Name</th>
                <td>{this.props.camp.name}</td>
              </tr>
              <tr>
                <th>Type</th>
                <td>{_.capitalize(this.props.camp.type)}</td>
              </tr>
              <tr>
                <th>Description</th>
                <td>{this.props.camp.description}</td>
              </tr>
              <tr>
                <th>Fee</th>
                <td>
                  ${this.props.camp.fee && this.props.camp.fee.toFixed(2)}
                </td>
              </tr>
              <tr>
                <th>Capacity</th>
                <td>{this.props.camp.capacity}</td>
              </tr>
              <tr>
                <th>Registration Open</th>
                <td>
                  {moment.utc(this.props.camp.openDate).format("MM/DD/YYYY")}
                </td>
              </tr>
              <tr>
                <th>Registration Close</th>
                <td>
                  {moment.utc(this.props.camp.closeDate).format("MM/DD/YYYY")}
                </td>
              </tr>
              <tr>
                <th>Camp Start</th>
                <td>
                  {moment.utc(this.props.camp.startDate).format("MM/DD/YYYY")}
                </td>
              </tr>
              <tr>
                <th>Camp End</th>
                <td>
                  {moment.utc(this.props.camp.endDate).format("MM/DD/YYYY")}
                </td>
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

export default AdminCamp;
