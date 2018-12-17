import React from "react";
import { AuthContext } from "../App";
import CampRegisterForm from "./CampRegisterForm";

const CampRegisterFormWrapper = props => {
  return (
    <div className="wrapper contact-information-container-wrapper">
      <h1>Register</h1>
      <AuthContext.Consumer>
        {auth => (
          <CampRegisterForm
            userId={auth.userId}
            campId={props.match.params.campId}
            logout={auth.logout}
            history={props.history}
          />
        )}
      </AuthContext.Consumer>
    </div>
  );
};

export default CampRegisterFormWrapper;
