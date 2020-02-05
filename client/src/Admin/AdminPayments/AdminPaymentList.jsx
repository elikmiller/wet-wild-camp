import React, { Component } from "react";
import appClient from "../../appClient";
import Spinner from "../../Spinner/Spinner";
import SearchTable from "../../SearchTable/SearchTable";
import moment from "moment";
import { Link } from "react-router-dom";

class AdminPaymentList extends Component {
    state = {
        payments: [],
        isLoading: false,
        displayArchived: false
    };

    componentDidMount() {
        this.getPayments();
    }

    getPayments = () => {
        this.setState({
            isLoading: true
        });
        return appClient
            .adminGetPayments(this.state.displayArchived)
            .then(payments => {
                this.setState({
                    payments: payments.filter(payment => payment.executed === true),
                    isLoading: false
                });
            })
            .catch(err => {
                this.setState(() => {
                    throw err;
                });
            });
    };

    toggleArchived = () => {
        this.setState({ displayArchived: !this.state.displayArchived }, () => {
            this.getPayments();
        });
    };

    render() {
        return (
            <div className="admin-payment-list">
                {this.state.isLoading && <Spinner />}
                <div className="d-flex justify-content-between">
                    <p className="lead">All Payments</p>
                    <button
                        onClick={this.toggleArchived}
                        type="button"
                        className="btn btn-secondary btn-sm mt-auto mb-auto"
                    >
                        {this.state.displayArchived ? "Hide Archived" : "Show Archived"}
                    </button>
                </div>
                <SearchTable
                    items={this.state.payments}
                    searchKeys={["user.firstName", "user.lastName", "amount"]}
                    queryPlaceholder="Search Payments"
                    columns={[
                        {
                            key: "user.lastName",
                            name: "User",
                            displayFunc: item =>
                                item.user ? `${item.user.firstName} ${item.user.lastName}` : <em>No User Found</em>
                        },
                        {
                            key: "amount",
                            name: "Amount",
                            displayFunc: item => `$${item.amount.toFixed(2)}`
                        },
                        {
                            key: "timeCreated",
                            name: "Date",
                            displayFunc: item => moment.utc(item.timeCreated).format("MM/DD/YYYY")
                        },
                        {
                            key: "",
                            name: "",
                            displayFunc: item => <Link to={`/admin/payments/${item._id}`}>Details</Link>
                        }
                    ]}
                />
            </div>
        );
    }
}

export default AdminPaymentList;
