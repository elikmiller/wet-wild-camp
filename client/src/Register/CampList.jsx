import React, { Component } from "react";
import appClient from "../appClient.js";
import moment from "moment";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import CampRegisterForm from "./CampRegisterForm.jsx";

const getOpenings = (camp) => {
    let registrations = camp.registrations || [];
    let size = registrations.filter((registration) => registration.status !== "Unconfirmed").length;
    let openings = camp.capacity - size;
    if (openings > 10) return "10+";
    else if (openings <= 10 && openings > 0) return openings;
    else return "Waitlisted";
};

class CampList extends Component {
    state = {
        isLoading: false,
        camps: [],
        selectedCamp: {},
        createRegistrationisOpen: false,
        createRegistrationError: {},
    };

    componentDidMount() {
        this.getCamps();
    }

    getCamps = () => {
        this.setState({
            isLoading: true,
        });
        appClient.getCamps().then((camps) => {
            camps.sort((a, b) => a.type.localeCompare(b.type));
            this.setState({
                camps,
                isLoading: false,
            });
        });
    };

    formatCampType = type => {
        var mapObj = { all:"All Ages" , junior:"Junior", adventure:"Adventure" };
        var regex = new RegExp(Object.keys(mapObj).join("|"),"gi");
        return type.replace(regex, (matched) => {
            return mapObj[matched];
        });
    }

    createRegistrationOpen = (camp) => {
        this.setState({
            createRegistrationisOpen: true,
            selectedCamp: camp,
        });
    };

    createRegistrationClose = () => {
        this.setState({
            createRegistrationisOpen: false,
            selectedCamp: {},
            createRegistrationError: {},
        });
    };

    createRegistration = ({ camp, camper, morningDropoff, afternoonPickup }) => {
        this.setState({
            createRegistrationError: {},
        });
        appClient
            .createRegistration({
                camp,
                camper,
                morningDropoff,
                afternoonPickup,
            })
            .then(() => {
                if (this.state.selectedCamp.registrations.length >= this.state.selectedCamp.capacity) {
                    this.props.history.push("/register/waitlist");
                } else {
                    this.props.history.push("/register/success");
                }
            })
            .catch((err) => {
                this.setState({
                    createRegistrationError: err,
                });
            });
    };

    render() {
        return (
            <div>
                <div className="alert alert-dark" role="alert">
                    <p className="mb-0">
                        The <strong>Register</strong> page is where you can begin the registration process for our camp
                        sessions.
                    </p>
                </div>
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Week</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Fee</th>
                                <th>Openings</th>
                                <th>Type</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.camps.map((camp, i) => (
                                <tr key={i}>
                                    <td>{camp.name}</td>
                                    <td>{moment.utc(camp.startDate).format("MM/DD/YYYY")}</td>
                                    <td>{moment.utc(camp.endDate).format("MM/DD/YYYY")}</td>
                                    <td>${camp.fee.toFixed(2)}</td>
                                    <td>{getOpenings(camp)}</td>
                                    <td>{this.formatCampType(camp.type)}</td>
                                    <td>
                                        {Date.now() < new Date(camp.closeDate).valueOf() ? (
                                            <button
                                                className="btn btn-primary float-right btn-sm"
                                                onClick={() => this.createRegistrationOpen(camp)}
                                            >
                                                Register
                                            </button>
                                        ) : (
                                            <button className="btn btn-danger float-right btn-sm" disabled>
                                                Registration Closed
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Modal isOpen={this.state.createRegistrationisOpen} toggle={this.createRegistrationClose}>
                    <ModalHeader toggle={this.createRegistrationClose}>Add Camper</ModalHeader>
                    <ModalBody>
                        <CampRegisterForm
                            camp={this.state.selectedCamp}
                            onSubmit={this.createRegistration}
                            closeForm={this.createRegistrationClose}
                            error={this.state.createRegistrationError}
                        />
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default CampList;
