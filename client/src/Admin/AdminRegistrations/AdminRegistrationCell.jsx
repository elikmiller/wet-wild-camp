import React, { Component } from "react";
import moment from "moment";

class AdminRegistrationCell extends Component {
  formatDate = date => {
    return moment.utc(date).format("MM/DD/YYYY");
  };

  render() {
    let { data } = this.props;
    let date = this.formatDate(data.camp.startDate);
    return (
      <tr>
        <td>
          {data.user.firstName} {data.user.lastName}
        </td>
        <td>
          {data.camp.name} {data.camp.type}
        </td>
        <td>
          {data.camper.firstName} {data.camper.lastName}
        </td>
        <td>{date}</td>
        <td>
          {data.paid && (
            <span className="badge badge-success">Paid in Full</span>
          )}
          {data.deposit && (
            <span className="badge badge-warning">Deposit Paid</span>
          )}
          {!data.paid && !data.deposit && (
            <span className="badge badge-danger">Unpaid</span>
          )}
        </td>
      </tr>
    );
  }
}

export default AdminRegistrationCell;
