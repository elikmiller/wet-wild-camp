import React, { Component } from "react";
import CamperForm from "./CamperForm";

class ToggleableCamperForm extends Component {
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
        <div className="toggleable-camper-form">
          <div className="card mb-3">
            <div className="card-body">
              <CamperForm
                closeForm={this.closeForm}
                onSubmit={this.props.addCamper}
              />
            </div>
          </div>
        </div>
      );
    return (
      <div className="toggleable-camper-form">
        <div className="card mb-3">
          <div className="card-body">
            <button
              className="btn btn-primary btn-block"
              onClick={this.openForm}
            >
              <i className="fas fa-plus" /> Add Camper
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ToggleableCamperForm;
