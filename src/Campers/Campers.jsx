import React, { Component } from "react";
import appClient from "../appClient";

import EditableCamper from "./EditableCamper.jsx";
import { AuthContext } from "../App";

class Campers extends Component {
  state = {
    fetchingData: false,
    campers: []
  };

  componentDidMount() {
    this.refreshCampers();
  }

  componentWillUnmount() {
    if (this.state.fetchingData) appClient.cancelRequest();
  }

  refreshCampers = () => {
    this.setState({ fetchingData: true });
    appClient
      .getCampers(this.props.userId)
      .then(campers => {
        this.setState({ campers: campers.data, fetchingData: false });
      })
      .catch(err => {
        console.log(err);
        if (err.response) {
          if (err.response.status === 401) this.props.logout();
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
          {this.state.campers.map((camper, i) => (
            <div className="col-12 col-sm-6" key={i}>
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
