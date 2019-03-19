import React from "react";
import _ from "lodash";
import moment from "moment";

const AdminPayment = props => {
  let amount = `$${(props.amount && props.amount.toFixed(2)) || "0.00"}`;
  let paypalId = props.paypalId;
  let created = moment(props.created).format("MM/DD/YYYY hh:mm:ss A");
  let paypal = props.paypal;
  let paymentId = _.get(
    paypal,
    "transactions[0].related_resources[0].sale.id",
    null
  );
  return (
    <div className="admin-payment">
      <div>Amount: {amount}</div>
      <div>PayPal ID: {paypalId}</div>
      <div>Created: {created}</div>
      {paymentId && (
        <a
          href={`https://paypal.com/activity/payment/${paymentId}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          View at PayPal.com
        </a>
      )}
    </div>
  );
};

export default AdminPayment;
