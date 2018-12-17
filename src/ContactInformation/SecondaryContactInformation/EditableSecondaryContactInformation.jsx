import React, { Component } from "react";
import SecondaryContactInformation from "./SecondaryContactInformation.jsx";
import SecondaryContactInformationForm from "./SecondaryContactInformationForm.jsx";

class EditableSecondaryContactInformation extends Component {
  state = {
    isOpen: false,
    errors: {}
  };

  handleSubmit = data => {
    this.props.updateUser({ secondaryContact: { ...data } });
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
            data={this.props.data}
            onSubmit={this.handleSubmit}
            closeForm={this.closeForm}
          />
        </div>
      );
    }
    return (
      <div className="editable-secondary-contact-information">
        <SecondaryContactInformation
          data={this.props.data}
          openForm={this.openForm}
        />
      </div>
    );
  }
}

export default EditableSecondaryContactInformation;
