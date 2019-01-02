import React, { Component } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";

class AdminCampCell extends Component {
  render() {
    let { data } = this.props;
    return (
      <tr>
        <td>{data.name}</td>
        <td>{_.capitalize(data.type)}</td>
        <td>
          {data.campers.length} / {data.capacity}
        </td>
        <td>{data.waitlist.length}</td>
        <td>
          <Link to={`/admin/camps/${data._id}`}>Details</Link>
        </td>
      </tr>
    );
  }
}

export default AdminCampCell;
