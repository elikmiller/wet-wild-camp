import React, { Component } from "react";
import Camper from "./Camper.jsx";
import CamperForm from "./CamperForm.jsx";

class EditableCamper extends Component {
  state = {
    isOpen: false,
    errors: {}
  };

  toggleForm = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  handleSubmit = camper => {
    this.props.editCamper(this.props.camper._id, camper);
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

  componentWillMount() {
    if (!this.props.camper) this.toggleForm();
  }

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
            <Camper data={this.props.camper} openForm={this.toggleForm} />
          </div>
        </div>
      </div>
    );
  }
}

export default EditableCamper;
