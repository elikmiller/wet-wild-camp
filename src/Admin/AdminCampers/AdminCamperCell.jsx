import React, { Component } from "react";
import moment from "moment";
import { Link } from "react-router-dom";

class AdminCamperCell extends Component {
  calculateAge(date) {
    return moment().diff(moment(date), "years", false);
  }

  render() {
    let { data } = this.props;
    return (
      <tr>
        <td>{data.firstName}</td>
        <td>{data.lastName}</td>
        <td>{this.calculateAge(data.dateOfBirth)}</td>
        <td>
          <Link to={`/admin/campers/${data._id}`}>More</Link>
        </td>
      </tr>
    );
  }
}

export default AdminCamperCell;
