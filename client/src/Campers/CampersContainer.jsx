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
      isLoading: true,
      errors: {}
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
    if (this.state.isLoading && this.props.admin) {
      return (
        <div className="card spinner-wrapper">
          <Spinner />
        </div>
      );
    }
    if (this.state.isLoading) return <Spinner />;
    if (this.state.errors.server) return <ServerError />;
    return (
      <div className="campers-container">
        {!this.props.admin && (
          <div className="alert alert-dark" role="alert">
            <p>
              The <strong>Campers</strong> page is where you can enter in
              information for any campers you wish to register for a session
              with us.
            </p>
            <hr />
            <p className="mb-0">
              Click <strong>Add Camper</strong> to create a new camper, or{" "}
              <strong>Edit Camper</strong> to edit the information for an
              existing camper. Any information we should know about your child,
              such as allergies, special needs, etc. can go under{" "}
              <strong>notes</strong>.
            </p>
          </div>
        )}
        <div className="row position-relative">
          <EditableCampersList
            campers={this.state.campers}
            editCamper={this.editCamper}
          />
          <div className="col-12 col-xl-4">
            <ToggleableCamperForm
              addCamper={this.addCamper}
              userId={this.props.userId}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default CampersContainer;
