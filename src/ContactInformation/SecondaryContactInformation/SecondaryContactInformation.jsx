import React, { Component } from "react";

class SecondaryContactInformation extends Component {
  render() {
    return (
      <div className="secondary-contact-information">
        <p>
          <strong>Secondary Contact Information</strong>
        </p>
        <p>
          {this.props.data.firstName} {this.props.data.lastName}
        </p>
        <p>
          {this.props.data.phoneNumber}
          {this.props.data.phoneNumber && <br />}
          {this.props.data.email}
        </p>
        <button className="btn btn-primary" onClick={this.props.openForm}>
          <i className="fas fa-edit" /> Edit Secondary Contact Information
        </button>
      </div>
    );
  }
}

export default SecondaryContactInformation;
