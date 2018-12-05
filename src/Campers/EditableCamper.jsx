import React, { Component } from "react";
import appClient from "../appClient";
import CamperCard from "./CamperCard.jsx";
import CamperCardForm from "./CamperCardForm.jsx";
import ServerError from "../forms/ServerError";

class EditableCamper extends Component {
  state = {
    formOpen: false,
    errors: {}
  };

  toggleForm = () => {
    this.setState({ formOpen: !this.state.formOpen });
  };

  submit = data => {
    if (this.props.data) {
      let id = this.props.data._id;
      appClient
        .updateCamper({ id, data })
        .then(res => {
          this.toggleForm();
          this.props.refreshCampers();
        })
        .catch(err => {
          this.handleServerError(err);
        });
    } else {
      appClient
        .addCamper(data)
        .then(res => {
          this.toggleForm();
          this.props.refreshCampers();
        })
        .catch(err => {
          this.handleServerError(err);
        });
    }
  };

  handleServerError = err => {
    if (err.response && err.response.status === 500) {
      this.setState({ errors: { server: "Server error." } });
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
        <div>
          {this.state.errors.server && <ServerError />}
          <CamperCardForm
            data={this.props.data}
            onSubmit={this.submit}
            closeForm={this.handleClose}
          />
        </div>
      );
    } else {
      return (
        <div>
          {this.state.errors.server && <ServerError />}
          <CamperCard data={this.props.data} openForm={this.toggleForm} />
        </div>
      );
    }
  }
}

export default EditableCamper;
