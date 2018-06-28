import React, { Component } from "react";
import { Link } from "react-router-dom";
import UnauthenticatedContainer from "./UnauthenticatedContainer";
import AuthenticatedContainer from "./AuthenticatedContainer";

class Home extends Component {
  state = {
    loggedIn: true
  };

  login = () => {
    this.setState({ loggedIn: true });
  };

  logout = e => {
    this.setState({ loggedIn: false });
    this.props.history.push("/");
    e.preventDefault();
  };

  render() {
    return (
      <div className="home">
        <nav className="navbar navbar-light bg-light mb-3">
          <Link className="navbar-brand" to="/">
            React Playground
          </Link>
          {this.state.loggedIn && (
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" onClick={this.logout} href="/">
                  Logout
                </a>
              </li>
            </ul>
          )}
        </nav>
        {!this.state.loggedIn && (
          <UnauthenticatedContainer onLogin={this.login} />
        )}
        {this.state.loggedIn && (
          <AuthenticatedContainer onLogout={this.logout} />
        )}
      </div>
    );
  }
}

export default Home;
