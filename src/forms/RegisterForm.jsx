import React, { Component } from "react";

class RegisterForm extends Component {
  render() {
    return (
      <div className="register-form">
        <form>
          <div className="form-group">
            <label htmlFor="first-name">First Name</label>
            <input className="form-control" id="first-name" type="text" />
          </div>
          <div className="form-group">
            <label htmlFor="last-name">Last Name</label>
            <input className="form-control" id="last-name" type="text" />
          </div>
          <div className="form-group">
            <label htmlFor="email">E-mail Address</label>
            <input className="form-control" id="email" type="text" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input className="form-control" id="password" type="password" />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              className="form-control"
              id="confirm-password"
              type="password"
            />
          </div>
          <div className="form-group">
            <button className="btn btn-primary btn-block" type="button">
              Register
            </button>
            <small className="form-text text-muted">
              By clicking Register, you agree to our{" "}
              <a href="/terms">Terms and Conditions</a> &amp;{" "}
              <a href="/privacy">Privacy Policy</a>.
            </small>
          </div>
        </form>
      </div>
    );
  }
}

export default RegisterForm;
