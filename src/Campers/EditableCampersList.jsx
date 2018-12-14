import React, { Component } from "react";
import EditableCamper from "./EditableCamper";

class EditableCampersList extends Component {
  render() {
    if (this.props.campers.length === 0) return null;

    return this.props.campers.map((camper, i) => (
      <div className="col-12 col-lg-4" key={i}>
        <EditableCamper camper={camper} editCamper={this.props.editCamper} />
      </div>
    ));
  }
}

export default EditableCampersList;
