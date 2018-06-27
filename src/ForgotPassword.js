import React, { Component } from "react";
import "./App.css";

class ForgotPassword extends Component {
  render() {
    return (
      <div className="forgot-password">
        <p className="lead">Forgot Password</p>
        <form>
          <div className="form-group">
            <label htmlFor="email">E-mail Address</label>
            <input className="form-control" id="email" type="text" />
          </div>
          <div className="form-group">
            <button className="btn btn-primary btn-block" type="button">
              Submit
            </button>
          </div>
        </form>
        <hr />
        <p>
          All set? <a href="/login">Click here</a> to login!
        </p>
      </div>
    );
  }
}

export default ForgotPassword;
