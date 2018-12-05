import React, { Component } from "react";
import appClient from "../appClient";
import Loading from "../Loading";
import ServerError from "../forms/ServerError";

import EditableCamper from "./EditableCamper.jsx";

class Campers extends Component {
  state = {
    isLoading: false,
    campers: [],
    errors: {}
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
        } else if (err.response.status === 500) {
          this.setState({ errors: { server: "Server error." } });
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
        <div className="row position-relative">
          {this.state.isLoading && <Loading />}
          {this.state.errors.server && <ServerError />}
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

export default Campers;
