import React, { Component } from "react";

class AdminRegistrationCell extends Component {
  render() {
    let { data } = this.props;
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
        <td>{data.camp.startDate}</td>
      </tr>
    );
  }
}

export default AdminRegistrationCell;
