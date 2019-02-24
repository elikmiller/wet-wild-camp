import React, { Component } from "react";
import Camper from "./Camper.jsx";
import CamperForm from "./CamperForm.jsx";

class EditableCamper extends Component {
  state = {
    isOpen: false,
    errors: {}
  };

  handleSubmit = ({ firstName, lastName, gender, dateOfBirth, notes }) => {
    this.props.editCamper(this.props.camper._id, {
      firstName,
      lastName,
      gender,
      dateOfBirth,
      notes
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
        <div className="editable-camper">
          <div className="card mb-3">
            <div className="card-body">
              <CamperForm
                data={this.props.camper}
                onSubmit={this.handleSubmit}
                closeForm={this.closeForm}
              />
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="editable-camper">
        <div className="card mb-3">
          <div className="card-body">
            <Camper data={this.props.camper} openForm={this.openForm} />
          </div>
        </div>
      </div>
    );
  }
}

export default EditableCamper;
