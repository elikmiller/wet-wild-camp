import React from "react";
import { AuthContext } from "../App/App";
import OverviewContainer from "./OverviewContainer";

const OverviewWrapper = () => {
  return (
    <div className="wrapper overview-container-wrapper">
      <AuthContext.Consumer>
        {auth => (
          <OverviewContainer
            userId={auth.userId}
            user={auth.user}
            logout={auth.logout}
          />
        )}
      </AuthContext.Consumer>
    </div>
  );
};

export default OverviewWrapper;
