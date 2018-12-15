import React from "react";

const CampRegisterResult = props => {
  const { status } = props.match.params;
  return (
    <div className="card">
      <div className="card-body">
        {status === "success" && (
          <div className="alert alert-primary" role="alert">
            Your registration has been successfully completed!
            <hr />
            <p className="mb-0">
              Please go to the "Payments" tab to pay your deposit and reserve
              your space in the camp.
            </p>
          </div>
        )}
        {status === "cancelled" && (
          <div className="alert alert-info" role="alert">
            Your registration has been cancelled.
          </div>
        )}
      </div>
    </div>
  );
};

export default CampRegisterResult;
