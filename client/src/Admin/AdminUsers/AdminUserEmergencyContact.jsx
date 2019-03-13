import React, { Component } from "react";

class AdminUserEmergencyContact extends Component {
  render() {
    return (
      <div className="admin-user-emergency-contact">
        {this.props.firstName} {this.props.lastName}
        <br />
        {this.props.phoneNumber}
      </div>
    );
  }
}

export default AdminUserEmergencyContact;
