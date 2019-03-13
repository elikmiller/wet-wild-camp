import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import AdminPaymentList from "./AdminPaymentList";
import AdminPaymentDetail from "./AdminPaymentDetail";
import ErrorBoundary from "../../ErrorBoundary/ErrorBoundary";

class AdminPayments extends Component {
  render() {
    return (
      <Switch>
        <Route
          path={`${this.props.match.path}/:paymentId`}
          render={props => (
            <ErrorBoundary>
              <AdminPaymentDetail {...props} />
            </ErrorBoundary>
          )}
        />
        <Route
          path={`${this.props.match.path}`}
          render={props => (
            <ErrorBoundary>
              <AdminPaymentList {...props} />
            </ErrorBoundary>
          )}
        />
      </Switch>
    );
  }
}

export default AdminPayments;
