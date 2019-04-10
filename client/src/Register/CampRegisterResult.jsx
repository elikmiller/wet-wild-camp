import React from "react";
import { Link } from "react-router-dom";

const CampRegisterResult = props => {
  if (props.status === "success")
    return (
      <div className="alert alert-primary">
        <h4>Your registration has been successfully completed!</h4>
        <hr />
        <p>
          To see an overview of all weeks registered, click{" "}
          <Link to="/overview" className="alert-link">
            Overview
          </Link>
          .
        </p>
        <p>
          To register an additional child or additional week, click{" "}
          <Link to="/register" className="alert-link">
            Register
          </Link>
          .
        </p>
        <p className="mb-0">
          To make a payment to hold your spot, click{" "}
          <Link to="/payments" className="alert-link">
            Payments
          </Link>
          .
        </p>
      </div>
    );
  if (props.status === "waitlist")
    return (
      <div className="alert alert-warning">
        <h4>
          Your child has been successfully added to this session's waitlist.
        </h4>
        <hr />
        <p>You will be contacted once a spot becomes available.</p>
        <p>
          To see an overview of all weeks registered, click{" "}
          <Link to="/overview" className="alert-link">
            Overview
          </Link>
          .
        </p>
        <p className="mb-0">
          To register an additional child or additional week, click{" "}
          <Link to="/register" className="alert-link">
            Register
          </Link>
          .
        </p>
      </div>
    );
  if (props.status === "cancelled")
    return (
      <div className="alert alert-info">
        Your registration has been cancelled.
      </div>
    );
  return null;
};

export default CampRegisterResult;
