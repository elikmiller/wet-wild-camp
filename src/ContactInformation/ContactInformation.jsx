import React, { Component } from "react";
import PrimaryContactInformationForm from "./PrimaryContactInformationForm.jsx";
import SecondaryContactInformationForm from "./SecondaryContactInformationForm.jsx";
import EmergencyContactInformationForm from "./EmergencyContactInformationForm.jsx";

class ContactInformation extends Component {
  render() {
    return (
      <div>
        <h1>Contact Information</h1>
        <div className="row">
          <div className="col">
            <h2>Primary Contact</h2>
            <PrimaryContactInformationForm />
          </div>
          <div className="col">
            <h2>Secondary Contact</h2>
            <SecondaryContactInformationForm />
          </div>
          <div className="col">
            <h2>Emergency Contact</h2>
            <EmergencyContactInformationForm />
          </div>
        </div>
      </div>
    );
  }
}

export default ContactInformation;
