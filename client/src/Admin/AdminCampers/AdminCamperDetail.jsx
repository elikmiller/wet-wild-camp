import React, { Component } from "react";
import appClient from "../../appClient";
import { Link } from "react-router-dom";
import EditableAdminCamper from "./EditableAdminCamper";
import Dropdown from "../../Dropdown/Dropdown";
import Modal from "../../Modal/Modal";

class AdminCamperDetail extends Component {
  state = {
    camper: {},
    registrations: [],
    editIsOpen: false,
    confirmDeleteIsOpen: false
  };

  componentDidMount() {
    this.getCamper();
    this.getRegistrations();
  }

  getCamper = () => {
    return appClient
      .adminGetCamper(this.props.match.params.camperId)
      .then(camper => {
        this.setState({
          camper
        });
      });
  };

  updateCamper = ({
    firstName,
    lastName,
    gender,
    dateOfBirth,
    swimmingStrength,
    notes
  }) => {
    let id = this.state.camper._id;
    return appClient
      .adminUpdateCamper(id, {
        firstName,
        lastName,
        gender,
        dateOfBirth,
        swimmingStrength,
        notes
      })
      .then(updatedCamper => {
        this.setState({
          camper: updatedCamper
        });
      });
  };

  deleteCamper = () => {
    let id = this.state.camper._id;
    return appClient
      .adminDeleteCamper(id)
      .then(() => {
        this.props.history.push("/admin/campers");
      })
      .catch(error => {
        this.confirmDeleteClose();
        this.setState(() => {
          throw error;
        });
      });
  };

  getRegistrations = () => {
    return appClient.adminGetRegistrations().then(registrations => {
      this.setState({
        registrations: registrations.filter(
          registration =>
            registration.camper._id === this.props.match.params.camperId
        )
      });
    });
  };

  toggleConfirm = () => {
    this.setState({
      confirmMessage: !this.state.confirmMessage
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
    const { camper, registrations } = this.state;
    return (
      <div className="admin-camper-detail">
        <div className="card">
          <div className="card-header">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0">Camper Details</h5>
              <div>
                <Dropdown
                  label="Options"
                  items={[
                    { label: "Edit Camper", onClick: this.editOpen },
                    { label: "Delete Camper", onClick: this.confirmDeleteOpen }
                  ]}
                />
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <strong>Camper: </strong>
              <EditableAdminCamper
                firstName={camper.firstName}
                lastName={camper.lastName}
                gender={camper.gender}
                dateOfBirth={camper.dateOfBirth}
                age={camper.age}
                swimmingStrength={camper.swimmingStrength}
                notes={camper.notes}
                updateCamper={this.updateCamper}
                isOpen={this.state.editIsOpen}
                openForm={this.editOpen}
                closeForm={this.editClose}
              />
            </div>

            <div className="mb-3">
              <strong>User: </strong>
              {this.state.camper.user && (
                <div>
                  <Link to={`/admin/users/${camper.user._id}`}>
                    {camper.user.firstName} {camper.user.lastName}
                  </Link>
                </div>
              )}
              {!this.state.camper.user && (
                <div>
                  <em>No User Found</em>
                </div>
              )}
            </div>

            <div className="mb-3">
              <strong>Registrations: </strong>
              {registrations.length > 0 && (
                <ul className="list-unstyled">
                  {registrations.map(registration => (
                    <li key={registration._id}>
                      <Link to={`/admin/registrations/${registration._id}`}>
                        {registration.camp.fullName}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              {registrations.length === 0 && (
                <p>
                  <em>No Registrations Found</em>
                </p>
              )}
            </div>
          </div>
        </div>
        <Modal
          isOpen={this.state.confirmDeleteIsOpen}
          contentLabel="Delete Camper"
          onRequestClose={this.confirmDeleteClose}
          shouldCloseOnOverlayClick={true}
        >
          <p>
            Are you sure you want to delete {camper.firstName} {camper.lastName}
            ?
          </p>
          <div>
            <button
              className="btn btn-outline-secondary mr-3"
              onClick={this.confirmDeleteClose}
            >
              Cancel
            </button>
            <button className="btn btn-danger" onClick={this.deleteCamper}>
              Delete
            </button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default AdminCamperDetail;
