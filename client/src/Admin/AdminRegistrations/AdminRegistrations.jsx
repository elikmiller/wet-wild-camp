import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import AdminRegistrationList from "./AdminRegistrationList";
import AdminRegistrationDetail from "./AdminRegistrationDetail";
import ErrorBoundary from "../../ErrorBoundary/ErrorBoundary";

class AdminRegistrations extends Component {
  render() {
    return (
      <div className="admin-users">
        <Switch>
          <Route
            path={`${this.props.match.path}/:registrationId`}
            render={props => (
              <ErrorBoundary>
                <AdminRegistrationDetail {...props} />
              </ErrorBoundary>
            )}
          />
          <Route
            path={`${this.props.match.path}`}
            render={props => (
              <ErrorBoundary>
                <AdminRegistrationList {...props} />
              </ErrorBoundary>
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default AdminRegistrations;
