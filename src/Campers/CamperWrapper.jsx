import React from "react";
import { AuthContext } from "../App";
import Campers from "./Campers";

const CamperWrapper = () => {
  return (
    <div>
      <h1>Campers</h1>
      <AuthContext.Consumer>
        {auth => <Campers userId={auth.userId} />}
      </AuthContext.Consumer>
    </div>
  );
};

export default CamperWrapper;
