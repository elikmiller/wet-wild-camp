import React from "react";
import { AuthContext } from "../App";
import CampersContainer from "./CampersContainer";
import "./Campers.css";

const CampersContainerWrapper = props => {
  return (
    <div className="wrapper campers-container-wrapper">
      <AuthContext.Consumer>
        {auth => (
          <CampersContainer
            userId={props.userId || auth.userId}
            admin={auth.admin}
            logout={auth.logout}
          />
        )}
      </AuthContext.Consumer>
    </div>
  );
};

export default CampersContainerWrapper;
