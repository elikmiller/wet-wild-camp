import React, { Component } from "react";
import RegisterForm from "../forms/RegisterForm";
import { Link } from "react-router-dom";

class SignUp extends Component {
  render() {
    return (
      <div
        className="card ml-auto mr-auto mb-3"
        style={{ minWidth: "18rem", maxWidth: "30rem" }}
      >
        <div className="card-body">
          <h3 className="card-title">Sign Up</h3>
          <RegisterForm onSubmit={this.props.onRegister} />
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
