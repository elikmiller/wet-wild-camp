import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import AdminCamperList from "./AdminCamperList";
import AdminCamperDetail from "./AdminCamperDetail";

class AdminRosters extends Component {
  render() {
    return (
      <Switch>
        <Route
          path={`${this.props.match.path}/:camperId`}
          component={AdminCamperDetail}
        />
        <Route path={`${this.props.match.path}`} component={AdminCamperList} />
      </Switch>
    );
  }
}

export default AdminRosters;
