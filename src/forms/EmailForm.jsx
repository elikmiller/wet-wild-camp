import React, { Component } from "react";
import appClient from "../appClient";

class EmailForm extends Component {
  state = {
    formValues: {
      emailSubject: "",
      emailBody: ""
    }
  };

  handleChange = e => {
    let { formValues } = this.state;
    let { id, value } = e.target;
    formValues[id] = value;
    this.setState({ formValues: formValues });
  };

  handleSubmit = e => {
    e.preventDefault();
    appClient
      .sendEmail({
        from: "",
        to: this.props.emails.length === 1 && this.props.emails,
        cc: null,
        bcc: this.props.emails.length > 1 && this.props.emails,
        subject: this.state.formValues.emailSubject,
        text: this.state.formValues.emailBody
      })
      .then(() => {
        this.setState({ formValues: { emailSubject: "", emailBody: "" } });
      })
      .catch(err => {
        console.error(err);
      });
  };

  formatEmails = emails => {
    let emailString = "";
    for (let i = 0; i < emails.length; i++) {
      if (i < emails.length - 1 && emails.length > 2) {
        emailString += `${emails[i]}, `;
      } else if (i < emails.length - 1 || i === 0) {
        emailString += `${emails[i]} `;
      } else {
        emailString += `and ${emails[i]}`;
      }
    }
    return emailString;
  };

  render() {
    let formattedEmails = this.formatEmails(this.props.emails);
    return (
      <div>
        <h4>
          Send Email
          {this.props.emails.length ? " to:" : ""}
        </h4>
        <p>{formattedEmails}</p>
        <br />
        <form>
          <div className="form-group">
            <label htmlFor="emailSubject">Subject:</label>
            <input
              type="text"
              className="form-control"
              id="emailSubject"
              value={this.state.formValues["emailSubject"]}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="emailBody">Body:</label>
            <textarea
              className="form-control"
              id="emailBody"
              value={this.state.formValues["emailBody"]}
              onChange={this.handleChange}
            />
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.handleSubmit}
          >
            Send
          </button>
        </form>
      </div>
    );
  }
}

export default EmailForm;
