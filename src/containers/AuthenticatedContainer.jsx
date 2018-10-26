import React, { Component } from "react";
import SideNav from "../SideNav.jsx";
import Overview from "../Overview/Overview.jsx";
import Campers from "../Campers/Campers.jsx";
import Schedule from "../Schedule/Schedule.jsx";
import ContactInformation from "../ContactInformation/ContactInformation.jsx";
import Payments from "../Payments.jsx";
import AdminRegistrations from "../Admin/AdminRegistrations/AdminRegistrations.jsx";
import AdminUsers from "../Admin/AdminUsers/AdminUsers.jsx";
import AdminSessions from "../Admin/AdminSessions/AdminSessions.jsx";
import AdminSessionFull from "../Admin/AdminSessions/AdminSessionFull.jsx";
import AdminPayments from "../Admin/AdminPayments.jsx";
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

  adminNavs = [
    { path: "/admin", label: "Registrations", component: AdminRegistrations },
    { path: "/admin/users", label: "Users", component: AdminUsers },
    {
      path: "/admin/sessions",
      label: "Camp Sessions",
      component: AdminSessions
    },
    { path: "/admin/payments", label: "Payments", component: AdminPayments }
  ];

  render() {
    let navBarData = this.props.isAdmin ? this.adminNavs : this.navs;
    return (
      <div className="authenticated-container">
        <div className="container-fluid">
          <div className="row">
            <div className="col-2">
              <SideNav navs={navBarData} onLogout={this.props.onLogout} />
            </div>
            <div className="col-10">
              <Switch>
                {navBarData.map(nav => (
                  <Route
                    key={nav.label}
                    exact
                    path={nav.path}
                    component={nav.component}
                  />
                ))}
                {this.props.isAdmin && (
                  <Route
                    path="/admin/sessions/:sessionId"
                    component={AdminSessionFull}
                  />
                )}
              </Switch>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AuthenticatedContainer;
