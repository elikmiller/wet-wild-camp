import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../Home/Home";
import Loading from "../LoadingBar/LoadingBar";
import appClient from "../appClient";
import "./App.css";

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
          user: {
            _id: res.data._id,
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            email: res.data.email
          },
          admin: res.data.admin
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

  signUp = ({ firstName, lastName, email, password }) => {
    return appClient
      .createUser({ firstName, lastName, email, password })
      .then(res => {
        return this.login({ email, password });
      });
  };

  forgotPassword = ({ email }) => {
    return appClient.passwordReset({ email });
  };

  resetPassword = ({ token, password }) => {
    return appClient.redeemPasswordResetToken({ token, password });
  };

  componentDidMount() {
    return appClient
      .currentUser()
      .then(res => {
        this.setState({
          loading: false,
          authenticated: true,
          user: {
            _id: res.data._id,
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            email: res.data.email
          },
          admin: res.data.admin
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
                        user: this.state.user,
                        logout: this.logout,
                        admin: this.state.admin
                      }}
                    >
                      <Home
                        authenticated={this.state.authenticated}
                        onLogin={this.login}
                        onLogout={this.logout}
                        onSignUp={this.signUp}
                        onForgotPassword={this.forgotPassword}
                        onResetPassword={this.resetPassword}
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
