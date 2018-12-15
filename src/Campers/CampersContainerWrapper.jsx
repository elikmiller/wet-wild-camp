import React from "react";
import { AuthContext } from "../App";
import CampersContainer from "./CampersContainer";

const CampersContainerWrapper = () => {
  return (
    <div className="wrapper campers-container-wrapper">
      <div className="alert alert-dark" role="alert">
        <p>
          The <strong>Campers</strong> page is where you can enter in
          information for any campers you wish to register for a session with
          us.
        </p>
        <hr />
        <p className="mb-0">
          Click <strong>Add Camper</strong> to create a new camper, or{" "}
          <strong>Edit Camper</strong> to edit the information for an existing
          camper. Any information we should know about your child, such as
          allergies, special needs, etc. can go under <strong>notes</strong>.
        </p>
      </div>
      <AuthContext.Consumer>
        {auth => <CampersContainer userId={auth.userId} />}
      </AuthContext.Consumer>
    </div>
  );
};

export default CampersContainerWrapper;
