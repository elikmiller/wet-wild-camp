import React, { Component } from "react";

class EmergencyContactInformation extends Component {
  render() {
    return (
      <div className="emergency-contact-information">
        <p>
          <strong>Emergency Contact Information</strong>
        </p>
        <p>
          {this.props.firstName} {this.props.lastName}
        </p>
        <p>{this.props.phoneNumber}</p>
        <button className="btn btn-primary" onClick={this.props.openForm}>
          <i className="fas fa-edit" /> Edit Emergency Contact Information
        </button>
      </div>
    );
  }
}

export default EmergencyContactInformation;
