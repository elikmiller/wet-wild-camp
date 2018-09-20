import React, { Component } from "react";
import appClient from "../appClient";

import CamperCard from "./CamperCard.jsx";
import CamperCardForm from "./CamperCardForm.jsx";

class EditableCamper extends Component {
  state = {
    formOpen: false
  };

  toggleForm = () => {
    this.setState({ formOpen: !this.state.formOpen });
  };

  submit = data => {
    if (this.props.data) {
      let id = this.props.data._id;
      appClient.updateCamper({ id, data }).then(res => {
        this.toggleForm();
        this.props.refreshCampers();
      });
    } else {
      appClient.addCamper(data).then(res => {
        this.toggleForm();
        this.props.refreshCampers();
      });
    }
  };

  handleClose = () => {
    this.props.handleClose();
    this.toggleForm();
  };

  componentWillMount() {
    if (!this.props.data) this.toggleForm();
  }

  render() {
    if (this.state.formOpen || this.props.data === null) {
      return (
        <CamperCardForm
          data={this.props.data}
          onSubmit={this.submit}
          closeForm={this.handleClose}
        />
      );
    } else {
      return <CamperCard data={this.props.data} openForm={this.toggleForm} />;
    }
  }
}

export default EditableCamper;
