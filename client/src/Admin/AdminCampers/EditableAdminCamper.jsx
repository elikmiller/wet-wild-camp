import React, { Component } from "react";
import AdminCamper from "./AdminCamper.jsx";
import AdminCamperForm from "./AdminCamperForm.jsx";

class EditableAdminCamper extends Component {
  handleSubmit = ({
    firstName,
    lastName,
    gender,
    dateOfBirth,
    swimmingStrength,
    notes
  }) => {
    return this.props
      .updateCamper({
        firstName,
        lastName,
        gender,
        dateOfBirth,
        swimmingStrength,
        notes
      })
      .then(() => {
        this.closeForm();
      });
  };

  openForm = () => {
    this.props.openForm();
  };

  closeForm = () => {
    this.props.closeForm();
  };

  render() {
    return (
      <div className="editable-admin-camper">
        {this.props.isOpen && (
          <AdminCamperForm
            firstName={this.props.firstName}
            lastName={this.props.lastName}
            gender={this.props.gender}
            dateOfBirth={this.props.dateOfBirth}
            swimmingStrength={this.props.swimmingStrength}
            notes={this.props.notes}
            onSubmit={this.handleSubmit}
            closeForm={this.closeForm}
          />
        )}
        {!this.props.isOpen && (
          <AdminCamper
            firstName={this.props.firstName}
            lastName={this.props.lastName}
            gender={this.props.gender}
            dateOfBirth={this.props.dateOfBirth}
            age={this.props.age}
            swimmingStrength={this.props.swimmingStrength}
            notes={this.props.notes}
          />
        )}
      </div>
    );
  }
}

export default EditableAdminCamper;
