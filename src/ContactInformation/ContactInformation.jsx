import React, { Component } from "react";
import PrimaryContactInformationForm from "./PrimaryContactInformationForm.jsx";
import SecondaryContactInformationForm from "./SecondaryContactInformationForm.jsx";
import EmergencyContactInformationForm from "./EmergencyContactInformationForm.jsx";
import EditableContact from "./EditableContact.jsx";
import { AuthContext } from "../App";
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
    ]
  };

  componentDidMount() {
    this.refreshContacts();
  }

  refreshContacts = () => {
    appClient.getContacts(this.props.userId).then(res => {
      let formObject = this.state.forms.slice(0);
      formObject[0].data = res.data.primaryContact;
      formObject[1].data = res.data.secondaryContact;
      formObject[2].data = res.data.emergencyContact;
      this.setState({
        forms: formObject
      });
    });
  };

  render() {
    return (
      <div>
        <h1>Contact Information</h1>
        <div className="row">
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
      </div>
    );
  }
}

export default props => (
  <AuthContext.Consumer>
    {auth => (
      <ContactInformation
        userId={auth.userId}
        logout={auth.logout}
        {...props}
      />
    )}
  </AuthContext.Consumer>
);
