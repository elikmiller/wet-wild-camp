import React, { Component } from "react";
import appClient from "../../appClient";
import EditableAdminCamp from "./EditableAdminCamp";
import _ from "lodash";
import Spinner from "../../Spinner/Spinner";

class AdminCampDetails extends Component {
  state = {
    camp: {},
    isLoading: false
  };

  componentDidMount() {
    this.getCamp(this.props.match.params.campId);
  }

  getCamp = campId => {
    this.setState({ isLoading: true });
    appClient
      .getCamp(campId)
      .then(camp => {
        this.setState({
          camp: camp.data,
          isLoading: false
        });
      })
      .catch(err => {
        this.setState({ isLoading: false });
        console.error(err);
      });
  };

  editCamp = (campId, data) => {
    this.setState({ isLoading: true });
    appClient
      .updateCamp(campId, data)
      .then(camp => {
        console.log(camp);
        this.setState({
          camp: camp.data,
          isLoading: false
        });
      })
      .catch(err => {
        this.setState({ isLoading: false });
        console.error(err);
      });
  };

  render() {
    return (
      <div className="admin-camp-details spinner-wrapper">
        {this.state.isLoading && <Spinner />}
        <p className="lead">
          {this.state.camp.name} {_.capitalize(this.state.camp.type)} Details
        </p>
        <EditableAdminCamp camp={this.state.camp} editCamp={this.editCamp} />
      </div>
    );
  }
}

export default AdminCampDetails;
