import React, { Component } from "react";
import appClient from "../../appClient";
import EditableAdminCamp from "./EditableAdminCamp";

class AdminCampDetails extends Component {
  state = {
    camp: {}
  };

  componentDidMount() {
    this.getCamp(this.props.match.params.campId);
  }

  getCamp = campId => {
    appClient
      .getCamp(campId)
      .then(camp => {
        this.setState({
          camp: camp.data
        });
      })
      .catch(err => {
        console.error(err);
      });
  };

  render() {
    return <EditableAdminCamp camp={this.state.camp} />;
  }
}

export default AdminCampDetails;
