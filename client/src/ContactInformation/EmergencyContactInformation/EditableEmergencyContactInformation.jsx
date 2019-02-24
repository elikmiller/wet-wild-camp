import React, { Component } from "react";
import EmergencyContactInformation from "./EmergencyContactInformation.jsx";
import EmergencyContactInformationForm from "./EmergencyContactInformationForm.jsx";

class EditableEmergencyContactInformation extends Component {
  state = {
    isOpen: false,
    errors: {}
  };

  handleSubmit = ({ firstName, lastName, phoneNumber }) => {
    this.props
      .updateUser({
        emergencyContact: { firstName, lastName, phoneNumber }
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
        <div className="editable-emergency-contact-information">
          <EmergencyContactInformationForm
            firstName={this.props.firstName}
            lastName={this.props.lastName}
            phoneNumber={this.props.phoneNumber}
            onSubmit={this.handleSubmit}
            closeForm={this.closeForm}
          />
        </div>
      );
    }
    return (
      <div className="editable-emergency-contact-information">
        <EmergencyContactInformation
          firstName={this.props.firstName}
          lastName={this.props.lastName}
          phoneNumber={this.props.phoneNumber}
          openForm={this.openForm}
        />
      </div>
    );
  }
}

export default EditableEmergencyContactInformation;
