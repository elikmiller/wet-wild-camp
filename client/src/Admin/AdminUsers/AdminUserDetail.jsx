import React, { Component } from "react";
import appClient from "../../appClient";
import { Link } from "react-router-dom";
import EditableAdminUserPrimaryContact from "./EditableAdminUserPrimaryContact";

class AdminUserDetail extends Component {
  state = {
    user: {},
    campers: []
  };

  componentDidMount() {
    this.getUser();
    this.getCampers();
  }

  getUser = () => {
    appClient.adminGetUser(this.props.match.params.userId).then(res => {
      this.setState({
        user: res
      });
    });
  };

  getCampers = () => {
    appClient.adminGetCampers().then(res => {
      let campers = res.filter(
        camper => camper.user === this.props.match.params.userId
      );
      this.setState({
        campers
      });
    });
  };

  updateUser = ({
    firstName,
    lastName,
    primaryContact,
    secondaryContact,
    emergencyContact
  }) => {
    return appClient
      .adminUpdateUser(this.props.match.params.userId, {
        firstName,
        lastName,
        primaryContact,
        secondaryContact,
        emergencyContact
      })
      .then(() => {
        this.getUser();
      });
  };

  render() {
    let { user } = this.state;
    return (
      <div className="card">
        <div className="card-header">
          {user.firstName} {user.lastName}
        </div>
        <div className="card-body">
          <p className="card-text">
            <strong>Email: </strong>
            {user.email}
          </p>
          <p>
            <strong>Campers</strong>
          </p>
          <ul>
            {this.state.campers.map(camper => (
              <li key={camper._id}>
                <Link to={`/admin/campers/${camper._id}`}>
                  {camper.firstName} {camper.lastName}
                </Link>
              </li>
            ))}
          </ul>
          <p>
            <strong>Primary Contact Information</strong>
          </p>
          {user.primaryContact && (
            <EditableAdminUserPrimaryContact
              firstName={user.primaryContact.firstName}
              lastName={user.primaryContact.lastName}
              email={user.primaryContact.email}
              phoneNumber={user.primaryContact.phoneNumber}
              streetAddress={user.primaryContact.streetAddress}
              streetAddress2={user.primaryContact.streetAddress2}
              city={user.primaryContact.city}
              state={user.primaryContact.state}
              zipCode={user.primaryContact.zipCode}
              updateUser={this.updateUser}
            />
          )}
          <p>
            <strong>Secondary Contact Information</strong>
          </p>
          {user.secondaryContact && (
            <p>
              {user.secondaryContact.firstName} {user.secondaryContact.lastName}
              <br />
              <a href={`mailto:${user.secondaryContact.email}`}>
                {user.secondaryContact.email}
              </a>
              <br />
              {user.secondaryContact.phoneNumber}
            </p>
          )}
          <p>
            <strong>Emergency Contact Information</strong>
          </p>
          {user.emergencyContact && (
            <p>
              {user.emergencyContact.firstName} {user.emergencyContact.lastName}
              <br />
              <a href={`mailto:${user.emergencyContact.email}`}>
                {user.emergencyContact.email}
              </a>
              <br />
              {user.emergencyContact.phoneNumber}
            </p>
          )}
        </div>
      </div>
    );
  }
}

export default AdminUserDetail;
