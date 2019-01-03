import React, { Component } from "react";
import moment from "moment";
import { Link } from "react-router-dom";

class AdminSessionCell extends Component {
  formatDate = date => {
    return moment.utc(date).format("MM/DD/YYYY");
  };

  render() {
    let { data } = this.props;
    let date = this.formatDate(data.startDate);
    console.log(data.capacity);
    return (
      <tr>
        <td>{data.name}</td>
        <td>{data.type}</td>
        <td>{date}</td>
        <td>{`${data.capacity}/${data.campers.length}/${
          data.waitlist.length
        }`}</td>
        <td>
          <Link to={`/admin/sessions/${data._id}`}>More</Link>
        </td>
      </tr>
    );
  }
}

export default AdminSessionCell;
