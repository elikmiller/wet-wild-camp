import React, { Component } from "react";
import PrimaryContactInformation from "./PrimaryContactInformation.jsx";
import PrimaryContactInformationForm from "./PrimaryContactInformationForm.jsx";

class EditablePrimaryContactInformation extends Component {
  state = {
    isOpen: false,
    errors: {}
  };

  handleSubmit = ({
    firstName,
    lastName,
    email,
    phoneNumber,
    streetAddress,
    streetAddress2,
    city,
    state,
    zipCode
  }) => {
    this.props
      .updateUser({
        primaryContact: {
          firstName,
          lastName,
          email,
          phoneNumber,
          streetAddress,
          streetAddress2,
          city,
          state,
          zipCode
        }
      })
      .then(() => {
        this.closeForm();
      });
  };

  openForm = () => {
    this.setState({
      isOpen: true
    });
  };

  closeForm = () => {
    this.setState({
      isOpen: false
    });
  };

  render() {
    if (this.state.isOpen) {
      return (
        <div className="editable-primary-contact-information">
          <PrimaryContactInformationForm
            firstName={this.props.firstName}
            lastName={this.props.lastName}
            email={this.props.email}
            phoneNumber={this.props.phoneNumber}
            streetAddress={this.props.streetAddress}
            streetAddress2={this.props.streetAddress2}
            city={this.props.city}
            state={this.props.state}
            zipCode={this.props.zipCode}
            onSubmit={this.handleSubmit}
            closeForm={this.closeForm}
          />
        </div>
      );
    }
    return (
      <div className="editable-primary-contact-information">
        <PrimaryContactInformation
          firstName={this.props.firstName}
          lastName={this.props.lastName}
          email={this.props.email}
          phoneNumber={this.props.phoneNumber}
          streetAddress={this.props.streetAddress}
          streetAddress2={this.props.streetAddress2}
          city={this.props.city}
          state={this.props.state}
          zipCode={this.props.zipCode}
          openForm={this.openForm}
        />
      </div>
    );
  }
}

export default EditablePrimaryContactInformation;
