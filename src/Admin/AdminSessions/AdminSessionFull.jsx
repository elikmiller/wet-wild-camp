import React, { Component } from "react";
import appClient from "../../appClient";
import AdminSessionForm from "./AdminSessionForm";
import moment from "moment";

class AdminSessionFull extends Component {
  state = {
    camp: {},
    formOpen: false
  };

  componentDidMount() {
    this.getCampData();
  }

  formatDate = date => {
    return moment.utc(date).format("MMMM Do, YYYY");
  };

  getCampData = () => {
    appClient
      .getCamp(this.props.match.params.sessionId)
      .then(camp => {
        this.setState({
          camp: camp.data
        });
      })
      .catch(err => {
        console.error(err);
      });
  };

  handleSubmit = data => {
    appClient
      .updateCamp(this.state.camp._id, data)
      .then(() => {
        this.getCampData();
      })
      .catch(err => {
        console.error(err);
      });
  };

  toggleForm = e => {
    if (e) e.preventDefault();
    this.setState({ formOpen: !this.state.formOpen });
  };

  render() {
    let { camp } = this.state;
    let startDate = this.formatDate(camp.startDate);
    let endDate = this.formatDate(camp.endDate);
    let openDate = this.formatDate(camp.openDate);
    let closeDate = this.formatDate(camp.closeDate);
    let campers;
    if (camp.campers) {
      campers = camp.campers.map((camper, i) => {
        return (
          <li key={i} className="list-group-item">
            {camper.firstName} {camper.lastName}
          </li>
        );
      });
    }
    return (
      <div className="card">
        <div className="card-header">
          {camp.name} {camp.type}
          <button
            className="btn btn-primary"
            style={{ marginLeft: "10px" }}
            onClick={this.toggleForm}
          >
            Edit
          </button>
        </div>
        <div className="card-body">
          <p className="card-text">
            {camp.description || "No description provided."}
          </p>
          <br />
          <p className="card-text">
            <strong>Number of Registrants: </strong>
            {camp.campers ? camp.campers.length : "Awaiting Data"}
          </p>
          <p className="card-text">
            <strong>Capacity: </strong>
            {camp.capacity ? camp.capacity : "Awaiting Data"}
          </p>
          <br />
          <p className="card-text">
            <strong>Fee: </strong>
            {camp.fee ? `$${camp.fee}` : "Awaiting Data"}
          </p>
          <div className="row justify-content-around">
            <div className="card col-lg-5" style={{ padding: "0" }}>
              <div className="card-header">Dates</div>
              <div className="card-body" style={{ padding: "0" }}>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <strong>Start: </strong>
                    {startDate}
                  </li>
                  <li className="list-group-item">
                    <strong>End: </strong>
                    {endDate}
                  </li>
                  <li className="list-group-item">
                    <strong>Registration Open: </strong>
                    {openDate}
                  </li>
                  <li className="list-group-item">
                    <strong>Registration Close: </strong>
                    {closeDate}
                  </li>
                </ul>
              </div>
            </div>
            <div className="card col-lg-5" style={{ padding: "0" }}>
              <div className="card-header">Campers</div>
              <div className="card-body" style={{ padding: "0" }}>
                <ul className="list-group list-group-flush">{campers}</ul>
              </div>
            </div>
          </div>
        </div>
        {this.state.formOpen && (
          <div>
            <h3 className="center">Edit Form</h3>
            <AdminSessionForm
              handleSubmit={this.handleSubmit}
              handleClose={this.toggleForm}
              data={this.state.camp}
            />
          </div>
        )}
      </div>
    );
  }
}

export default AdminSessionFull;
