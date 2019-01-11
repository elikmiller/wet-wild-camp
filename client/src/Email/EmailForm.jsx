import React, { Component } from "react";

class EmailForm extends Component {
  state = {
    subject: "",
    text: ""
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props
      .sendEmail({
        subject: this.state.subject,
        text: this.state.text
      })
      .then(() => {
        this.setState({
          subject: "",
          text: ""
        });
      })
      .catch(err => {
        console.error(err);
      });
  };

  render() {
    return (
      <div className="email-form">
        <form>
          <div className="form-group">
            <label htmlFor="emailSubject">Subject:</label>
            <input
              type="text"
              className="form-control"
              name="subject"
              value={this.state.subject}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="emailBody">Body:</label>
            <textarea
              className="form-control"
              name="text"
              value={this.state.text}
              onChange={this.handleChange}
            />
          </div>
          <button
            type="button"
            className="btn btn-primary"
            disabled={this.props.emails.length === 0}
            onClick={this.handleSubmit}
          >
            <i className="far fa-envelope" /> Send to {this.props.emails.length}{" "}
            Recipient(s)
          </button>
        </form>
      </div>
    );
  }
}

export default EmailForm;
