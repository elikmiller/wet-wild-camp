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
    errors: {}
  };

  componentDidMount() {
    this.updateRegistrations();
  }

  // Gets all unpaid registrations for the current user and adds them to state
  updateRegistrations = () => {
    this.setState({
      isLoading: true,
      errors: {}
    });
    appClient
      .getUserRegistrations(this.props.userId)
      .then(res => {
        let unpaidRegistrations = [];
        res.data.forEach(registration => {
          if (!registration.paid) unpaidRegistrations.push(registration);
        });
        let earlyBird = this.isEarlyBird();
        this.setState({
          registrations: unpaidRegistrations,
          earlyBird: earlyBird,
          isLoading: false
        });
      })
      .catch(err => {
        this.setState({
          isLoading: false
        });
        if (err.response.status === 500) {
          this.setState({ errors: { server: "Server error." } });
        }
      });
  };

  isEarlyBird = () => {
    let currentDate = moment();
    let earlyBirdCutoff = moment("05/01/2019", "MM/DD/YYYY");
    return currentDate.isBefore(earlyBirdCutoff);
  };

  // calls POST payment route, gets the redirect route from the returned data,
  // and redirects the browser to PayPal's checkout flow
  handlePaypal = e => {
    e.preventDefault();
    let fullPaymentIds = this.state.fullPayments.map(reg => {
      return reg._id;
    });
    let depositIds = this.state.deposits.map(reg => {
      return reg._id;
    });
    appClient
      .addPayment(this.props.userId, {
        paymentAmount: this.state.total,
        deposits: depositIds,
        fullPayments: fullPaymentIds
      })
      .then(res => {
        res.data.links.forEach(link => {
          if (link.method === "REDIRECT") {
            window.location.href = link.href;
          }
        });
      })
      .catch(err => {
        if (err.response.status === 500) {
          this.setState({ errors: { server: "Server error." } });
        }
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
      if (this.state.earlyBird) total = total - 30;
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
    // Generates the list of registrations with checkboxes
    let content = this.state.registrations.map((reg, i) => {
      let total = reg.camp.fee;
      if (reg.deposit) total = total - 100;
      if (this.state.earlyBird) total = total - 30;
      return (
        <tr key={i}>
          <td>
            {!reg.deposit && (
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
            {reg.deposit && <span className="badge badge-success">Paid</span>}
          </td>
          <td>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="full"
                onChange={this.handleChange}
                value={JSON.stringify(reg)}
              />
            </div>
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
    if (this.state.isLoading) return <Spinner />;
    return (
      <div className="wrapper payments-wrapper">
        {this.state.errors.server && <ServerError />}
        <div className="alert alert-dark" role="alert">
          <p>
            The <strong>Payments</strong> page allows you to choose between your
            registered camps and make a payment through PayPal. You can either
            pay the deposit or the full amount for the camp at any time.
          </p>
          <hr />
          <p className="mb-0">
            Use the checkboxes to the left of each camp to select the payments
            you wish to make.
          </p>
        </div>
        {this.state.earlyBird && (
          <div className="alert alert-success" role="alert">
            <p className="mb-0">
              Early bird prices are in effect through May 1st!
            </p>
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
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Total:</h4>
            <h2 className="card-subtitle">${this.state.total}</h2>
            <br />
            <p className="card-text">
              Click the button below to complete this payment using PayPal.
            </p>
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
  <AuthContext.Consumer>
    {auth => <Payments userId={auth.userId} {...props} />}
  </AuthContext.Consumer>
);
