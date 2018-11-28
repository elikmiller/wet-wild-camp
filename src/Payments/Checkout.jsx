import React, { Component } from "react";
import qs from "query-string";
import appClient from "../appClient";

class Checkout extends Component {
  state = {
    paymentId: "",
    payerId: "",
    payment: {}
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
          payment: payment
        });
      })
      .catch(err => {
        console.error(err);
      });
  };

  render() {
    return <p>Success</p>;
  }
}

export default Checkout;
