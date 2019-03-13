import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import AdminUserList from "./AdminUserList";
import AdminUserDetail from "./AdminUserDetail";
import ErrorBoundary from "../../ErrorBoundary/ErrorBoundary";

class AdminUsers extends Component {
  render() {
    return (
      <div className="admin-users">
        <Switch>
          <Route
            path={`${this.props.match.path}/:userId`}
            render={props => (
              <ErrorBoundary>
                <AdminUserDetail {...props} />
              </ErrorBoundary>
            )}
          />
          <Route
            path={`${this.props.match.path}`}
            render={props => (
              <ErrorBoundary>
                <AdminUserList {...props} />
              </ErrorBoundary>
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default AdminUsers;
