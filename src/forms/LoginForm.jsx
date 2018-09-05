import React, { Component } from "react";
import { Link } from "react-router-dom";

class LoginForm extends Component {
  render() {
    return (
      <div className="login-form">
        <form onSubmit={this.props.onSubmit}>
          <div className="form-group">
            <label htmlFor="email">E-mail Address</label>
            <input className="form-control" id="email" type="text" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input className="form-control" id="password" type="password" />
            <small className="form-text">
              <Link to="/forgot-password">Forgot password?</Link>
            </small>
          </div>
          <div className="form-group">
            <button className="btn btn-primary btn-block" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default LoginForm;
