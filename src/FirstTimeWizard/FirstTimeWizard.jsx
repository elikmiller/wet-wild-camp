import React, { Component } from "react";
import StepZilla from "react-stepzilla";
import PrimaryContactForm from "./PrimaryContactForm";
import SecondaryContactForm from "./SecondaryContactForm";
import EmergencyContactForm from "./EmergencyContactForm";
import CamperForm from "./CamperForm";
import SurveyQuestion from "./SurveyQuestion";
import FinalStep from "./FinalStep";

class FirstTimeWizard extends Component {
  render() {
    const steps = [
      {
        name: "Primary Contact Information",
        component: (
          <PrimaryContactForm
            userId={this.props.user._id}
            firstName={this.props.user.firstName}
            lastName={this.props.user.lastName}
            email={this.props.user.email}
            phoneNumber={this.props.primaryContactInformation.phoneNumber}
            streetAddress={this.props.primaryContactInformation.streetAddress}
            streetAddress2={this.props.primaryContactInformation.streetAddress2}
            city={this.props.primaryContactInformation.city}
            state={this.props.primaryContactInformation.state}
            zipCode={this.props.primaryContactInformation.zipCode}
          />
        )
      },
      {
        name: "Secondary Contact Information",
        component: (
          <SecondaryContactForm
            userId={this.props.user._id}
            firstName={this.props.secondaryContactInformation.firstName}
            lastName={this.props.secondaryContactInformation.lastName}
            email={this.props.secondaryContactInformation.email}
            phoneNumber={this.props.secondaryContactInformation.phoneNumber}
          />
        )
      },
      {
        name: "Emergency Contact Information",
        component: (
          <EmergencyContactForm
            userId={this.props.user._id}
            firstName={this.props.emergencyContactInformation.firstName}
            lastName={this.props.emergencyContactInformation.lastName}
            phoneNumber={this.props.emergencyContactInformation.phoneNumber}
          />
        )
      },
      {
        name: "Camper Information",
        component: <CamperForm />
      },
      {
        name: "Survey Question",
        component: <SurveyQuestion userId={this.props.user._id} />
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

export default FirstTimeWizard;
