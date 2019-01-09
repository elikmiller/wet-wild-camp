import React, { Component } from "react";
import RegisterForm from "../forms/RegisterForm";
import { Link } from "react-router-dom";
import Spinner from "../Spinner/Spinner";

class SignUp extends Component {
  state = {
    isLoading: false,
    error: null
  };

  handleOnRegister = ({ firstName, lastName, email, password }) => {
    this.setState({
      isLoading: true,
      error: null
    });
    this.props
      .onRegister({ firstName, lastName, email, password })
      .catch(error => {
        this.setState({
          isLoading: false,
          error: error.data
        });
      });
  };

  render() {
    console.log(this.state);
    return (
      <div
        className="card ml-auto mr-auto mb-3 spinner-wrapper"
        style={{ minWidth: "18rem", maxWidth: "30rem" }}
      >
        {this.state.isLoading && <Spinner />}
        <div className="card-body">
          <h3 className="card-title">Sign Up</h3>
          <RegisterForm onSubmit={this.handleOnRegister} />
          {this.state.error && (
            <p className="text-danger">{this.state.error.errorMessage}</p>
          )}
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
