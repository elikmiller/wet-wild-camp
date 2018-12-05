import React from "react";
import { AuthContext } from "../App";
import ContactInformation from "./ContactInformation";

const ContactInfoWrapper = () => {
  return (
    <div>
      <h1>Contact Information</h1>
      <AuthContext.Consumer>
        {auth => (
          <ContactInformation userId={auth.userId} logout={this.logout} />
        )}
      </AuthContext.Consumer>
    </div>
  );
};

export default ContactInfoWrapper;
