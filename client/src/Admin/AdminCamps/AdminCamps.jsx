import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import AdminCampList from "./AdminCampList";
import AdminCampDetail from "./AdminCampDetail";
import ErrorBoundary from "../../ErrorBoundary/ErrorBoundary";

class AdminCamps extends Component {
  render() {
    return (
      <Switch>
        <Route
          path={`${this.props.match.path}/:campId`}
          render={props => (
            <ErrorBoundary>
              <AdminCampDetail {...props} />
            </ErrorBoundary>
          )}
        />
        <Route
          path={`${this.props.match.path}`}
          render={props => (
            <ErrorBoundary>
              <AdminCampList {...props} />
            </ErrorBoundary>
          )}
        />
      </Switch>
    );
  }
}

export default AdminCamps;
