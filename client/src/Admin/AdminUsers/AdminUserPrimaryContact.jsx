import React, { Component } from "react";

class AdminUserPrimaryContact extends Component {
  render() {
    return (
      <div className="admin-user-primary-contact">
        {this.props.firstName} {this.props.lastName}
        <br />
        <a href={`mailto:${this.props.email}`}>{this.props.email}</a>
        <br />
        {this.props.phoneNumber}
        <br />
        {this.props.streetAddress}
        {this.props.streetAddress2 && (
          <span>
            <br />
            {this.props.streetAddress2}
          </span>
        )}
        <br />
        {this.props.city}, {this.props.state} {this.props.zipCode}
      </div>
    );
  }
}

export default AdminUserPrimaryContact;
