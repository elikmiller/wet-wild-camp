import React from "react";
import { AuthContext } from "../App";
import OverviewContainer from "./OverviewContainer";

const OverviewWrapper = () => {
  return (
    <div className="wrapper overview-container-wrapper">
      <div className="alert alert-dark" role="alert">
        <p>
          The <strong>Overview</strong> page allows you to view all your active
          registrations.
        </p>
        <hr />
        <p className="mb-0">
          If you have not yet paid for a registration, you can cancel it here.
          To cancel a paid registration, please contact us directly.
        </p>
      </div>
      <AuthContext.Consumer>
        {auth => (
          <OverviewContainer userId={auth.userId} logout={auth.logout} />
        )}
      </AuthContext.Consumer>
    </div>
  );
};

export default OverviewWrapper;
