import React, { Component } from "react";
import AdminCampForm from "./AdminCampForm";
import AdminCamp from "./AdminCamp";

class EditableAdminCamp extends Component {
  state = {
    isOpen: false,
    errors: {}
  };

  handleSubmit = camp => {
    this.props.updateCamp(this.props.camp._id, camp);
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
          <AdminCampForm
            data={this.props.camp}
            onSubmit={this.handleSubmit}
            closeForm={this.closeForm}
          />
        </div>
      );
    }
    return (
      <div className="editable-admin-camp">
        <AdminCamp data={this.props.camp} openForm={this.openForm} />
      </div>
    );
  }
}

export default EditableAdminCamp;
