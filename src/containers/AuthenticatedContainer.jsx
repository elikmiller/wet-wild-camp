import React, { Component } from "react";
import SideNav from "../SideNav.jsx";
import Overview from "../Overview/Overview.jsx";
import Campers from "../Campers/Campers.jsx";
import Schedule from "../Schedule/Schedule.jsx";
import ContactInformation from "../ContactInformation/ContactInformation.jsx";
import Payments from "../Payments.jsx";
import { Route, Switch } from "react-router-dom";

class AuthenticatedContainer extends Component {
  navs = [
    { path: "/", label: "Overview", component: Overview },
    { path: "/campers", label: "Campers", component: Campers },
    { path: "/schedule", label: "Register", component: Schedule },
    {
      path: "/contact-information",
      label: "Update Contact Information",
      component: ContactInformation
    },
    { path: "/payments", label: "Payments", component: Payments }
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
                    key={nav.label}
                    exact
                    path={nav.path}
                    component={nav.component}
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
