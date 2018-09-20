import React, { Component } from "react";
import appClient from "../appClient";

import EditableCamper from "./EditableCamper.jsx";
import { UserContext } from "../App";

class Campers extends Component {
  state = {
    campers: []
  };

  componentDidMount() {
    this.refreshCampers();
  }

  refreshCampers = () => {
    appClient.getCampers(this.props.userId).then(campers => {
      this.setState({ campers: campers.data });
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
        <div className="row">
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
  <UserContext.Consumer>
    {userId => <Campers userId={userId} {...props} />}
  </UserContext.Consumer>
);
