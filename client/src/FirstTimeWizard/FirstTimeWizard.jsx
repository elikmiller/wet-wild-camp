import React, { Component } from "react";
import StepZilla from "react-stepzilla";
import PrimaryContactForm from "./PrimaryContactForm";
import SecondaryContactForm from "./SecondaryContactForm";
import EmergencyContactForm from "./EmergencyContactForm";
import CamperForm from "./CamperForm";
import FinalStep from "./FinalStep";

class FirstTimeWizard extends Component {
  render() {
    const steps = [
      {
        name: "Primary Contact Information",
        component: (
          <PrimaryContactForm
            firstName={this.props.user.firstName}
            lastName={this.props.user.lastName}
            email={this.props.user.email}
            phoneNumber={this.props.primaryContact.phoneNumber}
            streetAddress={this.props.primaryContact.streetAddress}
            streetAddress2={this.props.primaryContact.streetAddress2}
            city={this.props.primaryContact.city}
            state={this.props.primaryContact.state}
            zipCode={this.props.primaryContact.zipCode}
          />
        )
      },
      {
        name: "Secondary Contact Information",
        component: (
          <SecondaryContactForm
            userId={this.props.user._id}
            firstName={this.props.secondaryContact.firstName}
            lastName={this.props.secondaryContact.lastName}
            email={this.props.secondaryContact.email}
            phoneNumber={this.props.secondaryContact.phoneNumber}
          />
        )
      },
      {
        name: "Emergency Contact Information",
        component: (
          <EmergencyContactForm
            userId={this.props.user._id}
            firstName={this.props.emergencyContact.firstName}
            lastName={this.props.emergencyContact.lastName}
            phoneNumber={this.props.emergencyContact.phoneNumber}
          />
        )
      },
      {
        name: "Camper Information",
        component: <CamperForm />
      },
      {
        name: "Thank You",
        component: <FinalStep />
      }
    ];

    return (
      <div className="card">
        <div className="card-body">
          <StepZilla
            steps={steps}
            nextButtonCls={"btn btn-primary"}
            backButtonCls={"btn btn-outline-secondary mr-3"}
            showSteps={false}
            stepsNavigation={false}
            prevBtnOnLastStep={false}
          />
        </div>
      </div>
    );
  }
}
FirstTimeWizard.defaultProps = {
  user: {},
  campers: [],
  primaryContact: {},
  secondaryContact: {},
  emergencyContact: {}
};

export default FirstTimeWizard;
