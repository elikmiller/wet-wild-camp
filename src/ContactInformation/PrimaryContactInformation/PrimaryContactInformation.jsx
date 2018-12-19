import React, { Component } from "react";

class PrimaryContactInformation extends Component {
  render() {
    return (
      <div className="primary-contact-information">
        <h2>Primary Contact Information</h2>
        <p>
          {this.props.data.firstName} {this.props.data.lastName}
        </p>
        <p>
          {this.props.data.phoneNumber}
          {this.props.data.phoneNumber && <br />}
          {this.props.data.email}
        </p>
        <p>
          {this.props.data.streetAddress}
          {this.props.data.streetAddress2}
          {this.props.data.city && <br />}
          {this.props.data.city &&
            `${this.props.data.city}, ${this.props.data.state} `}
          {this.props.data.zipCode}
        </p>
        <button className="btn btn-primary" onClick={this.props.openForm}>
          <i className="fas fa-edit" /> Edit Primary Contact Information
        </button>
      </div>
    );
  }
}

export default PrimaryContactInformation;
