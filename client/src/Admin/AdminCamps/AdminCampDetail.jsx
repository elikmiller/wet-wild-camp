import React, { Component } from "react";
import appClient from "../../appClient";
import { Link } from "react-router-dom";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import EditableAdminCamp from "./EditableAdminCamp";
import Spinner from "../../Spinner/Spinner";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class AdminCampDetail extends Component {
    state = {
        isLoading: false,
        camp: {},
        registrations: [],
        editIsOpen: false,
        confirmDeleteIsOpen: false,
    };

    componentDidMount() {
        this.getCamp();
        this.getRegistrations();
    }

    getCamp = () => {
        this.setState({ isLoading: true });
        return appClient
            .adminGetCamp(this.props.match.params.campId)
            .then((camp) => {
                this.setState({
                    camp: camp,
                    isLoading: false,
                });
            })
            .catch((error) => {
                this.setState({ isLoading: false });
                this.setState(() => {
                    throw error;
                });
            });
    };

    updateCamp = ({ name, type, description, fee, startDate, endDate, openDate, closeDate, capacity }) => {
        this.setState({ isLoading: true });
        let id = this.state.camp._id;
        return appClient
            .adminUpdateCamp(id, {
                name,
                type,
                description,
                fee,
                startDate,
                endDate,
                openDate,
                closeDate,
                capacity,
            })
            .then((updatedCamp) => {
                this.setState({
                    camp: updatedCamp,
                    isLoading: false,
                });
            })
            .catch((err) => {
                this.setState({ isLoading: false });
                this.setState(() => {
                    throw err;
                });
            });
    };

    deleteCamp = () => {
        let id = this.state.camp._id;
        return appClient
            .adminDeleteCamp(id)
            .then(() => {
                this.props.history.push("/admin/camps");
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
                    (registration) => registration.camp._id === this.props.match.params.campId
                ),
            });
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
        const { camp, registrations } = this.state;
        return (
            <div className="admin-camp-detail">
                <div className="card spinner-wrapper">
                    {this.state.isLoading && <Spinner />}
                    <div className="card-header">
                        <div className="d-flex justify-content-between align-items-center">
                            <h5 className="card-title mb-0">Camp Details</h5>
                            <div>
                                <UncontrolledDropdown>
                                    <DropdownToggle caret>Options</DropdownToggle>
                                    <DropdownMenu right>
                                        <Link to={`/admin/rosters/${this.props.match.params.campId}`}>
                                            <div className="dropdown-item">View Roster</div>
                                        </Link>
                                        <DropdownItem divider />
                                        <DropdownItem onClick={this.editOpen}>Edit Camp</DropdownItem>
                                        <DropdownItem onClick={this.confirmDeleteOpen}>Delete Camp</DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </div>
                        </div>
                    </div>

                    <div className="card-body">
                        <div className="mb-3">
                            <strong>Camp: </strong>
                            <EditableAdminCamp
                                name={camp.name}
                                type={camp.type}
                                description={camp.description}
                                fee={camp.fee}
                                startDate={camp.startDate}
                                endDate={camp.endDate}
                                openDate={camp.openDate}
                                closeDate={camp.closeDate}
                                capacity={camp.capacity}
                                updateCamp={this.updateCamp}
                                isOpen={this.state.editIsOpen}
                                openForm={this.editOpen}
                                closeForm={this.editClose}
                            />
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
                                                {registration.camper.firstName} {registration.camper.lastName}
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
                    <ModalHeader toggle={this.confirmDeleteClose}>Delete Camp</ModalHeader>
                    <ModalBody>Are you sure you want to delete {camp.fullName}?</ModalBody>
                    <ModalFooter>
                        <button className="btn btn-outline-secondary mr-3" onClick={this.confirmDeleteClose}>
                            Cancel
                        </button>
                        <button className="btn btn-danger" onClick={this.deleteCamp}>
                            Delete
                        </button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default AdminCampDetail;
