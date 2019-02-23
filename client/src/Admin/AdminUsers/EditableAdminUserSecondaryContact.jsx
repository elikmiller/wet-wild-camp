import React, { Component } from "react";
import AdminUserSecondaryContactForm from "./AdminUserSecondaryContactForm";
import AdminUserSecondaryContact from "./AdminUserSecondaryContact";

class EditableAdminUserSecondaryContact extends Component {
  state = {
    isOpen: false
  };

  handleSubmit = secondaryContact => {
    this.props.updateUser({ secondaryContact }).then(() => {
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
      <div className="editable-admin-user-secondary-contact">
        {this.state.isOpen && (
          <AdminUserSecondaryContactForm
            firstName={this.props.firstName}
            lastName={this.props.lastName}
            email={this.props.email}
            phoneNumber={this.props.phoneNumber}
            onSubmit={this.handleSubmit}
            closeForm={this.closeForm}
          />
        )}
        {!this.state.isOpen && (
          <div>
            <AdminUserSecondaryContact
              firstName={this.props.firstName}
              lastName={this.props.lastName}
              email={this.props.email}
              phoneNumber={this.props.phoneNumber}
            />
            <div className="mt-3">
              <button className="btn btn-primary" onClick={this.openForm}>
                Edit Secondary Contact
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default EditableAdminUserSecondaryContact;
