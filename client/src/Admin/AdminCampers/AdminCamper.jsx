import React from "react";
import _ from "lodash";
import moment from "moment";

const AdminCamper = props => {
  return (
    <div className="admin-camper">
      {props.firstName} {props.lastName}
      <br />
      {_.capitalize(props.gender)}
      <br />
      {moment.utc(props.dateOfBirth).format("MM/DD/YYYY")} ({props.age} years
      old)
      <br />
      {props.notes ? props.notes : <em>No Notes</em>}
    </div>
  );
};

export default AdminCamper;
