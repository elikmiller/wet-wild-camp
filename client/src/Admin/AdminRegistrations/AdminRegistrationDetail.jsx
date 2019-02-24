import React, { Component } from "react";
import appClient from "../../appClient";
import _ from "lodash";
import { Link } from "react-router-dom";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import AdminRegistration from "./AdminRegistration";

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
          registration: Object.assign(this.state.registration, registration)
        });
      })
      .catch(error => {
        this.setState(() => {
          throw error;
        });
      });
  };

  updateRegistration = data => {
    appClient
      .adminUpdateRegistration(this.state.registration._id, data)
      .then(updatedRegistration => {
        this.setState({
          registration: updatedRegistration
        });
      })
      .catch(error => {
        this.setState(() => {
          throw error;
        });
      });
  };

  deleteRegistration = () => {
    appClient
      .adminDeleteRegistration(this.state.registration._id)
      .then(() => {
        this.props.history.push("/admin/registrations");
      })
      .catch(error => {
        this.setState(() => {
          this.confirmDeleteClose();
          throw error;
        });
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
                created={registration.created}
                updateRegistration={this.updateRegistration}
                isOpen={this.state.editIsOpen}
                openForm={this.editOpen}
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
      </div>
      // <div className="card">
      //   <div className="card-header d-flex justify-content-between align-items-center">
      //     <p className="card-text mb-0">
      //       {camper.firstName} {camper.lastName} - {camp.name}{" "}
      //       {_.capitalize(camp.type)}
      //     </p>
      //     <button
      //       className="btn btn-danger btn-sm"
      //       onClick={this.toggleConfirm}
      //     >
      //       <i className="fas fa-trash" /> Delete
      //     </button>
      //   </div>
      //   <div className="card-body">
      //     {this.state.confirmMessage && (
      //       <div
      //         className="alert alert-info d-flex justify-content-between align-items-center"
      //         role="alert"
      //       >
      //         Are you sure you want to delete this registration?
      //         <div>
      //           <button
      //             className="btn btn-secondary btn-sm"
      //             onClick={this.toggleConfirm}
      //           >
      //             Cancel
      //           </button>
      //           <button
      //             className="btn btn-danger btn-sm mb-0 ml-1"
      //             onClick={this.deleteRegistration}
      //           >
      //             Delete
      //           </button>
      //         </div>
      //       </div>
      //     )}
      //     {this.state.errors.delete && (
      //       <div className="alert alert-danger" role="alert">
      //         {this.state.errors.delete}
      //       </div>
      //     )}
      //     <p className="card-text">
      //       <Link to={`/admin/campers/${camper._id}`}>Camper Information</Link>
      //     </p>
      //     <p className="card-text">
      //       <strong>Associated Contact: </strong>
      //       <Link to={`/admin/users/${user._id}`}>
      //         {user.firstName} {user.lastName}
      //       </Link>
      //     </p>
      //     <p className="card-text mb-5">
      //       <strong>Payment Status: </strong>
      //       {registration.paid && (
      //         <span className="badge badge-success ml-1">Paid in Full</span>
      //       )}
      //       {registration.deposit && !registration.paid && (
      //         <span className="badge badge-warning ml-1">Deposit Paid</span>
      //       )}
      //       {!registration.paid && !registration.deposit && (
      //         <span className="badge badge-danger ml-1">Unpaid</span>
      //       )}
      //     </p>
      //     {!this.state.formOpen && (
      //       <button className="btn btn-primary" onClick={this.toggleForm}>
      //         Update Payment Info
      //       </button>
      //     )}
      //     {this.state.formOpen && (
      //       <form>
      //         <div className="form-group">
      //           <label htmlFor="paymentSelect">Update Payment Info</label>
      //           <select
      //             value={this.state.formValue}
      //             onChange={this.handleChange}
      //             className="form-control"
      //             id="paymentSelect"
      //           >
      //             <option value="">Please select a payment option</option>
      //             <option value="none">Unpaid</option>
      //             <option value="deposit">Deposit Paid</option>
      //             <option value="paid">Paid in Full</option>
      //           </select>
      //           {this.state.showError && (
      //             <small className="text-danger">
      //               Please select a valid option.
      //             </small>
      //           )}
      //         </div>
      //         <div>
      //           <button
      //             className="btn btn-secondary mr-3"
      //             onClick={this.toggleForm}
      //           >
      //             Cancel
      //           </button>
      //           <button className="btn btn-primary" onClick={this.handleSubmit}>
      //             Submit
      //           </button>
      //         </div>
      //       </form>
      //     )}
      //   </div>
      // </div>
    );
  }
}

export default AdminRegistrationDetail;
