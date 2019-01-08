import React from "react";
import { AuthContext } from "../App/App";

const Logout = () => {
  return (
    <AuthContext.Consumer>
      {auth => {
        auth.logout();
        return null;
      }}
    </AuthContext.Consumer>
  );
};

export default Logout;
