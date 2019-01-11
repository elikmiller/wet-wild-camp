import React, { Component } from "react";
import EmergencyContactInformation from "./EmergencyContactInformation.jsx";
import EmergencyContactInformationForm from "./EmergencyContactInformationForm.jsx";

class EditableEmergencyContactInformation extends Component {
  state = {
    isOpen: false,
    errors: {}
  };

  handleSubmit = data => {
    this.props.updateUser({ emergencyContact: { ...data } });
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
            data={this.props.data}
            onSubmit={this.handleSubmit}
            closeForm={this.closeForm}
          />
        </div>
      );
    }
    return (
      <div className="editable-emergency-contact-information">
        <EmergencyContactInformation
          data={this.props.data}
          openForm={this.openForm}
        />
      </div>
    );
  }
}

export default EditableEmergencyContactInformation;
