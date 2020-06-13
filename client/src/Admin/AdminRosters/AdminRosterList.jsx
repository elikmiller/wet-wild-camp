import React, { Component } from "react";
import appClient from "../../appClient";
import _ from "lodash";
import Spinner from "../../Spinner/Spinner";
import SearchTable from "../../SearchTable/SearchTable";
import { Link } from "react-router-dom";

class AdminRosterList extends Component {
    state = {
        isLoading: false,
        camps: [],
        displayArchived: false,
    };

    componentDidMount() {
        this.getCamps();
    }

    getCamps = () => {
        this.setState({
            isLoading: true,
        });
        appClient
            .adminGetCamps(this.state.displayArchived)
            .then((camps) => {
                this.setState({
                    camps: camps,
                    isLoading: false,
                });
            })
            .catch((err) => {
                this.setState({
                    isLoading: false,
                });
                this.setState(() => {
                    throw err;
                });
            });
    };

    handleQueryChange = (e) => {
        e.preventDefault();
        this.setState({
            query: e.target.value,
        });
    };

    toggleArchived = () => {
        this.setState({ displayArchived: !this.state.displayArchived }, () => {
            this.getCamps();
        });
    };

    render() {
        return (
            <div className="admin-camp-list spinner-wrapper">
                {this.state.isLoading && <Spinner />}
                <div className="d-flex justify-content-between">
                    <p className="lead">All Rosters</p>
                    <button
                        onClick={this.toggleArchived}
                        type="button"
                        className="btn btn-secondary btn-sm mt-auto mb-auto"
                    >
                        {this.state.displayArchived ? "Hide Archived" : "Show Archived"}
                    </button>
                </div>
                <SearchTable
                    items={this.state.camps}
                    searchKeys={["name", "type"]}
                    queryPlaceholder="Search Rosters"
                    columns={[
                        { key: "name", name: "Name", displayFunc: (item) => item.name },
                        {
                            key: "type",
                            name: "Type",
                            displayFunc: (item) => _.capitalize(item.type),
                        },
                        {
                            key: "registrations.length",
                            name: "Registrations / Capacity",
                            displayFunc: (item) => {
                                let confirmedRegistrations = item.registrations.filter(
                                    (registrations) =>
                                        registrations.deposit || registrations.paid || registrations.spaceSaved
                                );
                                return `${confirmedRegistrations.length} / ${item.capacity}`;
                            },
                        },
                        {
                            key: "waitlisted.length",
                            name: "Waitlist",
                            displayFunc: (item) => {
                                let waitlistedRegistrations = item.registrations.filter(
                                    (registrations) => registrations.waitlist
                                );
                                return `${waitlistedRegistrations.length}`;
                            },
                        },
                        {
                            key: "",
                            name: "",
                            displayFunc: (item) => <Link to={`/admin/rosters/${item._id}`}>Details</Link>,
                        },
                    ]}
                />
            </div>
        );
    }
}

export default AdminRosterList;
