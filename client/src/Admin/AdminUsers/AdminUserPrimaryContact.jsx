import React, { Component } from "react";

class AdminUserPrimaryContact extends Component {
  render() {
    return (
      <div className="admin-user-primary-contact">
        <p>
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
        </p>

        <button className="btn btn-primary mb-3" onClick={this.props.openForm}>
          <i className="fas fa-edit" /> Edit Primary Contact
        </button>
      </div>
    );
  }
}

export default AdminUserPrimaryContact;
