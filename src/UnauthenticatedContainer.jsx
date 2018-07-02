import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import LoginForm from "./LoginForm.jsx";
import ForgotPasswordForm from "./ForgotPasswordForm.jsx";
import RegisterForm from "./RegisterForm.jsx";

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
            <Route path="/forgot-password" component={ForgotPassword} />
            <Route path="/register" component={Register} />
          </Switch>
          <p className="text-center">
            <a href="terms">Terms of Use</a>
            {"  ⋅  "}
            <a href="help">Help</a>
            {"  ⋅  "}
            <a href="privacy">Privacy Policy</a>
          </p>
        </div>
      </div>
    );
  }
}

function Login(props) {
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
          First time user? <Link to="/register">Sign up here</Link>!
        </p>
      </div>
    </div>
  );
}

function ForgotPassword(props) {
  return (
    <div
      className="card ml-auto mr-auto mb-3"
      style={{ minWidth: "18rem", maxWidth: "30rem" }}
    >
      <div className="card-body">
        <h3 className="card-title">Forgot Password</h3>
        <ForgotPasswordForm />
        <hr />
        <p>
          All set? <Link to="/">Click here</Link> to login!
        </p>
      </div>
    </div>
  );
}

function Register(props) {
  return (
    <div
      className="card ml-auto mr-auto mb-3"
      style={{ minWidth: "18rem", maxWidth: "30rem" }}
    >
      <div className="card-body">
        <h3 className="card-title">Register</h3>
        <RegisterForm />
        <hr />
        <p>
          Already have an account? <Link to="/">Click here</Link> to login!
        </p>
      </div>
    </div>
  );
}

export default UnauthenticatedContainer;
