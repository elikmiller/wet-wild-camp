import React, { Component } from "react";

class AdminUserSecondaryContact extends Component {
  render() {
    return (
      <div className="admin-user-secondary-contact">
        {this.props.firstName} {this.props.lastName}
        <br />
        <a href={`mailto:${this.props.email}`}>{this.props.email}</a>
        <br />
        {this.props.phoneNumber}
      </div>
    );
  }
}

export default AdminUserSecondaryContact;
