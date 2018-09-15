import React, { Component } from "react";
import { Link } from "react-router-dom";
import UnauthenticatedContainer from "./containers/UnauthenticatedContainer.jsx";
import AuthenticatedContainer from "./containers/AuthenticatedContainer.jsx";
import axios from "axios";

class Home extends Component {
  state = {
    authenticated: false,
    user: {
      firstName: "",
      lastName: "",
      email: ""
    }
  };

  login = ({ email, password }) => {
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/login`,
        { email, password },
        { withCredentials: true }
      )
      .then(res => {
        console.log(res);
        this.setState({
          authenticated: true
        });
      })
      .catch(err => {
        this.setState({ authenticated: false });
      });
  };

  logout = () => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/logout`,
        {},
        { withCredentials: true }
      )
      .then(res => {
        this.setState({ authenticated: false });
      });
  };

  currentUser = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/current_user`, {
        withCredentials: true
      })
      .then(res => {
        this.setState({
          authenticated: true,
          user: res.user
        });
      })
      .catch(err => {
        this.setState({ authenticated: false });
      });
  };

  componentDidMount() {
    this.currentUser();
  }

  render() {
    return (
      <div className="home">
        <nav className="navbar navbar-light bg-light mb-3">
          <Link className="navbar-brand" to="/">
            React Playground
          </Link>
          {this.state.authenticated && (
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" onClick={this.logout} href="/">
                  Logout
                </a>
              </li>
            </ul>
          )}
        </nav>
        {!this.state.authenticated && (
          <UnauthenticatedContainer onLogin={this.login} />
        )}
        {this.state.authenticated && (
          <AuthenticatedContainer onLogout={this.logout} />
        )}
      </div>
    );
  }
}

export default Home;
