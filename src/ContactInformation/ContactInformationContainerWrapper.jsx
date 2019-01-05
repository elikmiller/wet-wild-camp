import React from "react";
import { AuthContext } from "../App";
import ContactInformationContainer from "./ContactInformationContainer";

const ContactInformationContainerWrapper = props => {
  return (
    <div className="wrapper contact-information-container-wrapper">
      <AuthContext.Consumer>
        {auth => (
          <ContactInformationContainer
            userId={props.userId || auth.userId}
            logout={auth.logout}
            admin={auth.admin}
          />
        )}
      </AuthContext.Consumer>
    </div>
  );
};

export default ContactInformationContainerWrapper;
