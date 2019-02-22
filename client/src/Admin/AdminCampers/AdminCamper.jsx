import React from "react";
import _ from "lodash";
import moment from "moment";

const AdminCamper = props => {
  let fullName = `${props.firstName} ${props.lastName}`;
  let gender = _.capitalize(props.gender);
  let dateOfBirth = moment.utc(props.dateOfBirth).format("MM/DD/YYYY");
  let age = props.age;
  let swimmingStrength = _.capitalize(props.swimmingStrength) || (
    <em>No Swimming Strength</em>
  );
  let notes = props.notes || <em>No Notes</em>;

  console.log(swimmingStrength);
  return (
    <div className="admin-camper">
      <div>Full Name: {fullName}</div>
      <div>Gender: {gender}</div>
      <div>
        Date of Birth: {dateOfBirth} ({age} years old)
      </div>
      <div>Swimming Strength: {swimmingStrength}</div>
      <div>Notes: {notes}</div>
    </div>
  );
};

export default AdminCamper;
