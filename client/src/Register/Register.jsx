import React from "react";
import CampRegisterResult from "./CampRegisterResult";
import CampList from "./CampList";
import { Switch, Route } from "react-router-dom";
import Schedule from "./Schedule";

const Register = props => {
  return (
    <div className="wrapper contact-information-container-wrapper">
      <Switch>
        <Route
          exact
          path={`${props.match.path}/success`}
          render={props => <CampRegisterResult {...props} status={"success"} />}
        />

        <Route exact path={`${props.match.path}/:type`} component={CampList} />
        <Route exact path={props.match.path} component={Schedule} />
      </Switch>
    </div>
  );
};

export default Register;
