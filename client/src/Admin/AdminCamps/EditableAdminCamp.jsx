import React, { Component } from "react";
import AdminCampForm from "./AdminCampForm";
import AdminCamp from "./AdminCamp";

class EditableAdminCamp extends Component {
  handleSubmit = ({
    name,
    type,
    description,
    fee,
    startDate,
    endDate,
    openDate,
    closeDate,
    capacity
  }) => {
    return this.props
      .updateCamp({
        name,
        type,
        description,
        fee,
        startDate,
        endDate,
        openDate,
        closeDate,
        capacity
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
      <div className="editable-admin-camp">
        {this.props.isOpen && (
          <AdminCampForm
            name={this.props.name}
            type={this.props.type}
            description={this.props.description}
            fee={this.props.fee}
            startDate={this.props.startDate}
            endDate={this.props.endDate}
            openDate={this.props.openDate}
            closeDate={this.props.closeDate}
            capacity={this.props.capacity}
            onSubmit={this.handleSubmit}
            closeForm={this.closeForm}
          />
        )}
        {!this.props.isOpen && (
          <AdminCamp
            name={this.props.name}
            type={this.props.type}
            description={this.props.description}
            fee={this.props.fee}
            startDate={this.props.startDate}
            endDate={this.props.endDate}
            openDate={this.props.openDate}
            closeDate={this.props.closeDate}
            capacity={this.props.capacity}
          />
        )}
      </div>
    );
  }
}

export default EditableAdminCamp;
