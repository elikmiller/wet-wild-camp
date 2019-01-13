import React, { Component } from "react";
import { Link, Route, Switch, Redirect } from "react-router-dom";
import LoginForm from "../forms/LoginForm.jsx";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import ResetPassword from "../ResetPassword/ResetPassword";
import SignUp from "../SignUp/SignUp";

class UnauthenticatedContainer extends Component {
  render() {
    return (
      <div className="unauthenticated-container">
        <div className="container">
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <Login onLogin={this.props.onLogin} {...props} />
              )}
            />
            <Route
              path="/forgot-password"
              render={props => (
                <ForgotPassword
                  onForgotPassword={this.props.onForgotPassword}
                  {...props}
                />
              )}
            />
            <Route
              path="/signup"
              render={props => (
                <SignUp onSignUp={this.props.onSignUp} {...props} />
              )}
            />
            <Route
              path="/reset-password"
              render={props => (
                <ResetPassword
                  onResetPassword={this.props.onResetPassword}
                  {...props}
                />
              )}
            />
            <Route path="/*" render={() => <Redirect to="/" />} />
          </Switch>
          <p className="text-center">
            Tip:{" "}
            <em>
              We recommend you use the latest version of{" "}
              <a
                href="https://www.google.com/chrome/"
                target="_blank"
                rel="noopener noreferrer"
                className="alert-link"
              >
                Google Chrome
              </a>{" "}
              or{" "}
              <a
                href="https://www.mozilla.org/en-US/firefox/new/"
                target="_blank"
                rel="noopener noreferrer"
                className="alert-link"
              >
                Mozilla Firefox
              </a>{" "}
              for the best user experience.
            </em>
          </p>
          {/* <p className="text-center">
            <a href="/terms">Terms of Use</a>
            {"  ⋅  "}
            <a href="/help">Help</a>
            {"  ⋅  "}
            <a href="/privacy">Privacy Policy</a>
          </p> */}
        </div>
      </div>
    );
  }
}

export const Login = props => {
  return (
    <div
      className="card ml-auto mr-auto mb-3"
      style={{ minWidth: "18rem", maxWidth: "30rem" }}
    >
      <div className="card-body">
        <h3 className="card-title">Login</h3>
        <LoginForm onSubmit={props.onLogin} />
        <hr />
        <p>
          First time user? <Link to="/signup">Sign up here</Link>!
        </p>
      </div>
    </div>
  );
};

export default UnauthenticatedContainer;
