import React, { Component } from "react";

class ForgotPasswordForm extends Component {
  render() {
    return (
      <div className="forgot-password">
        <form onSubmit={this.props.onSubmit}>
          <div className="form-group">
            <label htmlFor="email">E-mail Address</label>
            <input className="form-control" id="email" type="text" />
          </div>
          <div className="form-group">
            <button className="btn btn-primary btn-block" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default ForgotPasswordForm;
