import React, { Component } from "react";
import appClient from "../../appClient";
import { Link } from "react-router-dom";
import EditableAdminUserPrimaryContact from "./EditableAdminUserPrimaryContact";
import EditableAdminUserSecondaryContact from "./EditableAdminUserSecondaryContact";
import EditableAdminUserEmergencyContact from "./EditableAdminUserEmergencyContact";
import AdminUser from "./AdminUser";
import moment from "moment";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import AdminCamperForm from "../AdminCampers/AdminCamperForm";

class AdminUserDetail extends Component {
  state = {
    user: {
      primaryContact: {},
      secondaryContact: {},
      emergencyContact: {},
      registrations: [],
      campers: [],
      payments: [],
      camperAddOpen: false,
      deleteUserOpen: false
    }
  };

  componentDidMount() {
    this.getUser();
  }

  getUser = () => {
    return appClient.adminGetUser(this.props.match.params.userId).then(user => {
      this.setState({
        user: Object.assign(
          {
            primaryContact: {},
            secondaryContact: {},
            emergencyContact: {},
            registrations: [],
            campers: [],
            payments: []
          },
          user
        )
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
        this.getUser();
      });
  };

  createCamper = ({
    firstName,
    lastName,
    gender,
    dateOfBirth,
    swimmingStrength,
    notes
  }) => {
    return appClient
      .adminCreateCamper({
        user: this.state.user._id,
        firstName,
        lastName,
        gender,
        dateOfBirth,
        swimmingStrength,
        notes
      })
      .then(() => {
        this.getUser();
      });
  };

  deleteUser = () => {
    return appClient.adminDeleteUser(this.state.user._id).then(() => {
      this.closeDeleteUser();
      this.props.history.push("/admin/users");
    });
  };

  openAddCamper = () => {
    this.setState({
      camperAddOpen: true
    });
  };

  closeAddCamper = () => {
    this.setState({
      camperAddOpen: false
    });
  };

  openDeleteUser = () => {
    this.setState({
      deleteUserOpen: true
    });
  };

  closeDeleteUser = () => {
    this.setState({
      deleteUserOpen: false
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
              <div>
                <UncontrolledDropdown>
                  <DropdownToggle caret>Options</DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem onClick={this.openAddCamper}>
                      Add Camper
                    </DropdownItem>
                    <DropdownItem onClick={this.openDeleteUser}>
                      Delete User
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div>
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
                      {registration.waitlist && " -- WAITLIST"}
                    </Link> 
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-3">
              <strong>Payments: </strong>
              <ul className="list-unstyled">
                {this.state.user.payments
                  .filter(payment => payment.executed)
                  .map(payment => (
                    <li key={payment._id}>
                      <Link to={`/admin/payments/${payment._id}`}>
                        {moment(payment.timeCreated).format("MM/DD/YYYY")}
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
        <Modal isOpen={this.state.camperAddOpen} toggle={this.closeAddCamper}>
          <ModalHeader toggle={this.closeAddCamper}>Add Camper</ModalHeader>
          <ModalBody>
            <AdminCamperForm
              onSubmit={this.createCamper}
              closeForm={this.closeAddCamper}
            />
          </ModalBody>
        </Modal>
        <Modal isOpen={this.state.deleteUserOpen} toggle={this.closeDeleteUser}>
          <ModalHeader toggle={this.closeDeleteUser}>Delete User</ModalHeader>
          <ModalBody>
            <p className="mt-2 mb-4">
              Are you sure you want to delete this user? This will also delete
              all associated registration, camper, and payment data.
            </p>
            <button
              className="btn btn-outline-secondary mr-3"
              onClick={this.closeDeleteUser}
            >
              Cancel
            </button>
            <button className="btn btn-danger" onClick={this.deleteUser}>
              Delete User
            </button>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default AdminUserDetail;
