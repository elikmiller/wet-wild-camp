import React, { Component } from "react";

class PrimaryContactInformation extends Component {
  render() {
    return (
      <div className="primary-contact-information">
        <p>
          <strong>Primary Contact Information</strong>
        </p>
        <p>
          {this.props.firstName} {this.props.lastName}
        </p>
        <p>
          {this.props.phoneNumber}
          {this.props.phoneNumber && <br />}
          {this.props.email}
        </p>
        <p>
          {this.props.streetAddress}
          {this.props.streetAddress2}
          {this.props.city && <br />}
          {this.props.city && `${this.props.city}, ${this.props.state} `}
          {this.props.zipCode}
        </p>
        <button className="btn btn-primary" onClick={this.props.openForm}>
          <i className="fas fa-edit" /> Edit Primary Contact Information
        </button>
      </div>
    );
  }
}

export default PrimaryContactInformation;
