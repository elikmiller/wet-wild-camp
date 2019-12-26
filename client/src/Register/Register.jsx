import React from "react";
import CampRegisterResult from "./CampRegisterResult";
import CampList from "./CampList";
import { Switch, Route } from "react-router-dom";
// Unused when Routes commented out; leaving in in case of revert
// import Schedule from "./Schedule";

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
          path={`${props.match.path}/waitlist`}
          render={props => (
            <CampRegisterResult {...props} status={"waitlist"} />
          )}
        />

        {/* To switch between specifying a camp type and not specifying, comment out/uncomment below routes */}

        {/* <Route exact path={`${props.match.path}/:type`} component={CampList} />
        <Route exact path={props.match.path} component={Schedule} /> */}

        <Route exact path={`${props.match.path}`} component={CampList} />

      </Switch>
    </div>
  );
};

export default Register;
