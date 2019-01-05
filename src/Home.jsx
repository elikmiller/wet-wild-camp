import React, { Component } from "react";
import { Link } from "react-router-dom";
import UnauthenticatedContainer from "./containers/UnauthenticatedContainer.jsx";
import AuthenticatedContainer from "./containers/AuthenticatedContainer.jsx";
import appClient from "./appClient";

class Home extends Component {
  unlisten = () => {};

  handleLogin = data => {
    return this.props.onLogin(data).then(() => {
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

  componentDidMount() {
    // Check session is valid on route change
    this.unlisten = this.props.history.listen((location, action) => {
      if (this.props.location.pathname !== location.pathname) {
        appClient.currentUser().catch(() => {
          if (this.props.authenticated) this.handleLogout();
        });
      }
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  render() {
    return (
      <div className="home h-100 d-flex flex-column">
        <nav className="navbar navbar-light bg-light mb-3 flex-shrink-0">
          <Link className="navbar-brand" to="/">
            Wet &amp; Wild Camp Registration
            {this.props.isAdmin ? " | Admin Panel" : ""}
          </Link>
          {this.props.authenticated && (
            <ul className="navbar-nav d-none d-sm-block">
              <li className="nav-item">
                <button
                  className="btn btn-link nav-link"
                  onClick={this.handleLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          )}
        </nav>
        {!this.props.authenticated && (
          <UnauthenticatedContainer
            onLogin={this.handleLogin}
            onRegister={this.handleRegister}
            onForgotPassword={this.props.onForgotPassword}
            onResetPassword={this.props.onResetPassword}
          />
        )}
        {this.props.authenticated && (
          <AuthenticatedContainer
            onLogout={this.handleLogout}
            isAdmin={this.props.isAdmin}
          />
        )}
      </div>
    );
  }
}

export default Home;
