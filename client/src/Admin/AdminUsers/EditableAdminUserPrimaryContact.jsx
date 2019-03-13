import React, { Component } from "react";
import AdminUserPrimaryContactForm from "./AdminUserPrimaryContactForm";
import AdminUserPrimaryContact from "./AdminUserPrimaryContact";

class EditableAdminUserPrimaryContact extends Component {
  state = {
    isOpen: false
  };

  handleSubmit = primaryContact => {
    this.props.updateUser({ primaryContact }).then(() => {
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
      <div className="editable-admin-user-primary-contact">
        {this.state.isOpen && (
          <AdminUserPrimaryContactForm
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
        )}
        {!this.state.isOpen && (
          <div>
            <AdminUserPrimaryContact
              firstName={this.props.firstName}
              lastName={this.props.lastName}
              email={this.props.email}
              phoneNumber={this.props.phoneNumber}
              streetAddress={this.props.streetAddress}
              streetAddress2={this.props.streetAddress2}
              city={this.props.city}
              state={this.props.state}
              zipCode={this.props.zipCode}
            />
            <div className="mt-3">
              <button className="btn btn-primary" onClick={this.openForm}>
                Edit Primary Contact
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default EditableAdminUserPrimaryContact;
