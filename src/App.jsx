import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home.jsx";
import axios from "axios";
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

  authClient = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    withCredentials: true
  });

  login = ({ email, password }) => {
    this.authClient
      .post("/login", { email, password })
      .then(res => {
        this.setState({
          authenticated: true
        });
      })
      .catch(err => {
        this.setState({ authenticated: false });
      });
  };

  logout = () => {
    this.authClient.get("/logout").then(res => {
      this.setState({ authenticated: false });
    });
  };

  currentUser = () => {
    this.authClient
      .get("/current_user")
      .then(res => {
        this.setState({
          authenticated: true,
          user: res.user
        });
      })
      .catch(err => {
        this.setState({ authenticated: false });
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
              render={() => {
                return <Home authenticated={this.state.authenticated} onLogin={this.login} onLogout={this.logout} />;
              }}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
