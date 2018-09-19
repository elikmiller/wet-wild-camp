import React, { Component } from "react";
import SideNav from "../SideNav.jsx";
import Overview from "../Overview.jsx";
import Campers from "../Campers/Campers.jsx";
import Schedule from "../Schedule.jsx";
import ContactInformation from "../ContactInformation/ContactInformation.jsx";
import Payments from "../Payments.jsx";
import { Route, Switch } from "react-router-dom";
import { UserContext } from "../App.jsx";

class AuthenticatedContainer extends Component {
  navs = [
    { path: "/", label: "Overview", component: Overview },
    { path: "/campers", label: "Campers", component: Campers },
    { path: "/schedule", label: "Camp Schedule", component: Schedule },
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
              <UserContext.Consumer>
                {id => (
                  <Switch>
                    <Route
                      exact
                      path="/"
                      render={props => <Overview {...props} userId={id} />}
                    />
                    <Route
                      path="/campers"
                      render={props => <Campers {...props} userId={id} />}
                    />
                    <Route
                      path="/schedule"
                      render={props => <Schedule {...props} userId={id} />}
                    />
                    <Route
                      path="/contactinformation"
                      render={props => (
                        <ContactInformation {...props} userId={id} />
                      )}
                    />
                    <Route
                      path="/payments"
                      render={props => <Payments {...props} userId={id} />}
                    />
                  </Switch>
                )}
              </UserContext.Consumer>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AuthenticatedContainer;
