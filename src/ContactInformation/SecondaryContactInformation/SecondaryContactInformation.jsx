import React, { Component } from "react";

class SecondaryContactInformation extends Component {
  render() {
    return (
      <div className="secondary-contact-information">
        <h2>Secondary Contact Information</h2>
        <p>
          {this.props.data.firstName} {this.props.data.lastName}
        </p>
        <p>
          {this.props.data.phoneNumber}
          <br />
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
