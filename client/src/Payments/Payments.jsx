import React, { Component } from "react";
import { AuthContext } from "../App/App";
import appClient from "../appClient";
import ServerError from "../forms/ServerError";
import paypalButton from "../images/paypal-logo.png";
import Spinner from "../Spinner/Spinner";
import moment from "moment";
import _ from "lodash";
import "./Payments.css";

class Payments extends Component {
    state = {
        registrations: [],
        fullPayments: [],
        deposits: [],
        total: 0,
        earlyBird: false,
        earlyBirdDate: "",
        isLoading: false,
        errors: null
    };

    componentDidMount() {
        this.getEarlyBird();
        this.getRegistrations();
    }

    // Gets all unpaid registrations for the current user and adds them to state
    getRegistrations = () => {
        this.setState({
            isLoading: true,
            errors: null
        });
        appClient
            .getRegistrations()
            .then(registrations => {
                let unpaidRegistrations = [];
                registrations.map(registration => {
                    if (!registration.paid) unpaidRegistrations.push(registration);
                    return registration;
                });
                this.setState({
                    registrations: unpaidRegistrations,
                    isLoading: false
                });
            })
            .catch(err => {
                this.setState({
                    isLoading: false,
                    errors: err
                });
            });
    };

    getEarlyBird = () => {
        const currentDate = moment();
        appClient
            .getEarlyBird()
            .then(res => {
                const earlyBirdCutoff = moment.utc(res).format("MM/DD/YYYY");
                this.setState({
                    earlyBird: currentDate.isBefore(earlyBirdCutoff),
                    earlyBirdDate: moment(earlyBirdCutoff).format("MMMM Do")
                });
            })
            .catch(err => {
                this.setState({
                    errors: err
                });
            });
    };

    // calls POST payment route, gets the redirect route from the returned data,
    // and redirects the browser to PayPal's checkout flow
    handlePaypal = e => {
        e.preventDefault();
        this.setState({
            isLoading: true,
            errors: null
        });
        let fullPaymentIds = this.state.fullPayments.map(reg => {
            return reg._id;
        });
        let depositIds = this.state.deposits.map(reg => {
            return reg._id;
        });
        appClient
            .createPayment({
                deposits: depositIds,
                fullPayments: fullPaymentIds
            })
            .then(payment => {
                payment.links.forEach(link => {
                    if (link.method === "REDIRECT") {
                        window.location.href = link.href;
                    }
                });
            })
            .catch(err => {
                this.setState({
                    isLoading: false,
                    errors: err
                });
            });
    };

    // Adds or removes registration from state when checkboxes are clicked and
    // recalculates the total
    handleChange = e => {
        let { deposits, fullPayments } = this.state;
        let parsedValue = JSON.parse(e.target.value);
        let paymentArray = e.target.name === "deposit" ? deposits : fullPayments;

        let index = paymentArray.findIndex(i => i._id === parsedValue._id);
        if (index !== -1) paymentArray.splice(index, 1);
        else paymentArray.push(parsedValue);
        this.forceUpdate();
        this.calculateTotal();
    };

    // Calculates the total from deposits and full payments
    calculateTotal = () => {
        let total = 0;
        total = total + this.state.deposits.length * 100;
        this.state.fullPayments.forEach(registration => {
            total = total + registration.camp.fee;
            if (registration.deposit) total = total - 100;
            if (this.state.earlyBird) total = total - 40;
            this.state.deposits.forEach(deposit => {
                if (registration._id === deposit._id) {
                    total = total - 100;
                }
            });
        });
        this.setState({
            total: total
        });
    };

    render() {
        let { errors } = this.state;
        // Generates the list of registrations with checkboxes
        let content = this.state.registrations.map((reg, i) => {
            let total = reg.camp.fee;
            if (reg.deposit) total = total - 100;
            if (this.state.earlyBird) total = total - 40;
            console.log(this.state);
            return (
                <tr key={i}>
                    <td>
                        {!reg.waitlist && !reg.deposit && (
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="deposit"
                                    onChange={this.handleChange}
                                    value={JSON.stringify(reg)}
                                />
                            </div>
                        )}
                        {reg.deposit && !reg.waitlist && <span className="badge badge-success">Paid</span>}
                        {reg.waitlist && <span className="badge badge-warning">Waitlisted</span>}
                    </td>
                    <td>
                        {!reg.waitlist && (
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="full"
                                    onChange={this.handleChange}
                                    value={JSON.stringify(reg)}
                                />
                            </div>
                        )}
                    </td>
                    <td>{reg.camp.name}</td>
                    <td>{_.capitalize(reg.camp.type)}</td>
                    <td>{moment.utc(reg.camp.startDate).format("MM/DD/YYYY")}</td>
                    <td>{moment.utc(reg.camp.endDate).format("MM/DD/YYYY")}</td>
                    <td>
                        {reg.camper.firstName} {reg.camper.lastName}
                    </td>
                    <td>${total}</td>
                </tr>
            );
        });
        return (
            <div className="wrapper payments-wrapper spinner-wrapper">
                {errors && errors.statusCode === 500 && <ServerError />}
                {this.state.isLoading && <Spinner />}
                <div className="alert alert-dark" role="alert">
                    <p>
                        The <strong>Payments</strong> page allows you to choose between your registered camps and make a
                        payment through PayPal. You can either pay the deposit or the full amount for the camp at any
                        time.
                    </p>
                    <hr />
                    <p className="mb-0">
                        Use the checkboxes to the left of each camp to select the payments you wish to make.
                    </p>
                </div>
                {this.state.earlyBird && (
                    <div className="alert alert-success" role="alert">
                        <p className="mb-0">Early bird prices are in effect through {this.state.earlyBirdDate}!</p>
                    </div>
                )}
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Deposit</th>
                                <th>Full</th>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Camper</th>
                                <th>Balance</th>
                            </tr>
                        </thead>
                        <tbody>{content}</tbody>
                    </table>
                </div>
                {errors && errors.statusCode === 400 && (
                    <div className="alert alert-danger" role="alert">
                        <h4 className="alert-heading">Waitlisted</h4>
                        <p>{`${errors.message}`}</p>
                        <hr />
                        <p>You are currently on the waitlist and will be notified when a spot becomes available.</p>
                    </div>
                )}
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Total:</h4>
                        <h2 className="card-subtitle">${this.state.total}</h2>
                        <br />
                        <p className="card-text">Click the button below to complete this payment using PayPal.</p>
                        <button id="paypal-button" onClick={this.handlePaypal}>
                            <img src={paypalButton} alt="paypal logo" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default props => (
    <AuthContext.Consumer>{auth => <Payments userId={auth.userId} {...props} />}</AuthContext.Consumer>
);
