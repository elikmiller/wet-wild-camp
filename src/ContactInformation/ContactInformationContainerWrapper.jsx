import React from "react";
import { AuthContext } from "../App";
import ContactInformationContainer from "./ContactInformationContainer";

const ContactInformationContainerWrapper = () => {
  return (
    <div className="wrapper contact-information-container-wrapper">
      <h1>Contact Information</h1>
      <AuthContext.Consumer>
        {auth => (
          <ContactInformationContainer
            userId={auth.userId}
            logout={auth.logout}
          />
        )}
      </AuthContext.Consumer>
    </div>
  );
};

export default ContactInformationContainerWrapper;
