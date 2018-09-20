import React, { Component } from "react";
import { Link } from "react-router-dom";
import UnauthenticatedContainer from "./containers/UnauthenticatedContainer.jsx";
import AuthenticatedContainer from "./containers/AuthenticatedContainer.jsx";

class Home extends Component {
  handleLogin = data => {
    this.props.onLogin(data).then(() => {
      this.props.history.push("/");
    });
  };

  handleLogout = () => {
    this.props.onLogout().then(() => {
      this.props.history.push("/");
    });
  };

  handleRegister = data => {
    this.props.onRegister(data).then(() => {
      this.props.history.push("/");
    });
  };

  render() {
    return (
      <div className="home">
        <nav className="navbar navbar-light bg-light mb-3">
          <Link className="navbar-brand" to="/">
            Wet &amp; Wild Camp Registration
          </Link>
          {this.props.authenticated && (
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" onClick={this.handleLogout}>
                  Logout
                </a>
              </li>
            </ul>
          )}
        </nav>
        {!this.props.authenticated && (
          <UnauthenticatedContainer
            onLogin={this.handleLogin}
            onRegister={this.handleRegister}
          />
        )}
        {this.props.authenticated && (
          <AuthenticatedContainer onLogout={this.handleLogout} />
        )}
      </div>
    );
  }
}

export default Home;
