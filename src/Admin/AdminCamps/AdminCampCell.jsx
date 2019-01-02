import React, { Component } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import _ from "lodash";

class AdminCampCell extends Component {
  formatDate = date => {
    return moment.utc(date).format("MM/DD/YYYY");
  };

  render() {
    let { data } = this.props;
    return (
      <tr>
        <td>{data.name}</td>
        <td>{_.capitalize(data.type)}</td>
        <td>{this.formatDate(data.startDate)}</td>
        <td>
          <Link to={`/admin/camps/${data._id}`}>More</Link>
        </td>
      </tr>
    );
  }
}

export default AdminCampCell;
