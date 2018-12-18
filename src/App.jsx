import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home.jsx";
import Loading from "./Loading";
import appClient from "./appClient";
import "./App.css";
import "./table.css";

export const AuthContext = React.createContext();

class App extends Component {
  state = {
    loading: true,
    authenticated: false,
    user: {
      _id: "",
      firstName: "",
      lastName: "",
      email: ""
    },
    admin: false
  };

  login = ({ email, password }) => {
    return appClient
      .login({ email, password })
      .then(res => {
        this.setState({
          authenticated: true,
          user: res.data.user,
          admin: res.data.user.admin
        });
      })
      .catch(err => {
        this.setState({
          authenticated: false,
          user: {
            _id: "",
            firstName: "",
            lastName: "",
            email: ""
          },
          admin: false
        });
        throw err;
      });
  };

  logout = () => {
    return appClient.logout().then(res => {
      this.setState({
        authenticated: false,
        user: {
          _id: "",
          firstName: "",
          lastName: "",
          email: ""
        },
        admin: false
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
          loading: false,
          authenticated: true,
          user: res.data.user,
          admin: res.data.user.admin
        });
      })
      .catch(err => {
        this.setState({
          loading: false,
          authenticated: false,
          user: {
            _id: "",
            firstName: "",
            lastName: "",
            email: ""
          },
          admin: false
        });
      });
  }

  render() {
    return (
      <div className="app h-100">
        {this.state.loading && <Loading />}
        {!this.state.loading && (
          <Router>
            <Switch>
              <Route
                path="/"
                render={props => {
                  return (
                    <AuthContext.Provider
                      value={{
                        authenticated: this.state.authenticated,
                        userId: this.state.user._id,
                        logout: this.logout,
                        admin: this.state.admin
                      }}
                    >
                      <Home
                        authenticated={this.state.authenticated}
                        onLogin={this.login}
                        onLogout={this.logout}
                        onRegister={this.register}
                        isAdmin={this.state.admin}
                        {...props}
                      />
                    </AuthContext.Provider>
                  );
                }}
              />
            </Switch>
          </Router>
        )}
      </div>
    );
  }
}

export default App;
