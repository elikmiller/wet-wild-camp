import React, { Component } from "react";
import qs from "query-string";
import appClient from "../appClient";

class Checkout extends Component {
  state = {
    paymentId: "",
    payerId: "",
    payment: {},
    executedPayment: {},
    executed: false,
    cancelled: false
  };

  componentDidMount() {
    this.getPaymentData();
  }

  getPaymentData = () => {
    let paymentId = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true
    }).paymentId;
    let payerId = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true
    }).PayerID;
    appClient
      .getPayment(paymentId)
      .then(payment => {
        this.setState({
          paymentId: paymentId,
          payerId: payerId,
          payment: payment.data
        });
      })
      .catch(err => {
        console.error(err);
      });
  };

  executePayment = e => {
    let { paymentId, payerId, payment } = this.state;
    e.preventDefault();
    appClient
      .executePayment(payment.user, paymentId, payerId)
      .then(res => {
        this.setState({
          executedPayment: res.data,
          executed: true
        });
      })
      .catch(err => {
        console.error(err);
      });
  };

  cancelPayment = e => {
    e.preventDefault();
    appClient
      .deletePayment(this.state.paymentId)
      .then(res => {
        this.setState({
          cancelled: true
        });
      })
      .catch(err => {
        console.error(err);
      });
  };

  render() {
    let { executed, cancelled } = this.state;
    return (
      <div className="card">
        <div className="card-header">
          <h3>Checkout</h3>
        </div>
        {!executed && !cancelled && (
          <div className="card-body">
            <h5 className="card-title">Total: ${this.state.payment.amount}</h5>
            <p className="card-text">Confirm or cancel your payment below.</p>
            <button
              className="btn btn-outline-secondary mr-3"
              onClick={this.cancelPayment}
            >
              Cancel Payment
            </button>
            <button className="btn btn-primary" onClick={this.executePayment}>
              Confirm Payment
            </button>
          </div>
        )}
        {executed && (
          <div className="card-body">
            <div className="alert alert-primary" role="alert">
              Your payment has been successfully completed!
            </div>
          </div>
        )}
        {cancelled && (
          <div className="card-body">
            <div className="alert alert-info" role="alert">
              Your payment has been cancelled.
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Checkout;
