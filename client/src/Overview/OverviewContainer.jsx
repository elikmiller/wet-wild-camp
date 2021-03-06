import React, { Component } from "react";
import { Link } from "react-router-dom";
import appClient from "../appClient";
import RegistrationTable from "./RegistrationTable";
import Spinner from "../Spinner/Spinner";
import FirstTimeWizard from "../FirstTimeWizard/FirstTimeWizard";

class OverviewContainer extends Component {
  state = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    user: {
      campers: [],
      registrations: [],
      payments: []
    },
    registrations: [],
    warning: false
  };

  componentDidMount() {
    this.getUser();
    this.getRegistrations();
  }

  getUser = () => {
    this.setState({
      isLoading: true,
      isError: false,
      isSuccess: false,
      user: {}
    });
    appClient
      .getUser()
      .then(user => {
        this.setState({
          isLoading: false,
          isError: false,
          isSuccess: true,
          user
        });
      })
      .catch(err => {
        this.setState({
          isLoading: false,
          isError: true,
          isSuccess: false,
          user: {}
        });
      });
  };

  deleteRegistration = e => {
    appClient.deleteRegistration(e.target.value).then(() => {
      this.getRegistrations();
    });
  };

  getRegistrations = () => {
    appClient.getRegistrations().then(registrations => {
      let warning = false;
      registrations.forEach(reg => {
        if (!reg.waitlist && !reg.paid) warning = true;
      });
      this.setState({
        registrations,
        warning
      });
    });
  };

  render() {
    if (this.state.isLoading) return <Spinner />;

    if (
      this.state.user.campers.length === 0 ||
      !this.state.user.primaryContact ||
      !this.state.user.secondaryContact ||
      !this.state.user.emergencyContact
    ) {
      return (
        <FirstTimeWizard
          user={this.props.user}
          campers={this.state.user.campers}
          primaryContact={this.state.user.primaryContact}
          secondaryContact={this.state.user.secondaryContact}
          emergencyContact={this.state.user.emergencyContact}
        />
      );
    }

    if (this.state.user.registrations.length === 0) {
      return (
        <div>
          <div className="alert alert-dark" role="alert">
            <p>
              The <strong>Overview</strong> page allows you to view all your
              active registrations.
            </p>
            <hr />
            <p className="mb-0">
              If you have not yet paid for a registration, you can cancel it
              here. To cancel a paid registration, please contact us directly.
            </p>
          </div>
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
        {this.state.warning && (
          <div className="alert alert-danger" role="alert">
            <p>You currently have unpaid registrations.</p>
            <hr />
            <p className="mb-0">
              Please visit the <Link to="/payments">Payments</Link> page to
              finish paying and reserve your spot in the camp!
            </p>
          </div>
        )}
        <RegistrationTable
          registrations={this.state.registrations}
          deleteRegistration={this.deleteRegistration}
        />
      </div>
    );
  }
}

export default OverviewContainer;
