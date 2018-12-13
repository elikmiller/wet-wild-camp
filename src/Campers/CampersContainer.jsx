import React, { Component } from "react";
import appClient from "../appClient";
import Spinner from "../Spinner/Spinner";
import ServerError from "../forms/ServerError";
import EditableCampersList from "./EditableCampersList";
import ToggleableCamperForm from "./ToggleableCamperForm";

class CampersContainer extends Component {
  state = {
    isLoading: false,
    campers: [],
    errors: {}
  };

  componentDidMount() {
    this.refreshCampers();
  }

  refreshCampers = () => {
    this.setState({
      isLoading: true
    });
    appClient
      .getCampers(this.props.userId)
      .then(campers => {
        this.setState({
          isLoading: false,
          campers: campers.data
        });
      })
      .catch(err => {
        this.setState({
          isLoading: false
        });
        if (err.response.status === 401) {
          this.props.logout();
        } else if (err.response.status === 500) {
          this.setState({ errors: { server: "Server error." } });
        }
      });
  };

  handleServerError = err => {
    if (err.response && err.response.status === 500) {
      this.setState({ errors: { server: "Server error." } });
    } else {
      this.setState({
        errors: {
          server: "An unexpected error has occurred. Please try again later."
        }
      });
    }
  };

  addCamper = camper => {
    appClient
      .addCamper(camper)
      .then(() => {
        this.refreshCampers();
      })
      .catch(err => {
        this.handleServerError(err);
      });
  };

  editCamper = (id, camper) => {
    appClient
      .updateCamper({ id, data: camper })
      .then(() => {
        this.refreshCampers();
      })
      .catch(err => {
        console.error(err);
        this.handleServerError(err);
      });
  };

  render() {
    if (this.state.isLoading) return <Spinner />;
    if (this.state.errors.server) return <ServerError />;
    return (
      <div className="campers-container">
        <div className="row position-relative">
          <EditableCampersList
            campers={this.state.campers}
            editCamper={this.editCamper}
          />
          <div className="col-12 col-lg-3">
            <ToggleableCamperForm addCamper={this.addCamper} />
          </div>
        </div>
      </div>
    );
  }
}

export default CampersContainer;
