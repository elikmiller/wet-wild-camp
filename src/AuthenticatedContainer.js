import React, { Component } from "react";
import SideNav from "./SideNav";
import { Route, Switch } from "react-router-dom";

class AuthenticatedContainer extends Component {
  navs = [
    { path: "/", label: "Overview" },
    { path: "/campers", label: "Campers" },
    { path: "/schedule", label: "Camp Schedule" },
    { path: "/contact-information", label: "Update Contact Information" },
    { path: "/payments", label: "Payments" }
  ];

  render() {
    return (
      <div className="authenticated-container">
        <div className="container-fluid">
          <div className="row">
            <div className="col-2">
              <SideNav navs={this.navs} onLogout={this.props.onLogout} />
            </div>
            <div className="col-10">
              <Switch>
                {this.navs.map(nav => (
                  <Route
                    exact
                    path={nav.path}
                    render={() => <div>{nav.label}</div>}
                  />
                ))}
              </Switch>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AuthenticatedContainer;
