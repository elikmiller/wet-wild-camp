import React, { Component } from "react";
import PrimaryContactInformation from "./PrimaryContactInformation.jsx";
import PrimaryContactInformationForm from "./PrimaryContactInformationForm.jsx";

class EditablePrimaryContactInformation extends Component {
  state = {
    isOpen: false,
    errors: {}
  };

  handleSubmit = data => {
    this.props.updateUser({ primaryContact: { ...data } });
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
            data={this.props.data}
            onSubmit={this.handleSubmit}
            closeForm={this.closeForm}
          />
        </div>
      );
    }
    return (
      <div className="editable-primary-contact-information">
        <PrimaryContactInformation
          data={this.props.data}
          openForm={this.openForm}
        />
      </div>
    );
  }
}

export default EditablePrimaryContactInformation;
