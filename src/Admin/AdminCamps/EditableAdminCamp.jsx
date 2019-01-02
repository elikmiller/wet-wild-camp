import React, { Component } from "react";
import AdminCampForm from "./AdminCampForm";
import AdminCamp from "./AdminCamp";

class EditableAdminCamp extends Component {
  state = {
    isOpen: false,
    errors: {}
  };

  handleSubmit = camp => {
    this.props.editAdminCamp(this.props.camp._id, camp);
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
        <div className="editable-admin-session">
          <div className="card mb-3">
            <div className="card-body">
              <AdminCampForm
                data={this.props.camp}
                onSubmit={this.handleSubmit}
                closeForm={this.closeForm}
              />
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="editable-admin-session">
        <div className="card mb-3">
          <div className="card-body">
            <AdminCamp data={this.props.camp} openForm={this.openForm} />
          </div>
        </div>
      </div>
    );
  }
}

export default EditableAdminCamp;
