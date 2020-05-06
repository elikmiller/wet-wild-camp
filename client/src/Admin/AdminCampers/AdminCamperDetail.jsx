import React, { Component } from "react";
import appClient from "../../appClient";
import { Link } from "react-router-dom";
import EditableAdminCamper from "./EditableAdminCamper";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import AdminRegistrationForm from "../AdminRegistrations/AdminRegistrationForm";

class AdminCamperDetail extends Component {
    state = {
        camper: {},
        registrations: [],
        editIsOpen: false,
        addRegistrationIsOpen: false,
        confirmDeleteIsOpen: false,
    };

    componentDidMount() {
        this.getCamper();
        this.getRegistrations();
    }

    getCamper = () => {
        return appClient
            .adminGetCamper(this.props.match.params.camperId)
            .then((camper) => {
                this.setState({
                    camper,
                });
            })
            .catch((error) => {
                this.setState(() => {
                    throw error;
                });
            });
    };

    updateCamper = ({ firstName, lastName, gender, dateOfBirth, swimmingStrength, notes }) => {
        let id = this.state.camper._id;
        return appClient
            .adminUpdateCamper(id, {
                firstName,
                lastName,
                gender,
                dateOfBirth,
                swimmingStrength,
                notes,
            })
            .then((updatedCamper) => {
                this.setState({
                    camper: updatedCamper,
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
            .catch((error) => {
                this.confirmDeleteClose();
                this.setState(() => {
                    throw error;
                });
            });
    };

    getRegistrations = () => {
        return appClient.adminGetRegistrations().then((registrations) => {
            this.setState({
                registrations: registrations.filter(
                    (registration) => registration.camper._id === this.props.match.params.camperId
                ),
            });
        });
    };

    createRegistration = ({ campId, morningDropoff, afternoonPickup, deposit, paid, spaceSaved, waitlist }) => {
        return appClient
            .adminCreateRegistration({
                user: this.state.camper.user._id,
                camper: this.state.camper._id,
                camp: campId,
                morningDropoff,
                afternoonPickup,
                deposit,
                paid,
                spaceSaved,
                waitlist,
            })
            .then(() => {
                this.getCamper();
                this.getRegistrations();
            });
    };

    addRegistrationOpen = () => {
        this.setState({
            addRegistrationIsOpen: true,
        });
    };

    addRegistrationClose = () => {
        this.setState({
            addRegistrationIsOpen: false,
        });
    };

    editOpen = () => {
        this.setState({
            editIsOpen: true,
        });
    };

    editClose = () => {
        this.setState({
            editIsOpen: false,
        });
    };

    confirmDeleteOpen = () => {
        this.setState({
            confirmDeleteIsOpen: true,
        });
    };

    confirmDeleteClose = () => {
        this.setState({
            confirmDeleteIsOpen: false,
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
                                <UncontrolledDropdown>
                                    <DropdownToggle caret>Options</DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem onClick={this.editOpen}>Edit Camper</DropdownItem>
                                        <DropdownItem onClick={this.confirmDeleteOpen}>Delete Camper</DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem onClick={this.addRegistrationOpen}>Add Registration</DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
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
                                    {registrations.map((registration) => (
                                        <li key={registration._id}>
                                            <Link
                                                to={{
                                                    pathname: `/admin/registrations/${registration._id}`,
                                                    state: { previousPage: this.props.history.location },
                                                }}
                                            >
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
                    toggle={this.confirmDeleteClose}
                    className={this.props.className}
                >
                    <ModalHeader toggle={this.confirmDeleteClose}>Delete Camper</ModalHeader>
                    <ModalBody>
                        Are you sure you want to delete {camper.firstName} {camper.lastName}?
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-outline-secondary mr-3" onClick={this.confirmDeleteClose}>
                            Cancel
                        </button>
                        <button className="btn btn-danger" onClick={this.deleteCamper}>
                            Delete
                        </button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.addRegistrationIsOpen} toggle={this.addRegistrationClose}>
                    <ModalHeader toggle={this.addRegistrationClose}>Add Registration</ModalHeader>
                    <ModalBody>
                        <AdminRegistrationForm
                            camper={this.state.camper}
                            user={this.state.camper.user}
                            onSubmit={this.createRegistration}
                            closeForm={this.addRegistrationClose}
                        />
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default AdminCamperDetail;
