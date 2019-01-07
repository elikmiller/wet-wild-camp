import React from "react";
import { Link } from "react-router-dom";

const CampRegisterResult = props => {
  const { status } = props.match.params;

  if (status === "success")
    return (
      <div className="alert alert-primary">
        <p>
          <strong>Your registration has been successfully completed!</strong>
        </p>
        <p>
          To see an overview of all weeks registered, click{" "}
          <Link to="/overview">Overview</Link>.
        </p>
        <p>
          To register an additional child or additional week, click{" "}
          <Link to="/schedule">Register</Link>.
        </p>
        <p>
          To make a payment to hold your spot, click{" "}
          <Link to="/payments">Payments</Link>.
        </p>
      </div>
    );
  if (status === "cancelled")
    return (
      <div className="alert alert-info">
        Your registration has been cancelled.
      </div>
    );
  return null;
};

export default CampRegisterResult;
