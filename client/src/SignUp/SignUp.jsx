import React, { Component } from "react";
import SignUpForm from "../forms/SignUpForm";
import { Link } from "react-router-dom";
import Spinner from "../Spinner/Spinner";

class SignUp extends Component {
  state = {
    isLoading: false,
    error: null
  };

  handleOnSignUp = ({ firstName, lastName, email, password }) => {
    this.setState({
      isLoading: true,
      error: null
    });
    this.props
      .onSignUp({ firstName, lastName, email, password })
      .catch(error => {
        this.setState({
          isLoading: false,
          error: error.response.data
        });
      });
  };

  render() {
    return (
      <div
        className="card ml-auto mr-auto mb-3 spinner-wrapper"
        style={{ minWidth: "18rem", maxWidth: "30rem" }}
      >
        {this.state.isLoading && <Spinner />}
        <div className="card-body">
          <h3 className="card-title">Sign Up</h3>
          <SignUpForm onSubmit={this.handleOnSignUp} error={this.state.error} />
          <hr />
          <p>
            Already have an account? <Link to="/">Click here</Link> to login!
          </p>
        </div>
      </div>
    );
  }
}

export default SignUp;
