import React from "react";
import { AuthContext } from "../App";
import ContactInformationContainer from "./ContactInformationContainer";

const ContactInformationContainerWrapper = () => {
  return (
    <div className="wrapper contact-information-container-wrapper">
      <div className="alert alert-dark" role="alert">
        <p>
          The <strong>Contact Information</strong> page is where you can enter
          in contact information for your Primary, Secondary, and Emergency
          contacts.
        </p>
        <hr />
        <p className="mb-0">
          Please submit this information as soon as possible, and return to this
          page to update it when information changes.
        </p>
      </div>
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
