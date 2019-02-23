import React, { Component } from "react";
import appClient from "../../appClient";
import { Link } from "react-router-dom";
import EditableAdminUserPrimaryContact from "./EditableAdminUserPrimaryContact";
import EditableAdminUserSecondaryContact from "./EditableAdminUserSecondaryContact";
import EditableAdminUserEmergencyContact from "./EditableAdminUserEmergencyContact";
import AdminUser from "./AdminUser";
import moment from "moment";

class AdminUserDetail extends Component {
  state = {
    user: {
      primaryContact: {},
      secondaryContact: {},
      emergencyContact: {},
      registrations: [],
      campers: [],
      payments: []
    }
  };

  componentDidMount() {
    this.getUser();
  }

  getUser = () => {
    return appClient.adminGetUser(this.props.match.params.userId).then(user => {
      this.setState({
        user
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
    let id = this.state.user._id;
    return appClient
      .adminUpdateUser(id, {
        firstName,
        lastName,
        primaryContact,
        secondaryContact,
        emergencyContact
      })
      .then(updatedUser => {
        this.setState({
          user: updatedUser
        });
      });
  };

  render() {
    let { user } = this.state;
    return (
      <div className="admin-user-detail">
        <div className="card">
          <div className="card-header">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0">User Details</h5>
            </div>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <strong>User: </strong>
              <AdminUser
                firstName={user.firstName}
                lastName={user.lastName}
                email={user.email}
              />
            </div>

            <div className="mb-3">
              <strong>Campers: </strong>
              <ul className="list-unstyled">
                {this.state.user.campers.map(camper => (
                  <li key={camper._id}>
                    <Link to={`/admin/campers/${camper._id}`}>
                      {camper.fullName}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-3">
              <strong>Registrations: </strong>
              <ul className="list-unstyled">
                {this.state.user.registrations.map(registration => (
                  <li key={registration._id}>
                    <Link to={`/admin/registrations/${registration._id}`}>
                      {registration.camper.fullName}
                      {" - "}
                      {registration.camp.fullName}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-3">
              <strong>Payments: </strong>
              <ul className="list-unstyled">
                {this.state.user.payments.map(payment => (
                  <li key={payment._id}>
                    <Link to={`/admin/payments/${payment._id}`}>
                      {moment.utc(payment.timeCreated).format("MM/DD/YYYY")}
                      {" - "}
                      {payment.fullAmount}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-3">
              <strong>Primary Contact Information</strong>
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
            </div>

            <div className="mb-3">
              <strong>Secondary Contact Information</strong>
              <EditableAdminUserSecondaryContact
                firstName={user.secondaryContact.firstName}
                lastName={user.secondaryContact.lastName}
                email={user.secondaryContact.email}
                phoneNumber={user.secondaryContact.phoneNumber}
                updateUser={this.updateUser}
              />
            </div>

            <div className="mb-3">
              <strong>Emergency Contact Information</strong>
              <EditableAdminUserEmergencyContact
                firstName={user.emergencyContact.firstName}
                lastName={user.emergencyContact.lastName}
                email={user.emergencyContact.email}
                phoneNumber={user.emergencyContact.phoneNumber}
                updateUser={this.updateUser}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminUserDetail;
