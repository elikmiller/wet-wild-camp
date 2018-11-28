import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Payments from "./Payments";
import Checkout from "./Checkout";

class PaymentRouter extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/payments" component={Payments} />
        <Route path="/payments/success" component={Checkout} />
      </Switch>
    );
  }
}

export default PaymentRouter;
