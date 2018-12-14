import React from "react";
import { AuthContext } from "../App";
import CampersContainer from "./CampersContainer";

const CampersContainerWrapper = () => {
  return (
    <div className="wrapper campers-container-wrapper">
      <h1>Campers</h1>
      <AuthContext.Consumer>
        {auth => <CampersContainer userId={auth.userId} />}
      </AuthContext.Consumer>
    </div>
  );
};

export default CampersContainerWrapper;
