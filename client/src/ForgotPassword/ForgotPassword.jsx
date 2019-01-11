import React, { Component } from "react";
import { Link } from "react-router-dom";
import ForgotPasswordForm from "../forms/ForgotPasswordForm";
import Spinner from "../Spinner/Spinner";

class ForgotPassword extends Component {
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
      .onForgotPassword(data)
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
          <h3 className="card-title">Forgot Password</h3>
          {this.state.isSuccess && (
            <div className="alert alert-success">
              Instructions to reset your password have been sent to the
              specified email address.
            </div>
          )}
          {this.state.isError && (
            <div className="alert alert-danger">
              Sorry! We were unable to process your request. Please try again
              later.
            </div>
          )}
          <ForgotPasswordForm onSubmit={this.handleOnSubmit} />
          <hr />
          <p>
            All set? <Link to="/">Click here</Link> to login!
          </p>
        </div>
      </div>
    );
  }
}

export default ForgotPassword;
