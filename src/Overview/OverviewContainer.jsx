import React, { Component } from "react";
import appClient from "../appClient";
import RegistrationTable from "./RegistrationTable";
import Spinner from "../Spinner/Spinner";
import ServerError from "../forms/ServerError";
import FirstTimeWizard from "../FirstTimeWizard/FirstTimeWizard";

class OverviewContainer extends Component {
  state = {
    registrations: [],
    errors: {},
    isLoading: false
  };

  componentDidMount() {
    this.getRegistrations();
  }

  getRegistrations = () => {
    this.setState({
      isLoading: true,
      errors: {}
    });
    appClient
      .getUserRegistrations(this.props.userId)
      .then(registrations => {
        this.setState({ registrations: registrations.data, isLoading: false });
      })
      .catch(err => {
        this.setState({
          isLoading: false
        });
        this.handleServerError(err);
      });
  };

  handleServerError = err => {
    if (err.response.status === 500) {
      this.setState({ errors: { server: "Server error." } });
    }
  };

  render() {
    let content;
    if (this.state.registrations.length) {
      content = (
        <RegistrationTable
          data={this.state.registrations}
          error={this.handleServerError}
          update={this.getRegistrations}
        />
      );
    } else {
      content = (
        <div>
          <FirstTimeWizard />
          <br />
          <h4>It looks like you don't have any registrations yet!</h4>
          <br />
          <br />
          <h5>Steps to register</h5>
          <br />
          <p>Use the sidebar to:</p>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Share your Contact Information</li>
            <li className="list-group-item">Tell us about your Campers</li>
            <li className="list-group-item">Register for our Camps</li>
          </ul>
        </div>
      );
    }
    if (this.state.isLoading) return <Spinner />;
    return (
      <div>
        <div className="alert alert-dark" role="alert">
          <p>
            The <strong>Overview</strong> page allows you to view all your
            active registrations.
          </p>
          <hr />
          <p className="mb-0">
            If you have not yet paid for a registration, you can cancel it here.
            To cancel a paid registration, please contact us directly.
          </p>
        </div>
        {this.state.errors.server && <ServerError />}
        {content}
      </div>
    );
  }
}

export default OverviewContainer;
