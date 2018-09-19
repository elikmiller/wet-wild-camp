import React, { Component } from "react";
import appClient from "../appClient";

import EditableCamper from "./EditableCamper.jsx";

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
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Campers;
