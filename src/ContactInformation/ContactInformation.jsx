import React, { Component } from "react";
import PrimaryContactInformationForm from "./PrimaryContactInformationForm.jsx";
import SecondaryContactInformationForm from "./SecondaryContactInformationForm.jsx";
import EmergencyContactInformationForm from "./EmergencyContactInformationForm.jsx";
import EditableContact from "./EditableContact.jsx";
import ServerError from "../forms/ServerError";
import appClient from "../appClient";

class ContactInformation extends Component {
  state = {
    forms: [
      {
        title: "Primary Contact",
        component: PrimaryContactInformationForm,
        data: {}
      },
      {
        title: "Secondary Contact",
        component: SecondaryContactInformationForm,
        data: {}
      },
      {
        title: "Emergency Contact",
        component: EmergencyContactInformationForm,
        data: {}
      }
    ],
    errors: {}
  };

  componentDidMount() {
    this.refreshContacts();
  }

  refreshContacts = () => {
    appClient
      .getContacts(this.props.userId)
      .then(res => {
        let formObject = this.state.forms.slice(0);
        formObject[0].data = res.data.primaryContact;
        formObject[1].data = res.data.secondaryContact;
        formObject[2].data = res.data.emergencyContact;
        this.setState({
          forms: formObject
        });
      })
      .catch(err => {
        if (err.response.status === 401) {
          this.props.logout();
        } else if (err.response.status === 500) {
          this.setState({ errors: { server: "Server error." } });
        }
      });
  };

  render() {
    return (
      <div className="row">
        {this.state.errors.server && <ServerError />}
        {this.state.forms.map((form, i) => {
          return (
            <div className="col" key={i}>
              <EditableContact
                form={form}
                refreshContacts={this.refreshContacts}
                userId={this.props.userId}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

export default ContactInformation;
