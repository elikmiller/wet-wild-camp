import React from "react";
import CampRegisterFormWrapper from "./CampRegisterFormWrapper";
import CampRegisterResult from "./CampRegisterResult";
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
        <Route
          exact
          path={`${props.match.path}/cancelled`}
          render={props => (
            <CampRegisterResult {...props} status={"cancelled"} />
          )}
        />
        <Route
          exact
          path={`${props.match.path}/:campId`}
          component={CampRegisterFormWrapper}
        />
        <Route exact path={props.match.path} component={Schedule} />
      </Switch>
    </div>
  );
};

export default Register;
