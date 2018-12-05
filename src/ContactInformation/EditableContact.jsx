import React, { Component } from "react";
import ContactCard from "./ContactCard";
import ServerError from "../forms/ServerError";
import appClient from "../appClient";

class EditableContact extends Component {
  state = {
    formOpen: false,
    errors: {}
  };

  toggleForm = () => {
    this.setState({ formOpen: !this.state.formOpen });
  };

  submit = data => {
    let id = this.props.userId;
    appClient
      .updateUser({ id, data })
      .then(res => {
        this.toggleForm();
        this.props.refreshContacts();
      })
      .catch(err => {
        if (err.response.status === 500) {
          this.setState({ errors: { server: "Server error." } });
        }
      });
  };

  render() {
    let { form } = this.props;
    if (this.state.formOpen) {
      return (
        <div>
          {this.state.errors.server && <ServerError />}
          <form.component
            title={form.title}
            data={form.data}
            closeForm={this.toggleForm}
            onSubmit={this.submit}
          />
        </div>
      );
    } else {
      return (
        <div>
          {this.state.errors.server && <ServerError />}
          <ContactCard
            title={form.title}
            data={form.data}
            openForm={this.toggleForm}
          />
        </div>
      );
    }
  }
}

export default EditableContact;
