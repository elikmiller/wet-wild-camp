import React, { Component } from "react";
import ContactCard from "./ContactCard";
import appClient from "../appClient";

class EditableContact extends Component {
  state = {
    formOpen: false
  };

  toggleForm = () => {
    this.setState({ formOpen: !this.state.formOpen });
  };

  submit = data => {
    let id = this.props.userId;
    appClient.updateUser({ id, data }).then(res => {
      this.toggleForm();
      this.props.refreshContacts();
    });
  };

  render() {
    let { form } = this.props;
    if (this.state.formOpen) {
      return (
        <div>
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
        <ContactCard
          title={form.title}
          data={form.data}
          openForm={this.toggleForm}
        />
      );
    }
  }
}

export default EditableContact;
