import React, { Component } from "react";
import appClient from "../appClient";
import Loading from "../Loading";

import EditableCamper from "./EditableCamper.jsx";
import { AuthContext } from "../App";

class Campers extends Component {
  state = {
    isLoading: false,
    campers: []
  };

  componentDidMount() {
    this.refreshCampers();
  }

  refreshCampers = () => {
    this.setState({
      isLoading: true
    });
    appClient
      .getCampers(this.props.userId)
      .then(campers => {
        this.setState({
          isLoading: false,
          campers: campers.data
        });
      })
      .catch(err => {
        this.setState({
          isLoading: false
        });
        if (err.response.status === 401) {
          this.props.logout();
        }
      });
  };

  addCamper = e => {
    e.preventDefault();
    this.state.campers.push(null);
    this.forceUpdate();
  };

  handleClose = () => {
    let { campers } = this.state;
    if (campers[campers.length - 1] === null) {
      campers.pop();
      this.forceUpdate();
    }
  };

  render() {
    return (
      <div>
        <h1>Campers</h1>
        <div className="row position-relative">
          {this.state.isLoading && <Loading />}
          {this.state.campers.map((camper, i) => (
            <div className="col-12 col-lg-3" key={i}>
              <EditableCamper
                data={camper}
                refreshCampers={this.refreshCampers}
                handleClose={this.handleClose}
              />
            </div>
          ))}
        </div>
        <button className="btn btn-primary" onClick={this.addCamper}>
          New Camper
        </button>
      </div>
    );
  }
}

export default props => (
  <AuthContext.Consumer>
    {auth => <Campers userId={auth.userId} logout={auth.logout} {...props} />}
  </AuthContext.Consumer>
);
