import React, { Component } from "react";
import { AuthContext } from "../App";
import appClient from "../appClient";
import paypalButton from "../images/paypal-logo.png";
import "./Payments.css";

class Payments extends Component {
  handlePaypal = e => {
    e.preventDefault();
    appClient
      .addPayment(this.props.userId, {
        paymentAmount: 0.03,
        registrations: ["5bba7130b27c333aef176ec9", "5bc00d1f14533913c39c2fd2"]
      })
      .then(res => {
        res.data.links.forEach(link => {
          if (link.method === "REDIRECT") {
            window.location.href = link.href;
          }
        });
      })
      .catch(err => {
        console.error(err);
      });
  };

  render() {
    return (
      <div>
        <button id="paypal-button" onClick={this.handlePaypal}>
          <img src={paypalButton} alt="paypal logo" />
        </button>
      </div>
    );
  }
}

export default props => (
  <AuthContext.Consumer>
    {auth => <Payments userId={auth.userId} {...props} />}
  </AuthContext.Consumer>
);
