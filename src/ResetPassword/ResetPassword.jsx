import React, { Component } from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";
import ResetPasswordForm from "../forms/ResetPasswordForm";
import Spinner from "../Spinner/Spinner";

class ResetPassword extends Component {
  state = {
    isLoading: false,
    isSuccess: false,
    isError: false
  };

  handleOnSubmit = data => {
    this.setState({
      isLoading: true,
      isSuccess: false,
      isError: false
    });
    this.props
      .onResetPassword(data)
      .then(() => {
        this.setState({
          isLoading: false,
          isSuccess: true
        });
      })
      .catch(() => {
        this.setState({
          isLoading: false,
          isError: true
        });
      });
  };

  render() {
    return (
      <div
        className="card ml-auto mr-auto mb-3"
        style={{ minWidth: "18rem", maxWidth: "30rem" }}
      >
        <div className="card-body position-relative">
          {this.state.isLoading && <Spinner />}
          <h3 className="card-title">Reset Password</h3>
          {this.state.isSuccess && (
            <div className="alert alert-success">
              Your password has been successfully reset. Please{" "}
              <Link to="/">click here</Link> to log in.
            </div>
          )}
          {this.state.isError && (
            <div className="alert alert-danger">
              Sorry! We were unable to process your request. Please try again
              later.
            </div>
          )}
          <ResetPasswordForm
            onSubmit={this.handleOnSubmit}
            token={queryString.parse(this.props.location.search).token}
          />
        </div>
      </div>
    );
  }
}

export default ResetPassword;
