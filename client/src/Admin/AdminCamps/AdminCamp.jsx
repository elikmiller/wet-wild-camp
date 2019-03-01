import React from "react";
import moment from "moment";
import _ from "lodash";

const AdminCamp = props => {
  let name = props.name;
  let type = _.capitalize(props.type);
  let description = props.description || <em>No Description</em>;
  let fee = "$" + (props.fee && props.fee.toFixed(2));
  let openDate = moment.utc(props.openDate).format("MM/DD/YYYY");
  let closeDate = moment.utc(props.closeDate).format("MM/DD/YYYY");
  let startDate = moment.utc(props.startDate).format("MM/DD/YYYY");
  let endDate = moment.utc(props.endDate).format("MM/DD/YYYY");
  let capacity = props.capacity;
  return (
    <div className="admin-camp">
      <div>Name: {name}</div>
      <div>Type: {type}</div>
      <div>Description: {description}</div>
      <div>Fee: {fee}</div>
      <div>Open Date: {openDate}</div>
      <div>Close Date: {closeDate}</div>
      <div>Start Date: {startDate}</div>
      <div>End Date: {endDate}</div>
      <div>Capacity: {capacity}</div>
    </div>
  );
};

export default AdminCamp;
