import React, { Component } from "react";
import appClient from "../../appClient";
import { Link } from "react-router-dom";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import AdminRegistration from "./AdminRegistration";
import AdminRegistrationForm from "./AdminRegistrationForm";

class AdminRegistrationDetail extends Component {
  state = {
    registration: {
      camp: {},
      camper: {},
      user: {}
    },
    editIsOpen: false,
    confirmDeleteIsOpen: false
  };

  componentDidMount() {
    this.getRegistration();
  }

  getRegistration = () => {
    appClient
      .adminGetRegistration(this.props.match.params.registrationId)
      .then(registration => {
        this.setState({
          registration: Object.assign(
            {
              camp: {},
              camper: {},
              user: {}
            },
            registration
          )
        });
      });
  };

  updateRegistration = ({
    morningDropoff,
    afternoonPickup,
    deposit,
    paid,
    waitlist,
    spaceSaved,
    campId
  }) => {
    console.log(spaceSaved);
    appClient
      .adminUpdateRegistration(this.state.registration._id, {
        morningDropoff,
        afternoonPickup,
        deposit,
        paid,
        waitlist,
        spaceSaved,
        campId
      })
      .then(updatedRegistration => {
        console.log(updatedRegistration);
        this.getRegistration();
      });
  };

  deleteRegistration = () => {
    appClient.adminDeleteRegistration(this.state.registration._id).then(() => {
      this.props.history.push("/admin/registrations");
    });
  };

  editOpen = () => {
    this.setState({
      editIsOpen: true
    });
  };

  editClose = () => {
    this.setState({
      editIsOpen: false
    });
  };

  confirmDeleteOpen = () => {
    this.setState({
      confirmDeleteIsOpen: true
    });
  };

  confirmDeleteClose = () => {
    this.setState({
      confirmDeleteIsOpen: false
    });
  };

  render() {
    let { registration } = this.state;
    return (
      <div className="admin-registration-detail">
        <div className="card">
          <div className="card-header">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0">Registration Details</h5>
              <div>
                <UncontrolledDropdown>
                  <DropdownToggle caret>Options</DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem onClick={this.editOpen}>
                      Edit Registration
                    </DropdownItem>
                    <DropdownItem onClick={this.confirmDeleteOpen}>
                      Delete Registration
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <strong>Registration: </strong>
              <AdminRegistration
                morningDropoff={registration.morningDropoff}
                afternoonPickup={registration.afternoonPickup}
                deposit={registration.deposit}
                paid={registration.paid}
                waitlist={registration.waitlist}
                spaceSaved={registration.spaceSaved}
                created={registration.created}
                updateRegistration={this.updateRegistration}
                closeForm={this.editClose}
              />
            </div>

            <div className="mb-3">
              <strong>User: </strong>
              <Link to={`/admin/users/${registration.user._id}`}>
                {registration.user.fullName}
              </Link>
            </div>

            <div className="mb-3">
              <strong>Camper: </strong>
              <Link to={`/admin/campers/${registration.camper._id}`}>
                {registration.camper.fullName}
              </Link>
            </div>

            <div className="mb-3">
              <strong>Camp: </strong>
              <Link to={`/admin/camps/${registration.camp._id}`}>
                {registration.camp.fullName}
              </Link>
            </div>
          </div>
        </div>
        <Modal
          isOpen={this.state.confirmDeleteIsOpen}
          toggle={this.confirmDeleteClose}
        >
          <ModalHeader toggle={this.confirmDeleteClose}>
            Delete Camper
          </ModalHeader>
          <ModalBody>
            Are you sure you want to delete this registration?
          </ModalBody>
          <ModalFooter>
            <button
              className="btn btn-outline-secondary mr-3"
              onClick={this.confirmDeleteClose}
            >
              Cancel
            </button>
            <button
              className="btn btn-danger"
              onClick={this.deleteRegistration}
            >
              Delete
            </button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.editIsOpen} toggle={this.editClose}>
          <ModalHeader toggle={this.editClose}>Edit Registration</ModalHeader>
          <ModalBody>
            <AdminRegistrationForm
              user={registration.user}
              camper={registration.camper}
              campId={registration.camp._id}
              morningDropoff={registration.morningDropoff}
              afternoonPickup={registration.afternoonPickup}
              deposit={registration.deposit}
              paid={registration.paid}
              waitlist={registration.waitlist}
              spaceSaved={registration.spaceSaved}
              created={registration.created}
              onSubmit={this.updateRegistration}
              closeForm={this.editClose}
            />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default AdminRegistrationDetail;
