import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValues: {
        email: '',
        password: ''
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit(e) {
    e.preventDefault();
    let formValues = this.state.formValues;
    let data = {
      email: formValues['email'],
      password: formValues['password']
    };
    // Sends form data to Home component
    this.props.onSubmit(data);
  }

  render() {
    return (
      <div className="login-form">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">E-mail Address</label>
            <input className="form-control" id="email" type="text" onChange={this.handleChange} value={this.state.email} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input className="form-control" id="password" type="password" onChange={this.handleChange} value={this.state.password} />
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
