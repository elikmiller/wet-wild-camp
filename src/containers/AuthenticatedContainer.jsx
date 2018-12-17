import React, { Component } from "react";
import SideNav from "../SideNav.jsx";
import OverviewContainerWrapper from "../Overview/OverviewContainerWrapper.jsx";
import CampersContainerWrapper from "../Campers/CampersContainerWrapper.jsx";
import Schedule from "../Schedule/Schedule.jsx";
import CampRegisterFormWrapper from "../Schedule/CampRegisterFormWrapper";
import CampRegisterResult from "../Schedule/CampRegisterResult";
import ContactInformationContainerWrapper from "../ContactInformation/ContactInformationContainerWrapper.jsx";
import Payments from "../Payments/Payments.jsx";
import Checkout from "../Payments/Checkout.jsx";
import AdminRegistrations from "../Admin/AdminRegistrations/AdminRegistrations.jsx";
import AdminUsers from "../Admin/AdminUsers/AdminUsers.jsx";
import AdminUserFull from "../Admin/AdminUsers/AdminUserFull.jsx";
import AdminCampers from "../Admin/AdminCampers/AdminCampers";
import AdminCamperFull from "../Admin/AdminCampers/AdminCamperFull";
import AdminSessions from "../Admin/AdminSessions/AdminSessions.jsx";
import AdminSessionFull from "../Admin/AdminSessions/AdminSessionFull.jsx";
import AdminSessionRoster from "../Admin/AdminSessions/AdminSessionRoster";
import AdminPayments from "../Admin/AdminPayments/AdminPayments.jsx";
import { Route, Switch } from "react-router-dom";

class AuthenticatedContainer extends Component {
  navs = [
    { path: "/", label: "Overview", component: OverviewContainerWrapper },
    { path: "/campers", label: "Campers", component: CampersContainerWrapper },
    { path: "/schedule", label: "Register", component: Schedule },
    {
      path: "/contact-information",
      label: "Contact Information",
      component: ContactInformationContainerWrapper
    },
    { path: "/payments", label: "Payments", component: Payments }
  ];

  adminNavs = [
    { path: "/admin", label: "Registrations", component: AdminRegistrations },
    { path: "/admin/users", label: "Users", component: AdminUsers },
    { path: "/admin/campers", label: "Campers", component: AdminCampers },
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
      <div className="authenticated-container flex-grow-1">
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
                <Route path="/payments/success" component={Checkout} />
                {this.props.isAdmin && (
                  <Route
                    path="/admin/sessions/:sessionId"
                    component={AdminSessionFull}
                  />
                )}
                {this.props.isAdmin && (
                  <Route
                    path="/admin/users/:userId"
                    component={AdminUserFull}
                  />
                )}
                {this.props.isAdmin && (
                  <Route
                    path="/admin/campers/:camperId"
                    component={AdminCamperFull}
                  />
                )}
                {this.props.isAdmin && (
                  <Route
                    path="/admin/rosters/:campId"
                    component={AdminSessionRoster}
                  />
                )}
                <Route
                  exact
                  path="/schedule/:campId"
                  component={CampRegisterFormWrapper}
                />
                <Route
                  exact
                  path="/schedule/0/:status"
                  component={CampRegisterResult}
                />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AuthenticatedContainer;
