import React, { Component } from "react";
import ContactCard from "./ContactCard";

class EditableContact extends Component {
  state = {
    formOpen: false
  };

  toggleForm = () => {
    this.setState({ formOpen: !this.state.formOpen });
  };

  render() {
    let { form } = this.props;
    if (this.state.formOpen) {
      return (
        <div>
          <form.component title={form.title} data={form.data} />
        </div>
      );
    } else {
      return <ContactCard title={form.title} data={form.data} />;
    }
  }
}

export default EditableContact;
