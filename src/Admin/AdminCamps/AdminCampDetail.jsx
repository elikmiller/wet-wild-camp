import React, { Component } from "react";
import appClient from "../../appClient";
import EditableAdminCamp from "./EditableAdminCamp";
import _ from "lodash";
import Spinner from "../../Spinner/Spinner";

class AdminCampDetail extends Component {
  state = {
    camp: {},
    isLoading: false,
    confirmDelete: false
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

  updateCamp = (campId, data) => {
    this.setState({ isLoading: true });
    appClient
      .updateCamp(campId, data)
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

  deleteCamp = campId => {
    appClient
      .deleteCamp(campId)
      .then(res => {
        this.props.history.push("/admin/camps");
      })
      .catch(err => {
        this.setState({ isLoading: false });
        console.error(err);
      });
  };

  handleDeleteCampClick = () => {
    this.setState({
      confirmDelete: true
    });
  };

  handleCancelDeleteCampClick = () => {
    this.setState({
      confirmDelete: false
    });
  };

  handleConfirmDeleteCampClick = () => {
    this.deleteCamp(this.state.camp._id);
  };

  render() {
    return (
      <div className="admin-camp-details spinner-wrapper">
        {this.state.isLoading && <Spinner />}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <p className="lead mb-0">
            {this.state.camp.name} {_.capitalize(this.state.camp.type)} Details
          </p>
          <button
            className="btn btn-danger mb-0"
            onClick={this.handleDeleteCampClick}
          >
            <i className="fas fa-trash" /> Delete Camp
          </button>
        </div>
        {this.state.confirmDelete && (
          <div className="alert alert-danger">
            Are you sure you want to delete {this.state.camp.name}{" "}
            {_.capitalize(this.state.camp.type)}?
            <button
              type="button"
              className="close"
              onClick={this.handleCancelDeleteCampClick}
            >
              <span>
                <i className="fas fa-times" />
              </span>
            </button>
            <hr />
            <button
              type="button"
              className="btn btn-light mr-3"
              onClick={this.handleCancelDeleteCampClick}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={this.handleConfirmDeleteCampClick}
            >
              Confirm Delete
            </button>
          </div>
        )}
        <EditableAdminCamp
          camp={this.state.camp}
          updateCamp={this.updateCamp}
          deleteCamp={this.deleteCamp}
        />
      </div>
    );
  }
}

export default AdminCampDetail;
