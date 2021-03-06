import React, { Component } from "react";
import { Link } from "react-router-dom";
import UnauthenticatedContainer from "../UnauthenticatedContainer/UnauthenticatedContainer";
import AuthenticatedContainer from "../AuthenticatedContainer/AuthenticatedContainer";
import appClient from "../appClient";
import moment from "moment";

class Home extends Component {
  unlisten = () => {};

  handleLogin = data => {
    return this.props.onLogin(data).then(() => {
      this.props.history.push("/");
    });
  };

  handleLogout = () => {
    return this.props.onLogout().then(() => {
      this.props.history.push("/");
    });
  };

  handleSignUp = data => {
    return this.props.onSignUp(data).then(() => {
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
        {!window.Modernizr.cookies && (
          <div className="alert alert-danger mx-auto">
            This application requires <strong>cookies</strong> for
            authentication. Please enable cookies for this domain and refresh
            this page in order to proceed.
          </div>
        )}
        <div className="flex-grow-1">
          {!this.props.authenticated && (
            <UnauthenticatedContainer
              onLogin={this.handleLogin}
              onSignUp={this.handleSignUp}
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
        <div className="flex-shrink-0 text-right px-3 py-3 bg-light text-muted">
          <div className="text-nowrap">
            &copy; {moment().format("YYYY")}{" "}
            <a
              href="https://wetwildcamp.com"
              className="text-dark"
              target="_blank"
              rel="noopener noreferrer"
            >
              Wet &amp; Wild Adventure Camp
            </a>
          </div>
          <div className="text-nowrap">
            Website by{" "}
            <a
              href="https://elikmiller.com"
              className="text-dark"
              target="_blank"
              rel="noopener noreferrer"
            >
              elikmiller.com
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
