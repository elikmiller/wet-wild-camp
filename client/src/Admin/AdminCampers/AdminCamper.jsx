import React from "react";
import _ from "lodash";
import moment from "moment";

const AdminCamper = props => {
  return (
    <div className="admin-camper">
      {`Full Name: ${props.firstName} ${props.lastName}`}
      <br />
      {`Gender: ${_.capitalize(props.gender)}`}
      <br />
      {`Date of Birth: ${moment.utc(props.dateOfBirth).format("MM/DD/YYYY")} (${
        props.age
      } years
      old)`}
      <br />
      {props.swimmingStrength ? (
        `Swimming Strength:  ${_.capitalize(props.swimmingStrength)}`
      ) : (
        <em>No Swimming Strength</em>
      )}
      <br />
      {props.notes ? `Notes: ${props.notes}` : <em>No Notes</em>}
    </div>
  );
};

export default AdminCamper;
