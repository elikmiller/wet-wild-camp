import React from "react";
import { AuthContext } from "../App";
import OverviewContainer from "./OverviewContainer";

const OverviewWrapper = () => {
  return (
    <div className="wrapper overview-container-wrapper">
      <AuthContext.Consumer>
        {auth => (
          <OverviewContainer userId={auth.userId} logout={auth.logout} />
        )}
      </AuthContext.Consumer>
    </div>
  );
};

export default OverviewWrapper;
