import React, { Component } from "react";
import EditablePrimaryContactInformation from "./PrimaryContactInformation/EditablePrimaryContactInformation.jsx";
import EditableSecondaryContactInformation from "./SecondaryContactInformation/EditableSecondaryContactInformation.jsx";
import EditableEmergencyContactInformation from "./EmergencyContactInformation/EditableEmergencyContactInformation.jsx";
import appClient from "../appClient";
import Spinner from "../Spinner/Spinner";
import "./ContactInformationContainer.css";

class ContactInformationContainer extends Component {
  state = {
    isLoading: false,
    user: {},
    primaryContact: {},
    secondaryContact: {},
    emergencyContact: {}
  };

  componentDidMount() {
    this.getUser();
  }

  getUser = () => {
    this.setState({
      isLoading: true
    });
    appClient.getUser().then(user => {
      this.setState({
        user,
        primaryContact: user.primaryContact,
        secondaryContact: user.secondaryContact,
        emergencyContact: user.emergencyContact,
        isLoading: false
      });
    });
  };

  updateUser = ({ primaryContact, secondaryContact, emergencyContact }) => {
    return appClient
      .updateUser({ primaryContact, secondaryContact, emergencyContact })
      .then(() => {
        this.getUser();
      });
  };

  render() {
    return (
      <div className="contact-information-container spinner-container">
        {this.state.isLoading && <Spinner />}
        {!this.props.admin && (
          <div className="alert alert-dark" role="alert">
            <p>
              The <strong>Contact Information</strong> page is where you can
              enter in contact information for your Primary, Secondary, and
              Emergency contacts.
            </p>
            <hr />
            <p className="mb-0">
              Please submit this information as soon as possible, and return to
              this page to update it when information changes.
            </p>
          </div>
        )}
        <EditablePrimaryContactInformation
          firstName={this.state.primaryContact.firstName}
          lastName={this.state.primaryContact.lastName}
          email={this.state.primaryContact.email}
          phoneNumber={this.state.primaryContact.phoneNumber}
          streetAddress={this.state.primaryContact.streetAddress}
          streetAddress2={this.state.primaryContact.streetAddress2}
          city={this.state.primaryContact.city}
          state={this.state.primaryContact.state}
          zipCode={this.state.primaryContact.zipCode}
          updateUser={this.updateUser}
        />
        <hr />
        <EditableSecondaryContactInformation
          firstName={this.state.secondaryContact.firstName}
          lastName={this.state.secondaryContact.lastName}
          email={this.state.secondaryContact.email}
          phoneNumber={this.state.secondaryContact.phoneNumber}
          updateUser={this.updateUser}
        />
        <hr />
        <EditableEmergencyContactInformation
          firstName={this.state.emergencyContact.firstName}
          lastName={this.state.emergencyContact.lastName}
          phoneNumber={this.state.emergencyContact.phoneNumber}
          updateUser={this.updateUser}
        />
      </div>
    );
  }
}

export default ContactInformationContainer;
