import React, { Component } from "react";
import { Link } from "react-router-dom";
import UnauthenticatedContainer from "./UnauthenticatedContainer";

class Home extends Component {
  state = {
    loggedIn: false
  };

  login = () => {
    this.setState({ loggedIn: true });
  };

  logout = () => {
    this.setState({ loggedIn: false });
  };

  render() {
    return (
      <div className="home">
        <nav className="navbar navbar-light bg-light mb-3">
          <Link className="navbar-brand" to="/">
            React Playground
          </Link>
        </nav>
        {!this.state.loggedIn && (
          <UnauthenticatedContainer onLogin={this.login} />
        )}
        {this.state.loggedIn && (
          <div>
            Logged In! <button onClick={this.logout}>Logout</button>
          </div>
        )}
      </div>
    );
  }
}

export default Home;
