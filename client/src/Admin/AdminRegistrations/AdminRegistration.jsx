import React from "react";
import moment from "moment";
import _ from "lodash";
import BooleanIndicator from "../../BooleanIndicator/BooleanIndicator";

const AdminRegistration = props => {
  let morningDropoff = _.capitalize(props.morningDropoff);
  let afternoonPickup = _.capitalize(props.afternoonPickup);
  let deposit = <BooleanIndicator value={props.deposit} />;
  let paid = <BooleanIndicator value={props.paid} />;
  let waitlist = <BooleanIndicator value={props.waitlist} />;
  let created = moment.utc(props.created).format("MM/DD/YY hh:mma");
  return (
    <div className="admin-registration">
      <div>Morning Dropoff: {morningDropoff}</div>
      <div>Afternoon Pickup: {afternoonPickup}</div>
      <div>Deposit Paid: {deposit}</div>
      <div>Full Amount Paid: {paid}</div>
      <div>Waitlist: {waitlist}</div>
      <div>Created: {created}</div>
    </div>
  );
};

export default AdminRegistration;
