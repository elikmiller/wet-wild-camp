import React, { Component } from "react";
import SecondaryContactInformation from "./SecondaryContactInformation.jsx";
import SecondaryContactInformationForm from "./SecondaryContactInformationForm.jsx";

class EditableSecondaryContactInformation extends Component {
  state = {
    isOpen: false,
    errors: {}
  };

  handleSubmit = ({ firstName, lastName, email, phoneNumber }) => {
    this.props
      .updateUser({
        secondaryContact: {
          firstName,
          lastName,
          email,
          phoneNumber
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
        <div className="editable-secondary-contact-information">
          <SecondaryContactInformationForm
            firstName={this.props.firstName}
            lastName={this.props.lastName}
            email={this.props.email}
            phoneNumber={this.props.phoneNumber}
            onSubmit={this.handleSubmit}
            closeForm={this.closeForm}
          />
        </div>
      );
    }
    return (
      <div className="editable-secondary-contact-information">
        <SecondaryContactInformation
          firstName={this.props.firstName}
          lastName={this.props.lastName}
          email={this.props.email}
          phoneNumber={this.props.phoneNumber}
          openForm={this.openForm}
        />
      </div>
    );
  }
}

export default EditableSecondaryContactInformation;
