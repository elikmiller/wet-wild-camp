import React, { Component } from "react";
import SideNav from "../SideNav/SideNav";
import MainMenu from "../SideNav/MainMenu";
import OverviewContainerWrapper from "../Overview/OverviewContainerWrapper";
import CampersContainerWrapper from "../Campers/CampersContainerWrapper";
import Register from "../Register/Register";
import ContactInformationContainerWrapper from "../ContactInformation/ContactInformationContainerWrapper";
import Payments from "../Payments/Payments";
import Checkout from "../Payments/Checkout";
import Logout from "../Logout/Logout";
import AdminRegistrations from "../Admin/AdminRegistrations/AdminRegistrations";
import AdminUsers from "../Admin/AdminUsers/AdminUsers";
import AdminUserFull from "../Admin/AdminUsers/AdminUserFull";
import AdminCampers from "../Admin/AdminCampers/AdminCampers";
import AdminCamps from "../Admin/AdminCamps/AdminCamps";
import AdminRosters from "../Admin/AdminRosters/AdminRosters";
import AdminPayments from "../Admin/AdminPayments/AdminPayments";
import { Route, Switch, Redirect } from "react-router-dom";

class AuthenticatedContainer extends Component {
  navs = [
    {
      path: "/overview",
      label: "Overview",
      component: OverviewContainerWrapper
    },
    { path: "/campers", label: "Campers", component: CampersContainerWrapper },
    { path: "/register", label: "Register", component: Register },
    {
      path: "/contact-information",
      label: "Contact Information",
      component: ContactInformationContainerWrapper
    },
    { path: "/payments", label: "Payments", component: Payments }
  ];

  adminNavs = [
    {
      path: "/admin/registrations",
      label: "Registrations",
      component: AdminRegistrations
    },
    { path: "/admin/users", label: "Users", component: AdminUsers },
    { path: "/admin/campers", label: "Campers", component: AdminCampers },
    {
      path: "/admin/camps",
      label: "Camps",
      component: AdminCamps
    },
    {
      path: "/admin/rosters",
      label: "Rosters",
      component: AdminRosters
    },
    { path: "/admin/payments", label: "Payments", component: AdminPayments }
  ];

  render() {
    let navBarData = this.props.isAdmin ? this.adminNavs : this.navs;
    return (
      <div className="authenticated-container flex-grow-1">
        <div className="container-fluid">
          <div className="row">
            <div className=".d-xl-none col-12">
              <MainMenu navs={navBarData} onLogout={this.props.onLogout} />
            </div>
            <div className="d-none d-xl-block col-xl-2">
              <SideNav navs={navBarData} onLogout={this.props.onLogout} />
            </div>
            <div className="col-xl-10 col-12 mb-5">
              <Switch>
                <Route path="/reset-password" exact component={Logout} />
                {!this.props.isAdmin && (
                  <Route
                    path="/"
                    exact
                    render={() => <Redirect to="/overview" />}
                  />
                )}
                {this.props.isAdmin && (
                  <Route
                    path="/"
                    exact
                    render={() => <Redirect to="/admin/registrations" />}
                  />
                )}
                <Route path="/payments/success" component={Checkout} />
                {this.props.isAdmin && (
                  <Route
                    path="/admin/users/:userId"
                    component={AdminUserFull}
                  />
                )}
                {navBarData.map(nav => (
                  <Route
                    key={nav.label}
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
