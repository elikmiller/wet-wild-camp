import React, { Component } from "react";
import "./App.css";

class Login extends Component {
  render() {
    return (
      <div className="login">
        <p className="lead">Login</p>
        <form>
          <div className="form-group">
            <label htmlFor="email">E-mail Address</label>
            <input className="form-control" id="email" type="text" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input className="form-control" id="password" type="password" />
            <small className="form-text text-muted">
              Forgot your password? <a href="/reset">Click here</a> to reset it.
            </small>
          </div>
          <div className="form-group">
            <button className="btn btn-primary btn-block" type="button">
              Login
            </button>
          </div>
        </form>
        <hr />
        <p>
          Are you a first time user? <a href="/register">Click here</a> to
          register!
        </p>
      </div>
    );
  }
}

export default Login;
