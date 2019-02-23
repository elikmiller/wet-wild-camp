import React, { Component } from "react";
import AdminUserEmergencyContactForm from "./AdminUserEmergencyContactForm";
import AdminUserEmergencyContact from "./AdminUserEmergencyContact";

class EditableAdminUserEmergencyContact extends Component {
  state = {
    isOpen: false
  };

  handleSubmit = emergencyContact => {
    this.props.updateUser({ emergencyContact }).then(() => {
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
    return (
      <div className="editable-admin-user-emergency-contact">
        {this.state.isOpen && (
          <AdminUserEmergencyContactForm
            firstName={this.props.firstName}
            lastName={this.props.lastName}
            phoneNumber={this.props.phoneNumber}
            onSubmit={this.handleSubmit}
            closeForm={this.closeForm}
          />
        )}
        {!this.state.isOpen && (
          <div>
            <AdminUserEmergencyContact
              firstName={this.props.firstName}
              lastName={this.props.lastName}
              phoneNumber={this.props.phoneNumber}
            />
            <div className="mt-3">
              <button className="btn btn-primary" onClick={this.openForm}>
                Edit Emergency Contact
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default EditableAdminUserEmergencyContact;
