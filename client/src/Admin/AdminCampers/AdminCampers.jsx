import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import AdminCamperList from "./AdminCamperList";
import AdminCamperDetail from "./AdminCamperDetail";
import ErrorBoundary from "../../ErrorBoundary/ErrorBoundary";

class AdminCampers extends Component {
  render() {
    return (
      <div className="admin-campers">
        <Switch>
          <Route
            path={`${this.props.match.path}/:camperId`}
            render={props => (
              <ErrorBoundary>
                <AdminCamperDetail {...props} />
              </ErrorBoundary>
            )}
          />
          <Route
            path={`${this.props.match.path}`}
            render={props => (
              <ErrorBoundary>
                <AdminCamperList {...props} />
              </ErrorBoundary>
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default AdminCampers;
