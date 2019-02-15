import React, { Component } from "react";
import AdminUserPrimaryContactForm from "./AdminUserPrimaryContactForm";
import AdminUserPrimaryContact from "./AdminUserPrimaryContact";

class EditableAdminUserPrimaryContact extends Component {
  state = {
    isOpen: false,
    errors: {}
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
    if (this.state.isOpen) {
      return (
        <div className="editable-admin-camp">
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
            errors={this.state.errors}
          />
        </div>
      );
    }
    return (
      <div className="editable-admin-camp">
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
          openForm={this.openForm}
        />
      </div>
    );
  }
}

export default EditableAdminUserPrimaryContact;
