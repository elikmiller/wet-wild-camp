import React, { Component } from "react";
import EditablePrimaryContactInformation from "./EditablePrimaryContactInformation.jsx";
import ServerError from "../forms/ServerError";
import appClient from "../appClient";
import Spinner from "../Spinner/Spinner";

class ContactInformationContainer extends Component {
  state = {
    isLoading: false,
    primaryContactInformation: {},
    secondaryContactInformation: {},
    emergencyContactInformation: {},
    errors: {}
  };

  componentDidMount() {
    this.refreshContacts();
  }

  refreshContacts = () => {
    this.setState({
      isLoading: true,
      errors: {}
    });
    appClient
      .getContacts(this.props.userId)
      .then(res => {
        this.setState({
          primaryContactInformation: res.data.primaryContact,
          secondaryContactInformation: res.data.secondaryContact,
          emergencyContactInformation: res.data.emergencyContact,
          isLoading: false
        });
      })
      .catch(err => {
        if (err.response.status === 401) {
          this.props.logout();
        } else if (err.response.status === 500) {
          this.setState({
            errors: { server: "Server error." },
            isLoading: false
          });
        }
      });
  };

  updateUser = data => {
    appClient
      .updateUser({ id: this.props.userId, data })
      .then(() => {
        this.refreshContacts();
      })
      .catch(err => {
        console.error(err);
        if (err.response.status === 500) {
          this.setState({ errors: { server: "Server error." } });
        }
      });
  };

  render() {
    if (this.state.isLoading) return <Spinner />;
    if (this.state.errors.server) return <ServerError />;
    return (
      <div className="contact-information-container">
        <EditablePrimaryContactInformation
          data={this.state.primaryContactInformation}
          updateUser={this.updateUser}
        />
        {/* <EditableSecondaryContactInformation
          data={this.state.secondaryContact}
        />
        <EditableEmergencyContactInformation
          data={this.state.emergencyContact}
        /> */}
      </div>
    );
  }
}

export default ContactInformationContainer;
