import React, { Component } from "react";
import { Link } from "react-router-dom";
import UnauthenticatedContainer from "./containers/UnauthenticatedContainer.jsx";
import AuthenticatedContainer from "./containers/AuthenticatedContainer.jsx";

class Home extends Component {
  render() {
    return (
      <div className="home">
        <nav className="navbar navbar-light bg-light mb-3">
          <Link className="navbar-brand" to="/">
            React Playground
          </Link>
          {this.props.authenticated && (
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" onClick={this.props.onLogout} href="/">
                  Logout
                </a>
              </li>
            </ul>
          )}
        </nav>
        {!this.props.authenticated && (
          <UnauthenticatedContainer onLogin={this.props.onLogin} />
        )}
        {this.props.authenticated && (
          <AuthenticatedContainer onLogout={this.props.onLogout} />
        )}
      </div>
    );
  }
}

export default Home;
