import React, { Component } from "react";
import Login from "./Login";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="container">
          <div className="row">
            <div className="col">
              <Register />
            </div>
            <div className="col">
              <Login />
            </div>
            <div className="col">
              <ForgotPassword />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
