import React, { Component } from "react";

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValues: {
        "first-name": "",
        "last-name": "",
        email: "",
        password: "",
        "confirm-password": ""
      },
      passwordsMatch: true
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.validatePassword();
    let formValues = this.state.formValues;
    let data = {
      firstName: formValues["first-name"],
      lastName: formValues["last-name"],
      email: formValues["email"],
      password: formValues["password"]
    };

    if (this.state.passwordsMatch) {
      this.props.onSubmit(data);
    }
  }

  handleChange(e) {
    e.preventDefault();
    let formValues = this.state.formValues;
    let id = e.target.id;
    let value = e.target.value;

    formValues[id] = value;
    this.setState({
      formValues: formValues
    });
  }

  validatePassword() {
    if (
      this.state.formValues["password"] !==
      this.state.formValues["confirm-password"]
    ) {
      this.setState({
        passwordsMatch: false
      });
    } else if (!this.state.passwordsMatch) {
      this.setState({
        passwordsMatch: true
      });
    }
  }

  render() {
    return (
      <div className="register-form">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="first-name">First Name</label>
            <input
              className="form-control"
              id="first-name"
              type="text"
              value={this.state.formValues["first-name"]}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="last-name">Last Name</label>
            <input
              className="form-control"
              id="last-name"
              type="text"
              value={this.state.formValues["last-name"]}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">E-mail Address</label>
            <input
              className="form-control"
              id="email"
              type="text"
              value={this.state.formValues["email"]}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              className="form-control"
              id="password"
              type="password"
              value={this.state.formValues["password"]}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              className="form-control"
              id="confirm-password"
              type="password"
              value={this.state.formValues["confirm-password"]}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-primary btn-block" type="submit">
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
