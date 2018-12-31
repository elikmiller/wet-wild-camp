import React, { Component } from "react";
import appClient from "../appClient";
import RegistrationTable from "./RegistrationTable";
import Spinner from "../Spinner/Spinner";
import FirstTimeWizard from "../FirstTimeWizard/FirstTimeWizard";
import _ from "lodash";

class OverviewContainer extends Component {
  state = {
    getRegistrations: {
      isLoading: false,
      isError: false,
      isSuccess: false,
      registrations: []
    },
    getContacts: {
      isLoading: false,
      isError: false,
      isSuccess: false,
      primaryContactInformation: {},
      secondaryContactInformation: {},
      emergencyContactInformation: {}
    },
    getCampers: {
      isLoading: false,
      isError: false,
      isSuccess: false,
      campers: []
    }
  };

  componentDidMount() {
    this.getRegistrations();
    this.getContacts();
    this.getCampers();
  }

  getRegistrations = () => {
    this.setState({
      getRegistrations: {
        isLoading: true,
        isError: false,
        isSuccess: false,
        registrations: []
      }
    });
    appClient
      .getUserRegistrations(this.props.userId)
      .then(registrations => {
        this.setState({
          getRegistrations: {
            isLoading: false,
            isError: false,
            isSuccess: true,
            registrations: registrations.data
          }
        });
      })
      .catch(err => {
        this.setState({
          getRegistrations: {
            isLoading: false,
            isError: true,
            isSuccess: false,
            registrations: []
          }
        });
      });
  };

  getContacts = () => {
    this.setState({
      getContacts: {
        isLoading: true,
        isError: false,
        isSuccess: false,
        primaryContactInformation: {},
        secondaryContactInformation: {},
        emergencyContactInformation: {}
      }
    });
    appClient
      .getContacts(this.props.userId)
      .then(contacts => {
        this.setState({
          getContacts: {
            isLoading: false,
            isError: false,
            isSuccess: true,
            primaryContactInformation: contacts.data.primaryContact,
            secondaryContactInformation: contacts.data.secondaryContact,
            emergencyContactInformation: contacts.data.emergencyContact
          }
        });
      })
      .catch(err => {
        this.setState({
          getContacts: {
            isLoading: false,
            isError: true,
            isSuccess: false,
            primaryContactInformation: {},
            secondaryContactInformation: {},
            emergencyContactInformation: {}
          }
        });
      });
  };

  getCampers = () => {
    this.setState({
      getCampers: {
        isLoading: true,
        isError: false,
        isSuccess: false,
        campers: []
      }
    });
    appClient
      .getCampers(this.props.userId)
      .then(campers => {
        this.setState({
          getCampers: {
            isLoading: false,
            isError: false,
            isSuccess: true,
            campers: campers.data
          }
        });
      })
      .catch(err => {
        this.setState({
          getCampers: {
            isLoading: false,
            isError: true,
            isSuccess: false,
            campers: []
          }
        });
      });
  };

  render() {
    let isLoading =
      this.state.getRegistrations.isLoading ||
      this.state.getCampers.isLoading ||
      this.state.getContacts.isLoading;
    if (isLoading) return <Spinner />;

    if (
      this.state.getCampers.campers.length === 0 ||
      _.isEmpty(this.state.getContacts.primaryContactInformation) ||
      _.isEmpty(this.state.getContacts.secondaryContactInformation) ||
      _.isEmpty(this.state.getContacts.emergencyContactInformation)
    ) {
      return (
        <FirstTimeWizard
          user={this.props.user}
          campers={this.state.getCampers.campers}
          primaryContactInformation={
            this.state.getContacts.primaryContactInformation
          }
          secondaryContactInformation={
            this.state.getContacts.secondaryContactInformation
          }
          emergencyContactInformation={
            this.state.getContacts.emergencyContactInformation
          }
        />
      );
    }

    if (this.state.getRegistrations.registrations.length === 0) {
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
        <RegistrationTable
          data={this.state.registrations}
          error={this.handleServerError}
          update={this.getRegistrations}
        />
      </div>
    );
  }
}

export default OverviewContainer;
