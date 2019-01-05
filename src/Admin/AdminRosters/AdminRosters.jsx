import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import AdminRosterList from "./AdminRosterList";
import AdminRosterDetail from "./AdminRosterDetail";

class AdminRosters extends Component {
  render() {
    return (
      <Switch>
        <Route
          path={`${this.props.match.path}/:campId`}
          component={AdminRosterDetail}
        />
        <Route path={`${this.props.match.path}`} component={AdminRosterList} />
      </Switch>
    );
  }
}

export default AdminRosters;
