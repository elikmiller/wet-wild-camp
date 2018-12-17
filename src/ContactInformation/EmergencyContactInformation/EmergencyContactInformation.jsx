import React, { Component } from "react";

class EmergencyContactInformation extends Component {
  render() {
    return (
      <div className="emergency-contact-information">
        <h2>Emergency Contact Information</h2>
        <p>
          {this.props.data.firstName} {this.props.data.lastName}
        </p>
        <p>{this.props.data.phoneNumber}</p>
        <button className="btn btn-primary" onClick={this.props.openForm}>
          <i className="fas fa-edit" /> Edit Emergency Contact Information
        </button>
      </div>
    );
  }
}

export default EmergencyContactInformation;
