import React, { Component } from "react";
import EmailForm from "../forms/EmailForm";
import CopyToClipboard from "react-copy-to-clipboard";
import appClient from "../appClient";
import Spinner from "../Spinner/Spinner";

class EmailContainer extends Component {
  state = {
    isLoading: false,
    isSuccess: false,
    isError: false
  };

  sendEmail = data => {
    this.setState({
      isLoading: true,
      isSuccess: false,
      isError: false
    });
    return appClient
      .sendEmail({
        from: "wetwildcamp@wetwildcamp.com",
        to: this.props.emails.length === 1 && this.props.emails,
        bcc: this.props.emails.length > 1 && this.props.emails,
        subject: data.subject,
        text: data.text
      })
      .then(() => {
        this.setState({
          isLoading: false,
          isSuccess: true,
          isError: false
        });
      })
      .catch(() => {
        this.setState({
          isLoading: false,
          isSuccess: false,
          isError: true
        });
      });
  };

  render() {
    return (
      <div className="email-container">
        <div className="card">
          <div className="card-header">{this.props.title}</div>
          <div className="card-body position-relative">
            {this.state.isLoading && <Spinner />}
            <div className="d-flex align-items-center justify-content-between mb-2">
              <div>Recipients:</div>
              <div>
                <CopyToClipboard text={this.props.emails.join("; ")}>
                  <button
                    disabled={this.props.emails.length === 0}
                    className="btn btn-outline-primary"
                  >
                    Copy Recipients
                  </button>
                </CopyToClipboard>
              </div>
            </div>
            <div className="form-group">
              <textarea
                className="form-control"
                readOnly
                value={this.props.emails.join("; ")}
              />
            </div>
            <EmailForm emails={this.props.emails} sendEmail={this.sendEmail} />
          </div>
        </div>
      </div>
    );
  }
}

export default EmailContainer;
