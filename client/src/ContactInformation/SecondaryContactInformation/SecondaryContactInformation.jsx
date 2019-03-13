import React, { Component } from "react";

class SecondaryContactInformation extends Component {
  render() {
    return (
      <div className="secondary-contact-information">
        <p>
          <strong>Secondary Contact Information</strong>
        </p>
        <p>
          {this.props.firstName} {this.props.lastName}
        </p>
        <p>
          {this.props.phoneNumber}
          {this.props.phoneNumber && <br />}
          {this.props.email}
        </p>
        <button className="btn btn-primary" onClick={this.props.openForm}>
          <i className="fas fa-edit" /> Edit Secondary Contact Information
        </button>
      </div>
    );
  }
}

export default SecondaryContactInformation;
