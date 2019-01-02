import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import AdminCampList from "./AdminCampList";
import AdminCampDetails from "./AdminCampDetails";

class AdminCamps extends Component {
  render() {
    console.log(this.props.match);
    return (
      <Switch>
        <Route
          path={`${this.props.match.path}/:campId`}
          component={AdminCampDetails}
        />
        <Route path={`${this.props.match.path}`} component={AdminCampList} />
      </Switch>
    );
  }
}

export default AdminCamps;
