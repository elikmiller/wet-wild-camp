import React, { Component } from "react";
import AdminCamper from "./AdminCamper.jsx";
import AdminCamperForm from "./AdminCamperForm.jsx";

class EditableAdminCamper extends Component {
  handleSubmit = ({ firstName, lastName, gender, dateOfBirth, notes }) => {
    return this.props
      .updateCamper({
        firstName,
        lastName,
        gender,
        dateOfBirth,
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
      <div className="editable-camper">
        {this.props.isOpen && (
          <AdminCamperForm
            firstName={this.props.firstName}
            lastName={this.props.lastName}
            gender={this.props.gender}
            dateOfBirth={this.props.dateOfBirth}
            age={this.props.age}
            notes={this.props.notes}
            onSubmit={this.handleSubmit}
            closeForm={this.closeForm}
          />
        )}
        {!this.props.isOpen && (
          <div>
            <AdminCamper
              firstName={this.props.firstName}
              lastName={this.props.lastName}
              gender={this.props.gender}
              dateOfBirth={this.props.dateOfBirth}
              age={this.props.age}
              notes={this.props.notes}
            />
          </div>
        )}
      </div>
    );
  }
}

export default EditableAdminCamper;
