import React from "react";
import { Link } from "react-router-dom";

const AdminUserCell = ({ data }) => {
  return (
    <tr>
      <td>{data.firstName}</td>
      <td>{data.lastName}</td>
      <td>{data.email}</td>
      <td>
        <Link to={`/admin/users/${data._id}`}>More</Link>
      </td>
    </tr>
  );
};

export default AdminUserCell;
