import React, { Component } from "react";
import moment from "moment";

class AdminPaymentCell extends Component {
  formatDate = date => {
    return moment.utc(date).format("MM/DD/YYYY");
  };
  render() {
    let { data } = this.props;
    let date = this.formatDate(data.timeCreated);
    return (
      <tr>
        <td>
          {data.user.firstName} {data.user.lastName}
        </td>
        <td>${data.amount}</td>
        <td>{date}</td>
      </tr>
    );
  }
}

export default AdminPaymentCell;
