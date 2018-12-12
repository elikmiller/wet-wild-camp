import React, { Component } from "react";
import { AuthContext } from "../App";
import appClient from "../appClient";
import RegistrationTable from "./RegistrationTable";
import ServerError from "../forms/ServerError";

class Overview extends Component {
  state = {
    registrations: [],
    errors: {}
  };

  componentDidMount() {
    this.getRegistrations();
  }

  getRegistrations = () => {
    appClient
      .getUserRegistrations(this.props.userId)
      .then(registrations => {
        this.setState({ registrations: registrations.data });
      })
      .catch(err => {
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
          <br />
          <h4>It looks like you don't have any registrations yet!</h4>
          <br />
          <br />
          <h5>Steps to register</h5>
          <br />
          <p>Use the sidebar to:</p>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Fill out "Update Contact Info"</li>
            <li className="list-group-item">Fill out "Camper" info</li>
            <li className="list-group-item">Register</li>
          </ul>
        </div>
      );
    }
    return (
      <div>
        <h1>Overview</h1>
        {this.state.errors.server && <ServerError />}
        {content}
      </div>
    );
  }
}

export default props => (
  <AuthContext.Consumer>
    {auth => <Overview userId={auth.userId} logout={auth.logout} {...props} />}
  </AuthContext.Consumer>
);
