import React, { Component } from "react";
import AdminCampForm from "./AdminCampForm";

class ToggleableAdminCampForm extends Component {
  state = {
    isOpen: false
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
    if (this.state.isOpen)
      return (
        <div className="toggleable-admin-camp-form">
          <p>
            <strong>Add Camp</strong>
          </p>
          <AdminCampForm
            closeForm={this.closeForm}
            onSubmit={this.props.addCamp}
          />
        </div>
      );
    return (
      <div className="toggleable-admin-camp-form">
        <button className="btn btn-primary" onClick={this.openForm}>
          <i className="fas fa-plus" /> Add Camp
        </button>
      </div>
    );
  }
}

export default ToggleableAdminCampForm;
