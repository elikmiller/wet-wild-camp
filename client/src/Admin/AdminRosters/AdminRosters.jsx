import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import AdminRosterList from "./AdminRosterList";
import AdminRosterDetail from "./AdminRosterDetail";
import AdminRosterSwimming from "./AdminRosterSwimming";
import ErrorBoundary from "../../ErrorBoundary/ErrorBoundary";

class AdminRosters extends Component {
  render() {
    return (
      <Switch>
        <Route
          path={`${this.props.match.path}/:campId/swimming`}
          render={props => (
            <ErrorBoundary>
              <AdminRosterSwimming {...props} />
            </ErrorBoundary>
          )}
        />
        <Route
          path={`${this.props.match.path}/:campId`}
          render={props => (
            <ErrorBoundary>
              <AdminRosterDetail {...props} />
            </ErrorBoundary>
          )}
        />
        <Route
          path={`${this.props.match.path}`}
          render={props => (
            <ErrorBoundary>
              <AdminRosterList {...props} />
            </ErrorBoundary>
          )}
        />
      </Switch>
    );
  }
}

export default AdminRosters;
