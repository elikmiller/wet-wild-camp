import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home.jsx";
import appClient from "./appClient";
import "./App.css";

class App extends Component {
  state = {
    authenticated: false,
    user: {
      firstName: "",
      lastName: "",
      email: ""
    }
  };

  login = ({ email, password }) => {
    return appClient
      .post("/login", { email, password })
      .then(res => {
        this.setState({
          authenticated: true,
          user: res.data.user
        });
      })
      .catch(err => {
        this.setState({
          authenticated: false,
          user: {
            firstName: "",
            lastName: "",
            email: ""
          }
        });
      });
  };

  logout = () => {
    return appClient.get("/logout").then(res => {
      this.setState({
        authenticated: false,
        user: {
          firstName: "",
          lastName: "",
          email: ""
        }
      });
    });
  };

  currentUser = () => {
    appClient
      .get("/current_user")
      .then(res => {
        this.setState({
          authenticated: true,
          user: res.data.user
        });
      })
      .catch(err => {
        this.setState({
          authenticated: false,
          user: {
            firstName: "",
            lastName: "",
            email: ""
          }
        });
      });
  };

  register = ({ firstName, lastName, email, password }) => {
    return appClient
      .post("/users", { firstName, lastName, email, password })
      .then(res => {
        return this.login({ email, password });
      });
  };

  componentDidMount() {
    this.currentUser();
  }

  render() {
    return (
      <div className="app">
        <Router>
          <Switch>
            <Route
              path="/"
              render={props => {
                return (
                  <Home
                    authenticated={this.state.authenticated}
                    onLogin={this.login}
                    onLogout={this.logout}
                    onRegister={this.register}
                    {...props}
                  />
                );
              }}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
