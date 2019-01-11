import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import AdminCampList from "./AdminCampList";
import AdminCampDetail from "./AdminCampDetail";

class AdminCamps extends Component {
  render() {
    return (
      <Switch>
        <Route
          path={`${this.props.match.path}/:campId`}
          component={AdminCampDetail}
        />
        <Route path={`${this.props.match.path}`} component={AdminCampList} />
      </Switch>
    );
  }
}

export default AdminCamps;
