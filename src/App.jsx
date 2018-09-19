import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home.jsx";
import appClient from "./appClient";
import "./App.css";

export const UserContext = React.createContext();

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
      .login({ email, password })
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
    return appClient.logout().then(res => {
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
      .register({ firstName, lastName, email, password })
      .then(res => {
        return this.login({ email, password });
      });
  };

  componentDidMount() {
    return appClient
      .currentUser()
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
                  <UserContext.Provider value={this.state.user._id}>
                    <Home
                      authenticated={this.state.authenticated}
                      onLogin={this.login}
                      onLogout={this.logout}
                      onRegister={this.register}
                      {...props}
                    />
                  </UserContext.Provider>
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
